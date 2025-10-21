---
title: 关于 JSBridge
date: 2023/1/4 18:53:32
pubDate: 2023/1/4 18:53:32
description: ''
tags: [JSBridge, 跨端,笔记]
category: 技术
---

[JSBridge 的原理](https://juejin.cn/post/6844903585268891662)

Bridge 表示它是一个连接层，Native 和 非 Native 之间的双向通信通道

## JavaScript 调用 Native: 2 种方式

### JS 调用全局方法

Webview 接口向 window 注入对象或方法，JS 调用时，执行相应的 Native 逻辑

### Web 发送请求

Web 端通过某种方式（例如 iframe.src）发送 URL Scheme 请求，之后 Native 拦截到请求并根据 URL SCHEME（包括所带的参数）进行相关操作

使用 iframe.src 发送 URL SCHEME 会有 url 长度的隐患

创建请求，需要一定的耗时，比注入 API 的方式调用同样的功能，耗时会较长

## Native 调用 JavaScript

调用全局方法

直接通过字符串拼接的方式，从外部调用 JavaScript 中的方法，因此 JavaScript 的方法必须在全局的 window 上