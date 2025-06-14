---
title: 无侵入式的接口Mock方案尝试
date: 2022/08/12 16:03:04
pubDate: 2022/08/12 16:03:04
description: 使用中间人代理进行Mock
category: 技术
---

通过中间人拦截并模拟接口，可以实现对项目无侵入的 mock 数据

demo: https://github.com/QiYuOr2/mitm-mock

## 现状

- 前后端并行开发时，需要模拟数据，直接在项目中 mock 对项目的侵入比较严重
- 需要单独控制某个接口或某些接口使用 mock 数据，因此直接使用后端的 mock 接口不合适

## 核心思路

![流程](https://gcore.jsdelivr.net/gh/qiyuor2/blog-image/img/20220812mitm-mock1.png)

### 伪造数字证书

配置代理服务器后客户端在发送 https 请求之前会向代理服务器发送 connect 请求，代理服务器监听 connect 请求，根据 connect 请求中的域名伪造数字证书

### 请求目标服务器（无需 Mock 的请求）

使用伪造的数字证书创建 Server，将请求连接到该 Server（通过 hostname:port），在该 Server 中转发请求到目标服务器，最后将请求到的数据发回客户端

### 拦截并 Mock 数据

在转发请求那一步时，可以不对请求进行转发，直接将自己 Mock 的数据填入 response 中发回客户端

## 参考

- [基于 Node.js 的 HTTPS MITM(中间人)代理的原理和实现](https://github.com/wuchangming/https-mitm-proxy-handbook)
