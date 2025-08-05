---
title: '利用PicGo、GitHub和jsDelivr搭建图床'
date: 2020/01/28 23:24:12
pubDate: 2020/01/28 23:24:12
tags: [GitHub, jsDelivr, PicGo, CDN,笔记]
category: 工具
description: 一个高速稳定的图床对于每一个写博客的人来说都很重要，之前大部分人的选择可能都是利用微博搭建图床，但是从2019年4月开始微博开启了防盗链，导致所有依赖微博图床的图片全部无法显示。利用PicGo将图片上传到GitHub仓库，再使用jsDelivr优化对于我们来说会是一个不错的选择。

---

一个高速稳定的图床对于每一个写博客的人来说都很重要，之前大部分人的选择可能都是利用微博搭建图床，但是从 2019 年 4 月开始微博开启了防盗链，导致所有依赖微博图床的图片全部无法显示。

利用 PicGo 将图片上传到 GitHub 仓库，再使用 jsDelivr 优化对于我们来说会是一个不错的选择。

## 准备

- [PicGo](https://github.com/Molunerfinn/PicGo) PicGo 在 GitHub 上提供了 MacOS、Linux、Windows 三个系统版本的下载
- 一个用来存放图片的 GitHub 仓库

## 具体步骤

### 新建一个 GItHub 仓库

![](https://gcore.jsdelivr.net/gh/qiyuor2/blog-image/img/newrepo.png)

![](https://gcore.jsdelivr.net/gh/qiyuor2/blog-image/img/nreponame.png)

### 生成 Token

**github**--**setting**--**developer settings**--**personal access token**

**Note**随便填一下，在**Select scopes**中勾选**repo**（当然也可以全选

![](https://gcore.jsdelivr.net/gh/qiyuor2/blog-image/img/settingnewtoken.png)

![](https://gcore.jsdelivr.net/gh/qiyuor2/blog-image/img/newtokendevset.png)

![](https://gcore.jsdelivr.net/gh/qiyuor2/blog-image/img/settokenlist.png)

![](https://gcore.jsdelivr.net/gh/qiyuor2/blog-image/img/settokenselect.png)

点击**Generate token**

![](https://gcore.jsdelivr.net/gh/qiyuor2/blog-image/img/finishgithubtoken.png)

请务必保存好生成的 Token，它只会显示这一次

![](https://gcore.jsdelivr.net/gh/qiyuor2/blog-image/img/finishgithubtoken02.png)

### 配置 PicGo

- 仓库名要按照**用户名/仓库名**的方式填写
- 分支名填**master**
- Token 就填刚刚生成的
- 指定存储路径，如果填写**img/**就会在仓库下创建一个 img 文件夹，图片会存在其中
- 设置自定义域名，我们这里要使用 jsDelivr 加速访问，所以要填上**https://gcore.jsdelivr.net/gh/用户名/图床仓库名**

![](https://gcore.jsdelivr.net/gh/qiyuor2/blog-image/img/picgoconfig.png)

配置完成后，就可以在 PicGo 上传区上传图片了，上传图片成功后就可以通过**https://gcore.jsdelivr.net/gh/用户名/图床仓库名/图片名.后缀**访问到图片了，速度很快。

在 PicGo 设置中可以开启上传提示。

如果家里网络不太好，上传图片时可能需要多试几次，可以将网址打开刷新几次观察图片是否上传成功，PicGo 有时候会通知上传失败但是实际上传成功了。

## 参考文章

[博客图片上传 picgo 工具 github 图传使用](https://removeif.github.io/removeif-demo/theme/博客图片上传picgo工具github图传使用.html)
