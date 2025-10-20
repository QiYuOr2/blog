---
title: Promise 并发控制中的同步循环和异步任务
date: 2025/10/20 10:21:53
pubDate: 2025/10/20 10:21:53
description: 解析 JavaScript 中同步循环与异步任务的陷阱，结合 EventLoop 深入理解 Promise.finally 的执行时机与正确实现方法。
category: 技术
tags: [EventLoop, Promise, 面试题, JavaScript Promise 并发控制, Promise 调度器实现, JavaScript 异步循环陷阱]
---

最近遇到了一道涉及 EventLoop 的面试题，本身题目并不难，但写出来后不论如何都得不到想要的结果，于是记录一下出问题的地方。

## 实现一个带并发限制的 Promise 调度器

```javascript
// 请实现一个带并发限制的Promise调度器Scheduler，保证同时最多运行的Promise数量不超过限制。
// 调度器需要提供两个主要方法：
//     add(promiseCreator)：添加一个返回Promise的函数到调度器。
//     start()：开始执行所有已添加的Promise函数。
// 示例：

class Scheduler {
  constructor(limit) {
    this.limit = limit;
    this.queue = [];
    this.current = 0;
  }

  add(promiseCreator) {
    this.queue.push(promiseCreator);
  }
  
  start() {
    // 实现 start
  }
}

// 示例用法：
const timeout = (time) => new Promise((resolve) => setTimeout(resolve, time));

const scheduler = new Scheduler(2);

const addTask = (time, order) => {
  scheduler.add(() => timeout(time).then(() => console.log(order)));
};

addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");

scheduler.start();

// 预期输出：
// 2
// 3
// 1
// 4

```

## 我的错误

拿到题目后我的第一反应就是利用循环取出队列中的 Promise，依次执行它们，于是就有了下面这段代码：

```javascript
start() {
  while (this.queue.length) {
    if (this.current < this.limit) {
      const promise = this.queue.shift();
      this.current++;
      promise().finally(() => {
        this.current--;
      });
    }
  }
}
```

如果不考虑语言特性，只从逻辑上来看，这段代码是其实符合题目要求的。但如果结合 JavaScript 本身来看， `while` 中都是同步任务，而 `Promise.finally` 是异步任务，我又没有去等待 Promise 完成后再继续循环，必然是无法达到我想要的效果的。

这段代码的实际运行结果是陷入了死循环。由于事件循环机制，程序一直在执行 `while` 这段同步循环代码，阻塞在了处理同步任务的阶段，无法进入异步任务处理阶段，位于微任务中的 `this.current--` 也就一直没有执行。

## 正确题解

在明白问题所在后，思路就清晰了许多——只要保证 `while` 中的同步代码下一次执行在 `Promise.finally` 之后就可以了。

```javascript
start() {
  const next = () => {
    if (!this.queue.length || this.current >= this.limit) {
      return;
    }
    const promise = this.queue.shift();
    this.current++;
    promise().finally(() => {
      this.current--;
      next();
    });
  }
  
  for (let i = 0; i < this.limit; i++) {
    next();
  }
}
```

最开始按照并发限制执行队列中的任务，剩余任务会在前一个任务执行完成后依次执行。

在这道题的基础上还可以加一些其他需求：

- `start` 调用后继续向队列中添加任务要如何处理
- 队列所有任务完成后执行回调

---

我一直认为自己对于 EventLoop 相关概念，以及 Promise 的应用都很熟练，这次出现的错误实在不应该。每次遇到异步任务的都应该判断一下：当前代码是否同步执行、下一步是否依赖异步结果。