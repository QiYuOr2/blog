---
title: "[Webpack & babel] exports is not defined 问题记录"
date: 2024/06/28 11:44:01
pubDate: 2024/06/28 11:44:01
description: 一次 Webpack 与 Babel 共同作用导致的白屏故障
category: 技术
tags: [Webpack, 工程化]
---

一次 Webpack 与 Babel 共同作用导致的白屏故障。

## 问题描述

维护脚手架时，发现有个项目中的一个 npm 包（依赖的内部依赖）的高版本语法没有被编译，于是针对这个 npm 包配置了强制编译

改动后觉得只是个小修改，不会有什么大影响，就没有进行回归测试，结果就导致了线上页面报错白屏

![报错示例](https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/2024121903.png)

## 原因确认

babel 处理时由于 sourceType 默认为 module，transform-runtime 插件会直接在代码顶部插入 import

> 由 `programPath.node.sourceType` 决定，babel 配置文件中没有配置该值时，默认为 `module`，一定会向代码中插入 import (具体细节可以查看 [babel-polyfills 源码](https://github.com/babel/babel-polyfills/blob/dd271b0de06777d962973d9354e763a5fed925b2/packages/babel-helper-define-polyfill-provider/src/utils.ts#L134-L140))

![babel处理断点](https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/2024121904.png)

而 webpack 环境下，babel 的 preset-env 不会将 import 转为 `_interopRequireDefault`

![babel-loader 不处理 ES Module 解释图](https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/2024121905.png)

babel-loader 中设置了 `supportsStaticESM` 为 true，此时 modules 就会被设置为 false，不会处理 ES Module

webpack 处理 ES Module 时，原本应该是 exports 入参的地方会替换为`__webpack_require__`，这时 exports.__esModule = true 就会报错

![webpack 插入 __webpack_exports__ 结果](https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/2024121906.png)

**完整的错误流程：**

1. 脚手架强制编译 commonjs 模块
2. `@babel/plugin-transform-runtime` 注入 ES Module 代码
3. preset-env webpack 环境下不处理 import / export
4. webpack 将模块作为 ES Module 处理

### 新的报错

`Cannot assign to read only property 'exports' of object '#<Object>'`

去掉项目依赖的 npm 包的强制编译，只保留 `依赖的内部依赖` 的强制编译，会发现报错变了

![新的报错](https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/2024121907.png)

将代码折叠起来会发现，__webpack_require__被作为 this 传入了

![错误传递 this](https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/2024121908.png)

而__webpack_require__ 就是 module.exports

![__webpack_require__ = module.exports](https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/2024121909.png)

webpack 在处理 ES Module 时，会添加严格模式声明，严格模式下直接修改 this 会报错

手动去除 `"use strict";` 后报错消失，但是代码依旧有问题，原因是 ES Module 的 export 导出会被处理为`__webpack_require__.d(xxxx)`，而 `依赖的内部依赖` 中只有 `module.exports` 导出，不会被转换

![错误的 __webpack_require__.d](https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/2024121910.png)


### 为什么强制编译会失效

babel7 新增了项目级配置文件的概念 → `.babelrc` 和 `babel.config.js` 存在差异，根配置和相对配置

![babel两种配置文件](https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/2024121911.png)

babel7 中 .babelrc 只会作用到最近一个含有 package.json 的目录，也就是 monorepo 的子项目或是 node_modules 中的东西都不会去处理

[https://babeljs.io/docs/config-files#6x-vs-7x-babelrc-loading](https://babeljs.io/docs/config-files#6x-vs-7x-babelrc-loading)

- 脚手架的 babel-loader 中设置了 `root: srcFolder` 时，项目中如果是 .babelrc 就会导致 node_modules 无法编译
- 在项目下 .babelrc 设置 `sourceType: 'unambiguous'` 也因为同样的问题无法作用于 node_modules

处理 *.js 时，读取的是 root 所配置的 .babelrc；而处理 *.vue 时，vue-loader 读取了脚手架目录下的 babel.config.js，会同时加载脚手架的 babel.config.js 和项目目录的 .babelrc

原因是 vue-loader@13.x 内部配置了默认的 babel-loader，不会被我们配置的 babel-loader 覆盖，需要我们手动在 vue-loader 中配置来覆盖

![vue-loader 配置](https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/2024121912.png)


## 什么情况下可能会导致该问题


**babel7 满足以下几个条件**

- babel 生效的配置文件为 `babel.config.js`（如果生效配置是 `.babelrc` 那么强制编译会直接失效）
- 项目使用了强制编译
- 强制编译的目标文件是 commonjs 模块
- 使用了 `@babel/plugin-transform-runtime`
- 没有配置 `sourceType: unambiguous`

**babel6** 

如果使用了 babel-plugin-transform-runtime 也有同样的问题，没找到比较好的解决方案，可以移除该插件

该插件作用：避免重复的工具函数 & 创建沙箱避免污染全局变量

## 如何避免该问题

- 项目中的代码不要同时出现 commonjs 和 es module
- 如果某个 node_modules 模块仅需要处理 es6 语法，应该通过 babel 的 `overrides` 配置强制编译

  ```jsx
  module.exports = {
    overrides: [
      {
        include: "./node_modules/module-name/library-name/name.common.js", // 使用的第三方库
        sourceType: "unambiguous",
      },
    ],
  };
  ```

`unambiguous` 潜在的问题：如果使用了 ESNext 特性的文件不包含静态 import / export，就会错误的注入 require

![错误注入示例](https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/2024121902.png)

## 参考

- [「前端」import、require、export、module.exports 混合详解](https://github.com/ShowJoy-com/showjoy-blog/issues/39)
- [.babelrc 与 babel.config.js 配置文件的区别](https://github.com/willson-wang/Blog/issues/100)
- [报告老板，我们的 H5 页面在 iOS11 系统上白屏了！](https://juejin.cn/post/6856815533749338125)
- [利用 webpack 理解 CommonJS 和 ES Modules 的差异](https://juejin.cn/post/6844904191840747533)
