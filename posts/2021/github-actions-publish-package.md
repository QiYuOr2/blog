---
title: 使用Github Actions自动化发布npm包的探索
date: 2021/05/28 16:31:54
pubDate: 2021/05/28 16:31:54
tags: [Github Actions, CI]
category: 技术
description: 最近编写了一个封装了前端存储 API 的工具库，准备将它发布在 npm 上方便以后使用，不过如果每次都手动从本地打包发布的话就会非常麻烦，因此这次尝试一下自动化发布。

---

最近编写了一个封装了前端存储 API 的工具库[symstorage](https://www.npmjs.com/package/symstorage)，准备将它发布在 npm 上方便以后使用，不过如果每次都手动从本地打包发布的话就会非常麻烦，因此这次尝试一下自动化发布。

查看了许多相关文章后，我决定使用 Github Actions 配合 semantic-release 进行自动化发布。
有关[semantic-release](https://semantic-release.gitbook.io/semantic-release/)的详细介绍可以阅读官方文档，这里只做一些概述性的总结。

## semantic-release

semantic-release 的大致工作流程如下：

- 提交到特定的分支触发 release 流程
- 验证 commit 信息，生成 release note，打 git tag
- 其他后续流程，如生成 CHANGELOG.md，npm publish 等等（通过插件完成）

它会根据规范化的 commit 信息进行发布并生成发布信息，默认规则：

```bash
# 修复bug，更新小版本1.0.x
fix: <message>

# 添加新功能，更新次版本号1.x.0
feat: <message>

# 如果feat中包含BREAKING CHANGE则会更新主版本x.0.0
```

当然也可以通过插件配置自定义规则

## 配置自动化发布

### 配置 Github Actions

> 往期 Github Actions 相关文章：[使用 Github Actions 将 Vue 项目部署到 Github Pages](https://qiyuor2.github.io/categories/%E5%B7%A5%E5%85%B7/useactionstopages/)

根目录下创建`.github/workflows/release.yml`，并填入如下内容：

```yaml
name: Release
on:
  push:
    branches:
      - main
jobs:
  release:
    name: Release
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
        with:
          fetch-depth: 0
      - name: Setup Node.js
        uses: actions/setup-node@v1
        with:
          node-version: 12
      - name: Install dependencies
        run: npm ci
      - name: Release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
        run: npx semantic-release
```

官方参考文档：[Using semantic-release with GitHub Actions](https://github.com/semantic-release/semantic-release/blob/master/docs/recipes/github-actions.md)

### 配置 semantic-release

首先需要安装 semantic-release：

```bash
npm i -D semantic-release @semantic-release/changelog @semantic-release/git
```

- `@semantic-release/changelog` 用来生成 CHANGELOG.md 日志文件
- `@semantic-release/git` 用来自动修改 package.json 版本号，并提交到 Github 上

之后在根目录下创建`.releaserc`，并填入如下内容：

```json
{
  "branches": "main",
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    [
      "@semantic-release/git",
      {
        "assets": ["package.json", "CHANGELOG.md"],
        "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ],
    "@semantic-release/github"
  ]
}
```

配置中有一些我们没有手动安装的包已经在安装 semantic-release 时自动安装了

### 授权

在 npm 官网登陆后，点击头像，选择 Access Tokens，点击 Generate New Token 按钮，之后选择类型为 Publish 生成

![npm授权](https://gcore.jsdelivr.net/gh/qiyuor2/blog-image/img/npmaccesstoken.png)

然后到仓库的`Settings/Secret`下，点击`New repository secret`将刚才保存的密钥保存，并命名为`NPM_TOKEN`

> 如果这里命名不为 NPM_TOKEN，上面的 release.yml 中的`${{ secrets.NPM_TOKEN }}`也需要修改。GITHUB_TOKEN 会自动生成，不需要手动配置

## 执行

配置完成后就可以尝试提交发布了

```bash
git add .
git commit -m 'feat: semantic-release' # 注意feat:后需要一个空格
git push
```

## 参考文章

- [团队敏捷实践 —— 使用 semantic-release 自动管理发布版本](https://blog.dteam.top/posts/2020-05/semantic-release.html)
- [Github 自动发版机器人 semantic-release 配置教程](https://meixg.cn/2021/01/20/semantic-release-guide/)
