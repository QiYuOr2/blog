---
title: '使用Github Actions将Vue项目部署到Github Pages'
date: 2020/11/16 21:44:13
pubDate: 2020/11/16 21:44:13
tags: [Github Actions, Github Pages, Github]
category: 工具
description: GitHub Actions 是 GitHub 的持续集成服务，是一个非常强大的功能，用它可以实现很多自动化功能。现在我们来使用Github Actions将我们做好的Vue项目部署到Github Pages上。

---

GitHub Actions 是 GitHub 的持续集成服务，是一个非常强大的功能，用它可以实现很多自动化功能。现在我们来使用 Github Actions 将我们做好的 Vue 项目部署到 Github Pages 上。

本项目源码：[qiyuor2/github-actions-demo](https://github.com/qiyuor2/github-actions-demo)

## Github Actions 是什么？

持续集成通常由很多操作组成，比如运行单元测试、登录远程服务器、打包代码等等，Github 将这些操作称为 actions。
这些 actions 在不同项目中也是类似甚至是完全相同的，是完全可以共享的。而 Github 就根据这个特点创建了一个 actions 市场，可以发布自己的 actions 和使用其他人的写好的 actions。

## 基本概念

- workflow：持续集成一次运行的过程，即一个工作流程
- job：任务，一个工作流程由一个或多个任务组成
- step：步骤，每个任务由多个步骤组成，逐步完成
- action：动作，每个步骤可以执行一个或多个动作

## 创建一个 Vue 项目

使用 Vue CLI 创建一个 Vue 项目

```bash
vue create github-actions-demo
cd github-actions-demo
```

在项目根目录下创建一个`vue.config.js`，修改`publicPath`为将要发布的 Github Pages 的子路径，比如发布后的地址`https://qiyuor2.github.io/github-actions-demo/`，那么`publicPath`就要设置为`/github-actions-demo/`

```js
module.exports = {
  publicPath: '/github-actions-demo/',
};
```

## 编写 workflow 文件

workflow 文件采用 YAML 格式，后缀为`.yml`，在项目根目录下创建`.github/workflows/`目录，Github 只要发现该目录中由 yml 文件就会自动运行该文件。
创建`ci.yml`

```yaml
# 该workflow的名称，可以随意填写
name: Build And Deploy To Github Pages

# workflow的触发事件，这里代表main分支的push事件触发
on:
  push:
    branches: [main]

# 任务
jobs:
  # build-and-deploy 为任务的ID
  build-and-deploy:
    # 运行所需要的环境
    runs-on: ubuntu-latest

    steps:
      # 步骤名
      - name: Checkout
        # 使用的actions脚本，这里是官方提供的获取源码脚本
        uses: actions/checkout@v2.3.1
        # 这个为使用 JamesIves/github-pages-deploy-action脚本所需要的配置
        with:
          persist-credentials: false

      # 执行npm脚本打包项目
      - name: Install and Build
        run: |
          npm install
          npm run build

      # 执行JamesIves/github-pages-deploy-action将项目发布到Github Pages
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@3.7.1
        with:
          # 该workflow需要操作repo，因此需要一个密钥，下面会讲到如何获取这个密钥
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
          # 发布到的分支
          BRANCH: gh-pages
          # 要发布的文件夹
          FOLDER: dist
```

## 获取密钥并存储到 Github 仓库中

### 创建密钥

进入 Github 的 Settings 中[https://github.com/settings/](https://github.com/settings/)，依次点击` Developer settings`、`Personal access tokens`。然后点击`Generate new token`创建。因为要操作仓库，所以需要勾选`repo`权限。

具体请参考：[创建个人访问令牌](https://docs.github.com/cn/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token)

**请及时保存生成的密钥**

### 将密钥存储到 Github 仓库

首先创建一个 Github 仓库，然后到仓库的`Settings/Secret`下，点击`New repository secret`将刚才保存的密钥保存，并命名为`ACCESS_TOKEN`（注意，如果这里的命名更改了，前面的 yml 文件中的`${{ secrets.ACCESS_TOKEN }}`也要更改）

### 推送仓库

根据 Github 上的提示，将准备好的本地仓库推送之后就会自动执行 workflow。

我们可以到 Actions 中实时查看运行日志。

## 一个小问题

workflow 执行成功后我们仍然有可能访问对应网址(`https://qiyuor2.github.io/github-actions-demo`)时显示 404。

这时候我们需要到 Github 仓库中的`Settings/Options`下，找到`Github Pages`，点击`Choose a theme`选择任意一个主题即可正常访问。

## 参考文章

- [GitHub Actions 入门教程](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)
- [Vue CLI 配置参考](https://cli.vuejs.org/zh/config/#publicpath)
- [创建个人访问令牌](https://docs.github.com/cn/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token)
