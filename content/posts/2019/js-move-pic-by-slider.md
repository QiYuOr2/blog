---
title: JS实现可用滑块滑动的缓动图
date: 2019/08/31 12:48:44
pubDate: 2019/08/31 12:48:44
tags: [JavaScript]
category: 技术
description: 尝试模仿京东的“发现好货”模块的可用滑块滑动的缓动图

---

## JS 代码

```javascript
function $(id) { return document.getElementById(id); }
//缓动轮播图
var fhTimer;
var fhNum = 0;
var barNum = 0;
fhTimer = setInterval(marquee, 20);
function marquee() {
    fhNum--;
    barNum = fhNum;
    if(fhNum < -2400) {
        fhNum = 0;
    }
    $("fhc_ul").style.left = fhNum + "px";
    if(fhNum < -2400) {
        barNum = fhNum + 2400;
    }
    $("fhc_dBar").style.left = -(barNum / 2.75) + "px";
}
$("fhcShow").onmouseover = function() {
    $("fhc_d_box").style.display = "block";
    clearInterval(fhTimer);
}
$("fhc_d_box").onmouseover = function() {
    $("fhc_d_box").style.display = "block";
}
$("fhcShow").onmouseout = function() {
    $("fhc_d_box").style.display = "none";
    fhTimer = setInterval(marquee, 20);
}
//鼠标悬浮在标题也在暂停滚动
$("fhTit").onmouseover = function() {
    clearInterval(fhTimer);
}
$("fhTit").onmouseout = function() {
    fhTimer = setInterval(marquee, 20);
}
//滑块
$("fhc_dBar").onmousedown = function(event) {
    var event = event || window.event;
    var leftValue = event.clientX - this.offsetLeft;
    document.onmousemove = function(event) {
        var evt = event || window.event;
        var locationX = evt.clientX - leftValue;
        if(locationX < 0) {
            locationX = 0;
        }
        else if(locationX > 960 - 99) {
            locationX = 960 - 99;
        }
        $("fhc_dBar").style.left = locationX + "px";
        fhNum = -locationX * 2.75;
        //如果选中了，就取消选中，防止出现bug
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    }
    document.onmouseup = function() {
        document.onmousemove = null;//取消注册的这个事件
    }
}
```

## HTML 代码

```html
<div class="fxhh_ctt">
    <div class="fh_c_show" id="fhcShow">
        <ul class="fh_c_under" id="fhc_ul">
            <li><a href=" ">
                <p class="topTit">商品1</p>
                <img src="" alt="">
            </a></li>
            <li><a href=" ">
                <img src="" alt="">
                <p class="botTit">商品2</p>
            </a></li>
            <li><a href=" ">
                <p class="topTit">商品3</p>
                <img src="" alt="">
            </a></li>
            <li><a href=" ">
                <img src="" alt="">
                <p class="botTit">商品4</p>
            </a></li>
            <li><a href=" ">
                <p class="topTit">商品5</p>
                <img src="" alt="">
            </a></li>
            <li><a href=" ">
                <img src="" alt="">
                <p class="botTit">商品6</p>
            </a></li>
            <li><a href=" ">
                <p class="topTit">商品7</p>
                <img src="" alt="">
            </a></li>
            <li><a href=" ">
                <img src="" alt="">
                <p class="botTit">商品8</p>
            </a></li>
            <li><a href=" ">
                <p class="topTit">商品9</p>
                <img src="" alt="">
            </a></li>
            <li><a href=" ">
                <img src="" alt="">
                <p class="botTit">商品10</p>
            </a></li>
            <li><a href=" ">
                <p class="topTit">商品11</p>
                <img src="" alt="">
            </a></li>
            <li><a href=" ">
                <img src="" alt="">
                <p class="botTit">商品12</p>
            </a></li>
            <li><a href=" ">
                <p class="topTit">商品1</p>
                <img src="" alt="">
            </a></li>
            <li><a href=" ">
                <img src="" alt="">
                <p class="botTit">商品2</p>
            </a></li>
            <li><a href=" ">
                <p class="topTit">商品3</p>
                <img src="" alt="">
            </a></li>
            <li><a href=" ">
                <img src="" alt="">
                <p class="botTit">商品4</p>
            </a></li>
            <li><a href=" ">
                <p class="topTit">商品5</p>
                <img src="" alt="">
            </a></li>
        </ul>
    </div>
    <!-- 滑块 -->
    <div class="fhc_box" id="fhc_d_box">
        <div class="fhc_drop" id="fhc_dBar"></div>
    </div>
    <!-- 滑块end -->
</div>
```

## CSS 代码

```css
.fxhh .fxhh_ctt {
    width: 990px;
    background-color: #fff;
    float: left;
}
.fxhh .fxhh_ctt .fh_c_show .fh_c_under img {
    width: 150px;
    height: 150px;
}
.fxhh .fxhh_ctt .fh_c_show {
    width: 990px;
    height: 260px;
    background-color: #fff;
    overflow: hidden;
    position: relative;
}
.fxhh .fxhh_ctt .fh_c_show .fh_c_under {
    width: 2000%;
    position: absolute;
}
.fxhh .fxhh_ctt .fh_c_show .fh_c_under li {
    float: left;
    text-align: center;
    width: 150px;
    height: 180px;
    margin-top: 40px;
    margin-right: 50px;
}
.fxhh .fxhh_ctt .fh_c_show .fh_c_under li .topTit {
    margin-bottom: 10px;
}
.fxhh .fxhh_ctt .fh_c_show .fh_c_under li .botTit {
    margin-top: 10px;
}
.fxhh .fxhh_ctt .fhc_box {
    display: none;
    width: 960px;
    height: 4px;
    background-color: #f3f3f3;
    margin: 0 auto;
    position: absolute;
    top: 250px;
    left: 210px;
}
.fxhh .fxhh_ctt .fhc_drop {
    width: 99px;
    height: 9px;
    border-radius: 4px;
    background-color: #d8d8d8;
    position: absolute;
    top: -3px;
}
```
