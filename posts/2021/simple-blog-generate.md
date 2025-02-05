---
title: 实现一个简单的静态博客生成器
date: 2021/02/07 19:55:00
pubDate: 2021/02/07 19:55:00
tags: [nodejs, JavaScript, blog, website, cli]
category: 技术
description: 作为一名程序员，写博客是积累知识、提升水平必不可少的一个方法。我们写博客主要有三种方法，一种是使用掘金、博客园、CSDN 等博客网站，第二种是自己搭建网站，存放自己的博客，第三种就是使用静态博客生成器，将生成的网页部署到服务器或者 github pages、gitee pages 等服务上。这...

---

作为一名程序员，写博客是积累知识、提升水平必不可少的一个方法。我们写博客主要有三种方法，一种是使用掘金、博客园、CSDN 等博客网站，第二种是自己搭建网站，存放自己的博客，第三种就是使用静态博客生成器，将生成的网页部署到服务器或者 github pages、gitee pages 等服务上。

这三种方法中，第一种自由度太低，并且定制样式很麻烦；第二种每写一篇博客都要新建个页面，非常麻烦。因此我选择了第三种方法，在使用了 hexo、vuepress，gridea 等多种静态博客生成器后，我决定自己写一个来提升自己的能力。

> 项目地址：[https://github.com/qiyuor2/CoinRailgun](https://github.com/qiyuor2/CoinRailgun)

## 明确需求

首先我们要明确需求，确定我们想要的效果

- 初始化博客文件夹，载入模板`crn init`
- 根据模板创建 markdown 文件，`crn new "Hello CoinRailgun"`
- 根据 markdown 文件生成 html 文件，`crn build`
- 本地运行网站，`crn server`

## 开始编写

### 安装依赖

根据上面我们分析出来的需求，确定出我们所需要的依赖，并且安装好他们

- `art-template`编写模板所用的模板引擎
- `commander`用来编写 cli
- `dayjs`处理时间
- `front-matter`处理 markdown 顶部的 yml 声明
- `fs-extra`fs 的扩充模块
- `glob`匹配指定文件名
- `highlight.js`高亮代码块
- `koa`和`koa-static`启动本地服务
- `markdown-it`、`markdown-it-anchor`、`markdown-it-toc-done-right`解析 markdown
- `uslug`解析锚点的汉字

```json
"dependencies": {
  "art-template": "^4.13.2",
  "commander": "^7.0.0",
  "dayjs": "^1.10.4",
  "front-matter": "^4.0.2",
  "fs-extra": "^9.1.0",
  "glob": "^7.1.6",
  "highlight.js": "^10.5.0",
  "koa": "^2.13.1",
  "koa-static": "^5.0.0",
  "markdown-it": "^12.0.4",
  "markdown-it-anchor": "^7.0.1",
  "markdown-it-toc-done-right": "^4.2.0",
  "uslug": "^1.0.4"
}
```

### 搭建项目结构

```bash
.
├─ bin
│    └─ crn.js  # 执行文件
├─ lib	# crn.js调用的各个函数
│    ├─ build.js
│    ├─ clean.js
│    ├─ new.js
│    ├─ preview.js
│    └─ init.js
├─ package.json
└─ template # 模板
       ├─ site.config.json # 配置文件
       └─ theme # 主题
              └─ default # 默认主题
                     ├─ assets
                     └─ layout
```

### crn.js

同样，根据需求将各个命令、命令的参数和说明先写出来

关于`commander`具体如何使用，可以查看[commander 文档](https://github.com/tj/commander.js/blob/master/Readme_zh-CN.md)

```js
#! /usr/bin/env node

const program = require('commander');
const version = require('../package.json').version;

program
  .version(version)
  .command('init [dir]')
  .description('初始化博客')
  .action(require('../lib/init'));

program
  .command('new <name>')
  .description('创建新的文章')
  .action(require('../lib/new.js'));

program
  .command('server [dir]')
  .description('本地预览网站')
  .option('-d, --dir <dir>', 'build时输出的目录')
  .action(require('../lib/preview.js'));

program
  .command('build [dir]')
  .description('将文章渲染为html')
  .option('-o, --output <dir>', '输出目录')
  .action(require('../lib/build'));

program
  .command('clean')
  .description('清空build出来的静态文件')
  .option('-d, --dir <dir>', 'build时输出的目录')
  .action(require('../lib/clean.js'));

program.parse(process.argv);
```

### init

初始化的时候可以传入一个目录，表示准备初始化的目录，这里我用了`ES2020`的新语法`dir = dir ?? '.'`，当`dir`为`null`或`undefined`时，使用问号右边的值。

在初始化的时候，需要明确好用户使用的目录应该是什么样的

```bash
Blog
├─ build
├─ site.config.json
├─ source
│    └─ _posts
│           └─ blog.md
└─ theme
       └─ default
              ├─ assets
              └─ layout
```

将预先准备好的模板根据设计的目录拷贝到目标目录下，而不是直接调用项目中的，因为拷贝到目标目录下后，使用者就可以更方便的自定义模板，可以更方便的写自己的样式。

关于`fs-extra`模块的各种 API 可以查看[fs-extra 文档](https://github.com/jprichardson/node-fs-extra)

关于`dayjs`可以查看[dayjs 文档](https://dayjs.gitee.io/zh-CN/)

```js
const path = require('path');
const fs = require('fs-extra');
const dayjs = require('dayjs');

module.exports = (dir) => {
  dir = dir ?? '.';

  const templateDir = path.resolve(__dirname, '..', 'template');
  fs.copySync(templateDir, path.resolve(dir));
  fs.ensureDirSync(path.resolve(dir, 'source'));

  newPost(dir);
};

function newPost(dir) {
  const firstPost = [
    '---',
    'title: Hello World',
    'date: ' + dayjs().format('YYYY/MM/DD HH:mm:ss'),
    'tags: ' + '[blog,CoinRailgunn]',
    'category: ' + 'welcome',
    '---',
    '',
    'Welcome to my blog, this is my first post',
    '<!-- more -->',
  ].join('\n');

  const file = path.resolve(dir, 'source', '_posts', 'hello.md');
  fs.outputFileSync(file, firstPost);

  console.log("博客初始化完成，键入'crn new <postName>'即可创建新的文章");
}
```

### new

创建新文章的函数和初始化函数有部分的逻辑是相同的，这里我没有将他们封装起来，如果感兴趣的话你们可以试试。创建文章需要传入一个 name，为创建的文章名，然后将其保存至`source/_post`下

```js
const fs = require('fs-extra');
const path = require('path');
const dayjs = require('dayjs');

module.exports = (name) => {
  const post = [
    '---',
    `title: ${name}`,
    'date: ' + dayjs().format('YYYY/MM/DD HH:mm:ss'),
    'tags: ' + '[blog]',
    'category: ' + 'code',
    '---',
    '',
  ].join('\n');

  const file = path.resolve('source', '_posts', `${name}.md`);
  fs.outputFileSync(file, post);

  console.log(`source/_posts/${name}.md 创建成功！`);
};
```

### build

生成静态页是整个项目最关键的部分，因为代码很多这里讲一下我的思路，详细代码可以查看[项目仓库](https://github.com/qiyuor2/CoinRailgun)

首先我们要设计好各个页面的 url，以下为我的设计：

- 首页：`/index.html`和`/page/1/index.html`
- 不同页码：`/page/页码/index.html`
- 文章页：`/categories/分类名/文章名/index.html`
- 关于我页面：`/about/index.html`
- 归档页：`/archives/index.html`
- 分类页：`/categories/index.html`
- 标签页：`/tags/index.html`
- 404 页：`/404/index.html`（这个我忘了做了

目前的浏览器会自动隐藏`index.html`，因此使用`目录名/index.html`的方式可以美化页面的地址栏

第一步，根据设计好的 url 编写好各个页面[模板](https://github.com/qiyuor2/CoinRailgun/tree/main/template/theme/default/layout)，这里我使用的是[art-template](https://aui.github.io/art-template/zh-cn/docs/index.html)

- `template/theme/default/layout/layout.art`
- `template/theme/default/layout/page.art`
- 其他请查看[CoinRailgun 默认主题模板](https://github.com/qiyuor2/CoinRailgun/tree/main/template/theme/default/layout)

然后，一些网站的基础数据，比如 author、keywords、description 等，是不会发生改变的，因此需要将他们写在统一的配置文件里[site.config.json](https://github.com/qiyuor2/CoinRailgun/blob/main/template/site.config.json)，下面是我的部分配置文件

```json
{
  "basic": {
    "icon": "",
    "avatar": "",
    "title": "",
    "author": "",
    "description": "",
    "keywords": []
  },
  "theme": {
    "name": "default",
    "highlight": "github-gist",
    "pageSize": 7,
    "exclude": ["life"],
    "friends": [],
    "about": {
      "label": "about me.",
      "url": "/about"
    },
    "nav": [
      {
        "name": "archives",
        "label": "归档",
        "url": "/archives"
      },
      {
        "name": "categories",
        "label": "分类",
        "url": "/categories"
      },
      {
        "name": "tags",
        "label": "标签",
        "url": "/tags"
      }
    ],
    "links": [],
    "footer": {
      "beian": "",
      "copyright": {
        "year": "2019-2021"
      }
    }
  },
  "dev_server": {
    "port": 3000
  }
}
```

在根据 markdown 和模板生成 html 时，我们要确定模板上需要的数据，并且将配置文件和 markdown 的内容转换为模板上的数据

```html
<!-- layout/post_item.art -->
<div class="post-item__title">
  <a href="{{url}}">{{title}}</a>
</div>
<div class="post-item__desc">
  <p class="post-item__desc-date">
    <i class="fa fa-calendar" aria-hidden="true"></i>
    {{date}}
  </p>
  <p class="post-item__desc-category">
    <i class="fa fa-folder-o" aria-hidden="true"></i>
    <a href="/categories">{{category || ''}}</a>
  </p>
</div>
<div class="post-item__abstract">
  <p class="post-item__abstract-content">{{@ abstracts}}</p>
  <p class="more" style="display:none;">
    <a href="{{url}}">查看更多</a>
  </p>
</div>
<div class="post-item__tags">
  {{each tags}}
  <a href="/tags">
    <i class="fa fa-tag" aria-hidden="true"></i>
    {{$value}}
  </a>
  {{/each}}
</div>
```

以文章列表项为例，这个模板需要`title`、`date`、`category`、`url`、`abstracts`和`tags`，其中`url`是根据设计好的`/categories/分类名/文章名/index.html`生成出来的，其他的参数都是从 markdown 文件中解析出来的，并且这些参数都写在文件头部的 yml 配置中，而`abstracts`一般是使用`<!--more-->`分割出来。

明确了以上内容后，我们就需要获取这些参数然后传递给模板渲染出来

```js
const template = fs.readFileSync(postTemplate, 'utf-8');
const content = fs.readFileSync(fullPath, 'utf-8');
const fm = require('front-matter');

function renderAbstracts() {
  // ....
}

const postItem = art.render(template, {
  ...fm(content).attributes,
  abstracts: renderAbstracts(),
});
```

这样我们就得到了渲染后的文章列表项，然后再传入`post_list.art` 渲染出来文章列表后传入`page.art`中，与其他的数据相组合拿到完整的一个页面。渲染出页面后使用`fs.outputFileSync`将页面保存到一开始设计好的目录中`build/page/1/index.html`

大致思路就是这样，更多具体实现可以查看[项目仓库](https://github.com/qiyuor2/CoinRailgun)

### server

生成所有页面后，就可以开启本地预览了，这里我使用的是`koa`，使用`express`或者其他的框架都是大差不差的。直接将 build 目录设置为静态资源即可访问。

```js
const Koa = require('koa');
const staticServe = require('koa-static');
const path = require('path');

module.exports = (dir, options) => {
  dir = dir ?? '.';
  const app = new Koa();

  const siteConfig = require(path.resolve(dir, 'site.config.json'));

  const outputDir = path.resolve(dir, options.dir ?? 'build');
  app.use(staticServe(outputDir));

  app.listen(siteConfig.dev_server.port, () => {
    console.log(
      `在浏览器中打开 http://localhost:${siteConfig.dev_server.port} 以预览网页`
    );
  });
};
```

这样我们就了解了制作一个静态博客生成器的思路和过程。

## 参考文章

- [手摸手教你撸一个静态网站生成器](https://qiankaijie.com/13.%E6%89%8B%E6%91%B8%E6%89%8B%E6%95%99%E4%BD%A0%E6%92%B8%E4%B8%80%E4%B8%AA%E9%9D%99%E6%80%81%E7%BD%91%E7%AB%99%E7%94%9F%E6%88%90%E5%99%A8.html)
- [自己动手撸一个静态博客生成器](https://juejin.cn/post/6844903503651930119)
