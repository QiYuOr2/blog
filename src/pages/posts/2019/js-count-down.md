---
title: 利用JavaScript实现倒计时
date: 2019/08/17 19:59:18
tags: [JavaScript]
category: 技术
summary: 利用 JS 中的 Date 对象即可实现，创建目标时间和当前时间，利用 getTime 函数将两个时间转换成距离 1970-01-01 的秒数，相减后转化为年月日即可
layout: ../../../layouts/Post.astro
---

> 利用 JS 中的 Date 对象即可实现

### js 代码

```js
<script>
    window.onload = function() {
        setInterval(function() {
            var nowTime = new Date();//获取当前时间
            //创建日期对象
            var endTime = new Date("2019-9-1 00:00:00");
            var seconds = parseInt((endTime.getTime() - nowTime.getTime()) / 1000);//两个时间点的时间差(秒)
            var d = parseInt(seconds / 3600 / 24);//得到天数
            var h = parseInt(seconds / 3600 % 24);//小时
            var m = parseInt(seconds / 60 % 60);//分钟
            var s = parseInt(seconds % 60);//秒
            document.getElementById("djs").innerHTML = "距离开学还有" + d +"天" + h + "小时" + m + "分钟" + s + "秒";
        }, 1000);
    }
</script>
```

### HTML 及样式

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      p {
        font-size: 24px;
        color: red;
        border: 1px solid red;
        text-align: center;
        width: 600px;
        margin: 20% auto;
        line-height: 50px;
      }
    </style>
  </head>
  <body>
    <p id="djs"></p>
  </body>
</html>
```
