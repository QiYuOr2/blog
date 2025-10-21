---
title: '搭建hexo静态博客'
date: 2019/08/31 09:13:23
pubDate: 2019/08/31 09:13:23
tags: [hexo,笔记]
category: 工具
description: 使用hexo搭建博客，并将博客部署到github

---

使用 hexo 搭建博客，并将博客部署到 github

## 需要的工具

- [Node.js](https://nodejs.org/zh-cn/)
- [Git](https://github.com/waylau/git-for-win)
- 一个 Github 账号

## 正式开始

1. 在任意目录下新建一个文件夹，如 blog，在该文件夹下右键打开 git bash here，执行`npm install -g hexo-cli`，安装 hexo
2. 执行`hexo init`
3. 执行`npm install`
4. 根据提示依次执行`npm audit fix`和`npm audit fix --force`
5. 执行`hexo g`，生成博客
6. 执行`hexo s`后，可以在 http://localhost:4000 上预览博客
7. 在 github 上新建一个仓库，命名为 username.github.io，其中 username 必须为你 github 的用户名
8. 执行`npm install hexo-deployer-git --save`，安装 deployer-git，用来将 hexo 推送到 github
9. 修改配置文件：在文件夹中找到并打开`_config.yml`文件，将文件末尾的 deploy 部分更改如下，repo: 后填写你新建的 github 仓库的地址。**注意: 请使用英文冒号以及冒号后要有空格**

```yaml
deploy:
  type: git
  repo: https://github.com/qiyuor2/qiyuor2.github.io.git
  branch: master
```

10. 分别执行`hexo clean`，`hexo g`，`hexo d`，即可在 https://username.github.io *(username 为你的用户名)*中看到自己的博客

## 添加新的文章

1. 执行`hexo new "文章标题"`，会在`\source\_posts`下生成一个 md 文件，在该文件中编辑文章即可
2. 写完文章后，分别执行`hexo g`，`hexo d`，即可将文章发布成功，如果网站上没有出现文章可以稍等一会儿再刷新。(`hexo clean`在发布和修改文章时可以不执行，在修改主题后需要执行)
