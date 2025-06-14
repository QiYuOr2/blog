---
title: "Vite 为了开发体验做出的努力"
date: 2024/5/27 16:32:30
pubDate: 2024/5/27 16:32:30
description: 主要内容为开发环境下 Vite 的各类机制
category: 技术
tags: [Vite, 工程化]
---
### 开发模式下的策略

**与 Webpack 的差异**

- Webpack 的机制是先打包，再将打包后的产物作为资源启动服务器
- Vite 是先启动服务器，从入口开始根据 import 按需请求所需资源

**预构建**

Vite 提倡 `no-bundle` ，但对于 `node_modules` 中各种各样的依赖而言，很难做到完全 `no-bundle` ，因此需要对依赖进行预构建。Vite 使用 esbuild 预编译。 [Vite 官方文档 | 依赖预构建](https://cn.vitejs.dev/guide/dep-pre-bundling.html#dependency-pre-bundling)

如果没有预构建，Vite 根据 `import` 按需请求的机制会产生的问题：

- 第三方库的构建产物不规范，没有 ES Module 产物，无法在 Vite 开发环境（ `<script type="module"><script>` ）使用
- 第三方库可能会有许多层依赖（许多 `import`），每一条 `import` 都会产生一条请求，导致请求过多页面卡顿

为了解决这两个问题，Vite 预构建做了以下两件事：

- 将 UMD、CommonJS 等格式转为 ES Module 格式
- 打包第三方库，将第三方库内部分散的文件合并，减少 HTTP 请求数

预构建的产物会被放在 `node_modules/.vite/` 目录下，除此之外，Vite Dev Server 还给这些资源设置了超长的 HTTP 缓存，在没有手动修改依赖或 Vite `optimizeDeps` 配置的情况下，都会直接使用缓存

### 生产环境下的策略

使用 Rollup 作为打包工具，完成打包、代码分割、tree shaking等工作。同时，Vite 还利用 Rollup 在构建过程中做了一套 [构建优化](https://cn.vite.dev/guide/features.html#build-optimizations) 机制。

### ESBuild 做了哪些事

- 开发环境下依赖预构建 （Pre-Bundling）
- 开发环境下TypeScript、JSX 等语法的编译；生产环境下如果设置了特殊配置，也会通过 esbuild 处理 [Vite 文档 | build.target](https://cn.vite.dev/config/build-options.html#build-target)
- 代码最小化混淆，无论是 JavaScript 代码还是 CSS 代码，Vite 的默认混淆转换器都是 esbuild  [Vite 文档 | build.minify](https://cn.vite.dev/config/build-options.html#build-minify)

**更优秀的性能**

- esbuild 的开发语言是 Go，编译成原生二进制文件，无需解释执行，以及多线程支持，能够好的利用计算机性能
- 传统的构建流程中，Webpack 和 Babel 这类 JS 构建工具会将源码在字符串和 AST 之间相互转换，而 esbuild 始终保证了各个步骤之间代码传递结构的一致性

### Vite 的后续计划

用 [Rolldown](https://github.com/rolldown/rolldown) 作为开发环境与生产环境共同的构建工具。