---
title: JavaScript的事件循环机制（Event Loop）
date: 2021/05/17 17:12:32
pubDate: 2021/05/17 17:12:32
tags: [JavaScript,笔记]
category: 技术
description: 事件循环机制是JavaScript运行的核心，因此要想写出bug少的js代码就必须要了解这个机制是如何运作的，以及为什么会有这个机制。本篇文章是我对Event Loop的理解

---

事件循环机制是 JavaScript 运行的核心，因此要想写出 bug 少的 js 代码就必须要了解这个机制是如何运作的，以及为什么会有这个机制。

本篇文章是我对 Event Loop 的理解

## 单线程

JavaScript 是一个单线程的非阻塞的脚本语言，也就是说 JavaScript 在同一时间只能做一件事。那么，为什么 JavaScript 不能有多个线程呢？

在最开始 JavaScript 还不像现在是一个全能的语言，那个时候它只有一个任务，就是作为浏览器的脚本，与用户互动和操作 DOM。这就决定了它只能是单线程的，不然会带来很复杂的问题。比如：如果 JavaScript 有两个线程，一个线程在某个 DOM 节点上添加了内容，而另一个线程删除了这个节点，那么这个时候应该以哪个线程为准？

所以在最开始 JavaScript 命中注定是单线程的语言。

> HTML5 之后提出了 Web Worker，为 JavaScript 提供了多线程环境，但是子线程完全受主线程控制并且不能操作 DOM，因此并没有改变 JavaScript 单线程的本质

## 执行栈与任务队列

为了解决单线程导致的 CPU 利用率低以及后一个任务必须等待前一个任务结束才能执行的问题，JavaScript 将所有任务分成了**同步任务**和**异步任务**，同步任务会在进入主线程**执行栈**，而异步任务会进入**任务队列**等执行栈所有任务执行完毕后才会进入执行栈执行。

> JavaScript 是单线程的，但是 JavaScript 的执行环境不是，浏览器会为异步任务单独开一个线程，也就是任务队列

主线程会不断重复以下三个步骤：

1. 同步任务进入执行栈执行
2. 异步任务进入主线程之外的任务队列
3. 执行栈中的所有同步任务执行完毕后，读取任务队列中的任务，放入执行栈中执行

## 微任务与宏任务

异步任务又被分为**微任务**和**宏任务**，它们之间的执行优先级并不相同，微任务总会在宏任务之前执行，也就是说：同步任务>微任务>宏任务。

> 在浏览器中，微任务的任务队列会在每个宏任务执行完后执行
>
> 老版本的 Nodejs 中有所不同，微任务会在事件循环的各个阶段之间执行
>
> Nodejs V11 之后就与浏览器的机制相同了

微任务：

- Promise 的`Promise.then`\`Promise.catch`\`Promise.finally`
- MutationObserver（可以用来监听 DOM 变动）
- `proccess.nextTick`（nodejs 独有）
- [queueMicrotask](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/queueMicrotask)

宏任务：

- script 标签中的代码
- 事件触发的回调函数，如：DOM 的事件回调、`requestAnimationFrame`、IO 操作
- 定时器的回调函数

可能还会完善...
