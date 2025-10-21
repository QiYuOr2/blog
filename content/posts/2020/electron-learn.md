---
title: Electron踩坑记录
date: 2020/10/21 10:00:47
pubDate: 2020/10/21 10:00:47
tags: [JavaScript, Electron, NodeJs]
category: 技术
description: 心血来潮想做一个PC端应用，就来学学Electron，以下为学习Electron时的踩坑记录。

---

## 安装

在国内安装`electron`的时候，可能会因为网络原因遇到卡在`Building fresh packages...`（yarn）或者是卡在`node install.js`（npm）这一步上。

在项目的根目录下创建`.yarnrc`或`.npmrc`然后输入如下内容更改各依赖的源，即可解决该问题。

```
registry "https://registry.npm.taobao.org"

sass_binary_site "https://npm.taobao.org/mirrors/node-sass/"
phantomjs_cdnurl "http://cnpmjs.org/downloads"
electron_mirror "https://npm.taobao.org/mirrors/electron/"
sqlite3_binary_host_mirror "https://foxgis.oss-cn-shanghai.aliyuncs.com/"
profiler_binary_host_mirror "https://npm.taobao.org/mirrors/node-inspector/"
chromedriver_cdnurl "https://cdn.npm.taobao.org/dist/chromedriver"
```

## C++包 rebuild

使用 electron 就避不开要使用一些第三方的 C++包，使用这些包的时候需要根据 node 和 electron 的版本重新编译。

### 手动 rebuild

手动编译要根据 electron 的版本设置 target，然后再根据 node 的版本设置对应的 abi 值，（详见[对应表](https://github.com/mapbox/node-pre-gyp/blob/master/lib/util/abi_crosswalk.json)）

```bash
$ npm rebuild --runtime=electron --target=6.0.12 --disturl=https://atom.io/download/atom-shell --abi=72
```

### 使用 electron-rebuild

```bash
yarn add electron-rebuild -D # or npm install electron-rebuild --save-dev
```

下载后使用`npx electron-rebuild`即可重新编译，有时候会因为网络原因构建时下载依赖失败，因此可以通过`-d=http://npm.taobao.org/mirrors/atom-shell`切换为淘宝镜像（好久没更新了）

> **注意**：Windows 环境下安装 electron-rebuild 需要先安装`windows-build-tools`

## 打包

electron 常用的打包工具有两个`electron-builder`和`electron-forge`，我使用的是社区活跃度较高的`electron-builder`，electron 打包时会下载一些必要的依赖，因此和安装依赖、rebuild 具有同样的问题——网络问题，因此需要更改下载地址，从淘宝镜像下载

```
ELECTRON_BUILDER_BINARIES_MIRROR=https://npm.taobao.org/mirrors/electron-builder-binaries/
```

不过我改完镜像打包依然是显示网络超时，因此我选择了手动添加 nsis 和 winCodeSign

从淘宝镜像中分别下载所需要版本的 nsis 和 winCodeSign，解压后将 nsis 的整个文件夹放到`C:\Users\admin\AppData\Local\electron-builder\Cache\nsis`中，将 winCodeSign 的整个文件夹放到`C:\Users\admin\AppData\Local\electron-builder\Cache\winCodeSign`中，即可成功打包。

## 白屏问题

### 简单解决

- 在 ready-to-show 的时候再显示
- 设置窗口底色

```js
win = new BrowerWindow({
  width: 600,
  height: 300,
  webPreferences: {
    nodeIntegration: true,
  },
  show: false,
  background: '#2e2c29',
});

win.on('ready-to-show', () => {
  win.show();
});
```

### 使用占位图

- [https://github.com/dengyaolong/electron-loading-window-example](https://github.com/dengyaolong/electron-loading-window-example)
