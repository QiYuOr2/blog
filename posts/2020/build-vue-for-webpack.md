---
title: 使用 webpack 手动搭建 vue 项目
date: 2020/12/07 20:30:13
pubDate: 2020/12/07 20:30:13
tags: [JavaScript, Vue, Webpack]
category: 技术
description: webpack 是一个前端工程化打包工具，对于前端工程师来说 webpack 是一项十分重要的技能。下面我们就通过搭建一个 vue 项目来学习使用 webpack

---

webpack 是一个前端工程化打包工具，对于前端工程师来说 webpack 是一项十分重要的技能。下面我们就通过搭建一个 vue 项目来学习使用 webpack

**主要环境：**

- node v14.15.0
- npm v6.14.9
- webpack v5.10.0
- webpack-cli v4.2.0
- vue v2.6.12

**本项目实现以下功能：**

- 与`vue/cli`类似的基本目录
- 支持`*.vue`,`*.css`等文件
- 支持`es6`及以上语法
- 支持加载图片
- 热加载

## 构建项目基本目录

执行`npm init`并创建以下目录

```
demo
├─ dist
├─ public
└─ src
```

## 安装必要依赖

### webpack 及相关插件

- webpack `npm install -D webpack webpack-cli`
- webpack 本地服务器插件 `npm install -D webpack-dev-server`
- html 生成插件，它会将生成的 js 和 css 文件插入到 html 中 `npm install -D html-webpack-plugin`
- vue 插件 `npm install -D vue-loader vue-template-compiler`
- css 插件 `npm install -D css-loader style-loader vue-style-loader`
- 图片插件 `npm install -D file-loader url-loader`
- babel 插件 `npm install -D @babel/core @babel/cli @babel/preset-env babel-loader`, `npm install @babel/polyfill`

### 安装 vue

- `npm install vue vue-router`

## 搭建项目

### 简单实现 webpack 打包

新建`src/main.js`，并写入：

```javascript
console.log('Hello Webpack');
```

根目录下新建`webpack.config.js`，并写入：

```javascript
const path = require('path');

const config = {
  entry: './src/main.js', // 定义入口文件
  output: {
    path: path.resolve(__dirname + '/dist'), // 打包生成文件地址，必须是绝对路径
    filename: '[name].build.js', // 生成的文件名
  },
};
module.exports = config;
```

在`package.json`中的`scripts`中添加一个脚本：

```json
{
  ...
  "scripts": {
    "build": "webpack --mode=production"
  }
  ...
}
```

在命令行中执行`npm run build`，此时项目目录中出现了`dist/main.build.js`，证明执行成功

js 文件打包成功后，需要一个 html 文件来引入这个 js 文件，这就需要用到我们一开始下载的`html-webpack-plugin`

首先新建`public/index.html`创建一个基础页面：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>webpack搭建vue</title>
  </head>
  <body>
    <!-- 如果浏览器禁止加载js脚本 -->
    <noscript>
      <strong>
        We're sorry but this site doesn't work properly without JavaScript
        enabled. Please enable it to continue.
      </strong>
    </noscript>

    <div id="app"></div>
    <!-- build后的文件会在这之后自动引入 -->
  </body>
</html>
```

在`public`下随便放入一个图标`favicon.ico`，然后在`webpack.config.js`中配置插件：

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  ...
  plugins:[
     new HtmlWebpackPlugin({
      filename: 'index.html', // 生成的文件夹名
      template: 'public/index.html', // 模板html
      favicon: 'public/favicon.ico', // 图标
    }),
  ]
}
...
```

之后再次执行`npm run build`，`dist`下会生成`index.html`，`favicon.ico`，`main.build.js`三个文件，通过浏览器打开`index.html`，就可以发现控制台输出了`Hello Webpack`，页面图标也变成了自己设定的图标，通过编辑器打开`index.html`，我们会发现 webpack 帮助我们自动引入了`favicon.ico`和`main.build.js`：

```html
<!DOCTYPE html>
<html>
  <head>
    ...
    <link rel="icon" href="favicon.ico" />
  </head>
  <body>
    ...
    <script src="main.build.js"></script>
  </body>
</html>
```

### 开启热加载

webpack 热加载需要用到`webpack-dev-server`，在开始我们已经安装过了，在`webpack.config.js`中配置：

```javascript
const config = {
  ...
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // html所在路径
    compress: true, // 是否压缩
    port: 3000, // 端口
    hot: true, // 热部署
    open: true, // 打包完成后自动打开网页
  }
}
```

增加`package.json`脚本：

```json
{
  ...
  "scripts": {
    "build": "webpack --mode=production",
    "serve": "webpack serve"
  }
  ...
}
```

执行`npm run serve`，打包成功后会自动打开网页，并且当你修改`src/main.js`或`src/index.html`的内容的时候，浏览器会自动重新打包并刷新

### 配置 Vue

让 webpack 打包`*.vue`文件需要`vue-loader`和`vue-template-compiler`，同时为了 webpack 能够解析 vue 中的 css 还需要用到`css-loader`和`vue-style-loader`，在`webpack.config.js`配置以上插件：

```javascript
...
const { VueLoaderPlugin } = require('vue-loader');

const config = {
  ...
  // loaders
  module: {
    rules: [
      {
        // *.vue
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        // `*.vue` 文件中的 `<style>` 块以及普通的`*.css`
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    ...
    new VueLoaderPlugin(),
  ],
  ...
};
...
```

配置完后新建`src/App.vue`:

```html
<template>
  <div class="example">{{ msg }}</div>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'Hello Webpack',
      };
    },
  };
</script>

<style>
  .example {
    color: red;
  }
</style>
```

修改`src/main.js`:

```javascript
import Vue from 'vue';
import App from './App.vue';

new Vue({
  el: '#app',
  render: (h) => h(App),
});
```

然后运行`npm run serve`，即可看到页面上显示的`Hello Webpack`

### 配置图片资源的加载

使用`file-loader`或`url-loader`加载，它们都是用于打包文件和图片资源的，区别在于`url-loader`封装了`file-loader`

在访问网站时如果图片较多，会发很多 http 请求，会降低页面性能。这个问题可以通过 `url-loader` 解决。`url-loader` 会将引入的图片编码，生成 dataURl。相当于把图片数据翻译成一串字符,再把这串字符打包到文件中，最终只需要引入这个文件就能访问图片了。
当然，如果图片较大，编码会消耗性能。因此 `url-loader` 提供了一个 limit 参数，小于 limit 字节的文件会被转为 DataURl，大于 limit 的还会使用 file-loader 进行 copy。
此处我们使用 `url-loader`,由于它是基于 `file-loader` 的封装，所以也需要引入 `file-loader`。

```javascript
...
const config = {
  ...
  module: {
    rules: [
      ...
      {
        // 图片
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 25000,
          },
        },
      },
    ],
  },
};
...
```

然后添加一个图片`src/assets/logo.png`，在`App.vue`中引入：

```html
<template>
  <div class="example">
    {{ msg }}
    <img :src="url" />
  </div>
</template>

<script>
  import logo from './assets/logo.png';

  export default {
    data() {
      return {
        msg: 'Hello Vue1',
        url: logo,
      };
    },
  };
</script>

<style>
  .example {
    color: red;
  }
</style>
```

再次`npm run serve`即可看到图片

## 配置 babel

babel 可以将 js 的高版本(es6)语法转换为低版本，使得项目兼容低版本浏览器

需要我们注意的是，babel7 与 babel6 不兼容，因此需要使用最新版本的 babel 和 babel 插件，在前面文章开始我们已经安装了 babel7 版本的 babel 插件，下面我们在`webpack.config.js`中配置它：

```javascript
...
const config = {
  ...
  module: {
    rules: [
      ...
      {
        // *.js
        test: /\.js$/,
        exclude: /node_modules/, // 不编译node_modules下的文件
        loader: 'babel-loader',
      },
    ],
  },
};
...
```

配置完后在项目根目录下创建一个 babel 的配置文件`.babelrc`，写入如下内容：

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry"
      }
    ]
  ]
}
```

> 更多 babel 配置请查看[babel 中文官网](https://www.babeljs.cn/)

配置完成后新建一个`src/utils/getData.js`测试一下：

```javascript
export default function getData() {
  return new Promise((resolve, reject) => {
    resolve('ok');
  });
}
```

在`src/App.vue`中引入：

```html
<template>
  <div class="example">
    {{ msg }}
    <img :src="url" />
  </div>
</template>

<script>
  import logo from './assets/logo.png';
  import getData from './utils/getData';

  export default {
    data() {
      return {
        msg: 'Hello Vue1',
        url: logo,
      };
    },
    methods: {
      async fetchData() {
        const data = await getData();
        this.msg = data;
      },
    },
    created() {
      this.fetchData();
    },
  };
</script>

<style>
  .example {
    color: red;
  }
</style>
```

重新执行`npm run serve`后，页面显示`ok`，babel 引入成功

### 设置 src 别名以及省略后缀

为了方便开发，我们可以给 src 目录设置别名，以及将常用文件类型的后缀省略

```javascript
...
const config = {
  ...
  // 解析路径
  resolve: {
    // 设置src别名
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    //后缀名 可以根据需要自由增减
    extensions: ['.js', '.vue'],
  },
  ...
};
...
```

这样我们就可以以如下方式导入 vue 和 js 文件：

```javascript
// 导入App.vue
import App from '@/App';
// 导入getData
import getData from '@/utils/getData';
```

至此，我们已经简单的搭建出了 vue 项目，在项目中我们可能还会需要用到`less`,`sass`,字体图标等工具，针对这类工具 webpack 都有与其对应的`loader`或`plugin`，需要时搜索他们的文档即可。

- 本项目仓库 [qiyuor2/webpack-vue](https://github.com/qiyuor2/webpack-vue)

## 参考文章

- [webpack 中文文档](https://webpack.docschina.org/concepts/)
- [webpack4 练手项目-搭建 Vue 项目](https://juejin.cn/post/6844903941180768269)
- [使用 Webpack 与 Babel 配置 ES6 开发环境](https://segmentfault.com/a/1190000018461758)
