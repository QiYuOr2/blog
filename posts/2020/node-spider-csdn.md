---
title: 'nodejs爬虫--抓取CSDN某用户全部文章'
date: 2020/02/11 13:30:55
pubDate: 2020/02/11 13:30:55
tags: [JavaScript, Node.js, 爬虫, Web Crawler]
category: 技术
description: 最近正在学习node.js，就像搞一些东西来玩玩，于是这个简单的爬虫就诞生了。

---

最近正在学习 node.js，就像搞一些东西来玩玩，于是这个简单的爬虫就诞生了。

## 准备工作

1. node.js 爬虫肯定要先安装[node.js](https://nodejs.org/zh-cn/)环境
2. 创建一个文件夹
3. 在该文件夹打开命令行，执行`npm init`初始化项目

## 正式开始

### 安装依赖

- express 用来搭建一个简单 http 服务器，也可以使用 node 原生 api
- cheerio 相当于 node 版的 jQuery，用来解析页面
- superagent 用来请求目标页面
- eventproxy 解决同时处理多个页面的问题

直接使用`npm install express cheerio superagent eventproxy `来安装依赖包，当然你也可以用别的方法。

### 创建建好目录

```shell
node-spider-csdn
├─ .gitignore
├─ node_modules
├─ README.md
├─ index.js 			项目入口
├─ package-lock.json
├─ package.json
└─ routes
  └─ csdn.js			爬虫主要代码
```

### 创建一个 Http 服务器

在`index.js`文件中，实例化一个`express`对象，启动一个 Http 服务

```js
const express = require('express');

const app = express();

app.listen(3000, function () {
  console.log('running in http://127.0.0.1:3000');
});
```

这样就启动了一个简单的 Http 本地服务，执行`node index.js`后通过`http://127.0.0.1:3000`就可以访问到这个服务器。有关 Express 的更多内容可以参考[官方文档](https://expressjs.com/zh-cn/)。

### 编写`csdn.js`模块

先引入`csdn.js`文件并且添加路由

```js
const express = require('express');
const csdn = require('./routes/csdn.js');

const app = express();

app.use(csdn);

app.listen(3000, function () {
  console.log('running in http://127.0.0.1:3000');
});
```

然后开始编写`csdn.js`

#### 整体结构

```js
// 引入需要的第三方包
const cheerio = require('cheerio');
const superagent = require('superagent');
const express = require('express');
const eventproxy = require('eventproxy');

const router = express.Router(); // 挂载路由
const ep = new eventproxy();

router.get('/csdn/:name', function (req, res) {
  const name = req.params.name; // 用户id
  // 具体实现...
});

// 将router暴露出去
module.exports = router;
```

#### 分析页面

整体结构写好后就要开始分析 CSDN 用户文章页面的 HTML 了。

随便找一个人的博客，经过观察发现：

- 原创文章的完整 url:`https://blog.csdn.net/l1028386804/article/list/2?t=1`
- CSDN 的文章列表是 40 篇一页
- 分页控件是动态生成的，所以无法直接通过 HTML 解析获得

![](https://gcore.jsdelivr.net/gh/qiyuor2/blog-image/img/someoneblog.png)

![](https://gcore.jsdelivr.net/gh/qiyuor2/blog-image/img/someoneblog-1.png)

然后我们通过开发者工具查看文章列表结构，可以发现：

- 文章信息都在类名为`article-item-box`的盒子中
- id 信息在该盒子的`data-articleid`属性中

还有一些其他的信息都很容易能查到，比如博主原创文章总数值等，可以在以后需要的时候再过来查看。

![](https://gcore.jsdelivr.net/gh/qiyuor2/blog-image/img/someoneblog-2.png)

#### 获取所有文章页面

因为无法直接获得分页信息，所以我们通过`文章总数 / 每页文章数`来获取所有的页面。

首先获取文章的总数：

```js
/**
 * 获取总文章数目
 * @param {String} url 页面路径
 * @param {Function} callback 回调
 */
let getArticleNum = function (url, callback) {
  superagent.get(url).end(function (err, html) {
    if (err) {
      console.log(`err = ${err}`);
    }
    let $ = cheerio.load(html.text);
    let num = parseInt($('.data-info dl').first().attr('title'));

    callback(num);
  });
};
```

然后利用简单的循环获取所有文章页面：

```js
// ...
router.get('/csdn/:name', function (req, res) {
  const name = req.params.name;
  getArticleNum(`https://blog.csdn.net/${name}`, function (num) {
    let pages = []; // 保存要抓取的页面

    let pageNum = Math.ceil(num / 40); // 计算一共有多少页面

    for (let i = 1; i <= pageNum; i++) {
      pages.push(`https://blog.csdn.net/${name}/article/list/${i}?t=1`);
    }
    // ...
  });
});
// ...
```

我们可以通过`console.log()`或者`res.send()`来查看获取的网址是否正确

#### 遍历获取所有页面的 HTML

```js
// ...
router.get('/csdn/:name', function (req, res) {
  const name = req.params.name;

  getArticleNum(`https://blog.csdn.net/${name}`, function (num) {
    let pages = [];
    let articleData = []; // 保存所有文章数据

    let pageNum = Math.ceil(num / 40); // 计算一共有多少页面

    for (let i = 1; i <= pageNum; i++) {
      pages.push(`https://blog.csdn.net/${name}/article/list/${i}?t=1`);
    }

    // 获取所有页面的文章信息
    pages.forEach(function (targetUrl) {
      superagent.get(targetUrl).end(function (err, html) {
        if (err) {
          console.log(`err ${err}`);
        }
        let $ = cheerio.load(html.text);

        // 当前页面的文章列表
        let articlesHtml = $('.article-list .article-item-box');

        // 遍历当前页的文章列表
        for (let i = 0; i < articlesHtml.length; i++) {
          // 解析获取文章信息
          // push到articleData中
          // ...
        }
      });
    });
  });
});
// ...
```

#### 解析文章信息

因为获取到的有些文本中空格太多，所以需要用到正则表达式来去除多余的空格。

`cheerio`对于 Document 的操作和`jQuery`基本一样，所以有前端基础的可以很轻松上手。

```js
/**
 * 解析html字符串，获取文章信息
 * @param {String} html 包含文章信息的html
 * @param {Number} index 文章索引
 */
let analysisHtml = function (html, index) {
  return {
    id: html.eq(index).attr('data-articleid'),
    title: html.eq(index).find('h4 a').text().replace(/\s+/g, '').slice(2),
    link: html.eq(index).find('a').attr('href'),
    abstract: html.eq(index).find('.content a').text().replace(/\s+/g, ''),
    shared_time: html
      .eq(index)
      .find('.info-box .date')
      .text()
      .replace(/\s+/, ''),
    read_count: html
      .eq(index)
      .find('.info-box .read-num .num')
      .first()
      .text()
      .replace(/\s+/, ''),
    comment_count: html
      .eq(index)
      .find('.info-box .read-num .num')
      .last()
      .text()
      .replace(/\s+/, ''),
  };
};
```

```js
// ...
// 遍历当前页的文章列表
for (let i = 0; i < articlesHtml.length; i++) {
  let article = analysisHtml(articlesHtml, i);
  articleData.push(article);
  // ...
}
// ...
```

我们已经获取到所有文章的信息数据，但是因为获取各个页面的文章时是并发异步进行的，所以要同时利用这些数据特殊的方法。

#### 处理并发异步操作

这里我使用的是“计数器”`eventproxy`，还有很多其他的方法都可以解决这个问题。

```js
// ...
pages.forEach(function (targetUrl) {
  superagent.get(targetUrl).end(function (err, html) {
    if (err) {
      console.log(`err ${err}`);
    }
    let $ = cheerio.load(html.text);

    let articlesHtml = $('.article-list .article-item-box');

    for (let i = 0; i < articlesHtml.length; i++) {
      let article = analysisHtml(articlesHtml, i);
      articleData.push(article);

      ep.emit('blogArtc', article); // 计数器
    }
  });
});

// 当所有'blogArtc'完成后，触发回调
ep.after('blogArtc', num, function (data) {
  res.json({
    status_code: 0,
    data: data,
  });
});
// ...
```

这样，一个简单的 node 爬虫就写好了，执行`node index.js`启动服务后，在浏览器中输入`http://127.0.0.1:3000/csdn/xxxx`就可以获得 xxxx（这是 id）的全部文章了。

## 完整代码

- [node-spider-csdn](https://github.com/qiyuor2/node-spider-csdn)

## 参考文章

- [分分钟教你用 node.js 写个爬虫](https://juejin.im/post/5b4f007fe51d4519277b9707#heading-1)

- [【nodeJS 爬虫】前端爬虫系列 -- 小爬「博客园」](https://www.cnblogs.com/coco1s/p/4954063.html)

- [10 分钟教你撸一个 nodejs 爬虫系统](https://github.com/jiayisheji/blog/issues/7)

- [node.js 学习笔记 004:使用 eventproxy 控制并发](https://www.jianshu.com/p/a86bd4bd48c9)
