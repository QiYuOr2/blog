---
title: 浅谈src与href的区别
date: 2021/05/09 16:04:33
pubDate: 2021/05/09 16:04:33
tags: [html]
category: 技术
description: src 和 href 都是用来引入外部资源的属性，例如：图片、视频、CSS 文件、JavaScript 文件等。那么它们两者之间究竟有什么样的区别呢？

---

src 和 href 都是用来引入外部资源的属性，例如：图片、视频、CSS 文件、JavaScript 文件等。
那么它们两者之间究竟有什么样的区别呢？

```html
<link href="style.css" rel="stylesheet" />
<img src="pic.png" alt="pic" />
<script src="script.js"></script>
```

**href**(Hypertext Reference 超文本引用)属性通过指定 Web 资源的位置，来定义当前元素或者当前文档与目标资源之间的链接或关系。当我们引入 CSS 文件时：

```html
<link href="style.css" rel="stylesheet" />
```

浏览器会明白这是一个样式表资源，这时浏览器对于页面（HTML）的解析不会暂停（渲染可能会暂停，因为浏览器需要使用样式表的样式来绘制页面），这是因为它并不会像`@import`一样将整个 CSS 文件嵌入到`style`标签中。

**src**(Source)属性会将资源嵌入到当前文档中元素所在位置。当我们引入 JavaScript 文件时：

```html
<script src="script.js"></script>
```

浏览器解析到这句代码时，页面的加载和解析都会暂停，直到浏览器拿到并执行完这个 JavaScript 文件，这就相当于将 JavaScript 文件中的内容全部嵌入到`script`标签中。

网上有许多文章依次就认定为使用`src`属性就代表了资源会阻塞页面，我并不认同这个观点。

在 HTML5 出现之后，我们可以通过给`script`标签添加`async`或`defer`属性来使 JavaScript 脚本异步加载。图片的引入也能很好的证明并非使用`src`属性就代表了该资源会阻塞页面，我们在引入图片时也是使用的`src`属性，在实际体验中我们可以看到，如果图片加载较慢会产生一种页面加载完成，只有图片所在的部分是空白。

因此我认为，`src`和`href`的区别仅在于`src`会将资源嵌入到当前文档中，而`href`会建立一个关联指向资源（就像`<a href="https://www.baidu.com"></a>`并不会将百度嵌入到当前页面中，而`<iframe src="https://www.baidu.com"></iframe>`就会）。

## 参考文章

- [Difference between SRC and HREF](https://stackoverflow.com/questions/3395359/difference-between-src-and-href)
