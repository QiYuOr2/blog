---
title: "Promise 作用、方法、新语法等"
date: 2025/2/23 22:00:57
pubDate: 2025/2/23 22:00:57
description: Promise 相关
category: 技术
tags: [JavaScript,笔记]
---

## 概述

### 什么是 Promise

语法上来讲，Promise 是一个对象，可以利用它来获取异步操作的消息。作为异步函数的返回值在返回给调用者时，操作往往还没有完成，Promise 提供了同一的方法来处理操作最终的结果。

### Promise 的作用

将异步操作以同步操作的流程表达出来，解决回调函数层层嵌套导致的「回调地狱」问题。

### 对象状态

Promise 通过控制自身的状态来控制异步操作。

- 操作未完成 `Pending`
- 操作成功 `Fulfilled`
- 操作失败 `Rejected`

`Fulfilled` 和 `Rejected` 合在一起为 `Resolved` 

这三种状态的变化途径只有两种，一旦 `Pending` 状态发生变化，就不会再有新的变化。

- `Pending` → `Fulfilled` → 操作成功，Promise 实例返回值
- `Pending` → `Rejected` → 操作失败，Promise 实例抛出错误

### 用法

```js
function fn() {
  return new Promise((resolve, reject) => {
    if (/* TRUE */) {
      resolve(result);
    } else {
      reject(error);
    }
  });
}

fn()
  .then(result => /* NEXT STEP 1 */)
  .then(result => /* NEXT STEP 2 */)
  .catch(error => /* ERROR */);
```

Promise 作为构造函数，接收一个回调函数作为参数，回调函数的入参为用来处理成功结果的 `resolve` 和用来处理失败结果的 `reject`。

使用时，所有的异步函数都返回一个 Promise 实例。Promise 实例存在一个 `then` 方法，用来指定下一步的回调函数，这样就可以用链式调用的方式解决回调函数嵌套的问题。

## Promise 各个方法的基本使用

### Promise.prototype.then(onfulfilled, onrejected) => Promise

第一个参数为状态变为 `Fulfilled` 时的回调，第二个参数为状态变为 `Rejected` 时的回调，返回一个新的 Promise 实例。链式调用 `.then()` 时，后一个 `.then()` 的回调会等待前一个 `.then()` 返回的 Promise 实例状态发生变化后执行。

通常使用时，不会用到第二个参数。

### Promise.prototype.catch(onrejected) => Promise

`.then(null, onrejected)` 和 `.then(undefined, onrejected)` 的别名，会捕获 Promise 中回调函数抛出的错误（包括 `reject` 和 `throw`）。Promise 中的错误会一直向后传递，直到被捕获为止。

### Promise.prototype.finally(onfinally?: () => void) => Promise

不论最后 Promise 是什么状态，都会执行 `.finally()` 内的回调函数。

### Promise.all([p1, p2, p3]) => Promise

将多个 Promise 实例包装为一个新的 Promise 实例。入参中数组/可迭代对象的成员需要是 Promise 实例，如果不是就会用 `Promise.resolve()` 转为 Promise 实例。

返回的 Promise 实例状态由入参的 Promise 实例状态决定：

- 入参所有的实例状态都变成 `Fulfilled` ，返回的 Promise 实例状态才会变成 `Fulfilled` ，此时入参实例的返回值组成一个数组传递到 `Promise.all()` 返回的 Promise 实例中
- 入参的 Promise 实例，只要有一个状态变为 `Rejected` ，返回的 Promise 实例状态就会变成 `Rejected` ，第一个 `Rejected`  的实例的返回值会传递到 `Promise.all()` 返回的 Promise 实例中
    - 不会中断其他 Promise 的执行

### Promise.race([p1, p2, p3]) => Promise

将多个 Promise 实例包装为一个新的 Promise 实例。入参中数组/可迭代对象的成员需要是 Promise 实例，如果不是就会用 `Promise.resolve()` 转为 Promise 实例。

返回的 Promise 实例状态由入参的 Promise 实例状态决定：只要入参的实例中有一个状态变为了`Fulfilled` ，返回的 Promise 实例就会变成 `Fulfilled` ，率先改变的 Promise 实例返回值传递到 `Promise.race()` 返回的 Promise 实例当中。

### Promise.allSettled([p1, p2, p3]) => Promise

与 `Promise.all()` 类似，不同点在于 `Proimse.allSettled()` 会等待所有入参的 Promise 实例都发生变更，返回的 Promise 实例状态才会变更。（`Promise.all()`，如果其中一个 `Rejected` 了，就不会关心其他实例的状态）

返回结果包含了入参每个实例的最终状态以及返回值，是一个固定结构的对象数组。

```js
// [
//    { status: 'fulfilled', value: value },
//    { status: 'rejected', reason: reason }
// ]
```

### Promise.any([p1, p2, p3]) => Promise

与 `Promise.all()` 完全相反，只要有一个入参实例变为 `Fulfilled` ，返回的实例就会变成 `Fulfilled` ；所有入参实例变为 `Rejected` ，返回实例才会变成 `Rejected` 

`Rejected` 时，抛出的错误包含了所有入参实例的报错。

### Promise.resolve(value?) => Promise

相当于 `new Promise(resolve => resolve(value))` 

- 入参为 Promise 实例，不做任何更改，直接返回该实例
- 入参为 `thenable` （包含 `.then`），会将对象转为 Promise 对象，立即执行 `thenable` 的 `.then`
- 入参为其他值（无入参则为 `undefined`），生成一个状态为 `Fulfilled` Promise 实例，该实例返回值为入参

### Promise.reject(reason?) => Promise

相当于 `new Promise((_resolve, reject) => reject(reason))` 

会将入参原封不动的作为错误传递下去。

### Promise.withResolvers()

https://github.com/tc39/proposal-promise-with-resolvers 类似一个工厂函数，可以减少 Promise 声明时的嵌套层级

```js
const returnAfterTwoSeconds = (func, ...args) => {
  const { promise, resolve, reject } = Promise.withResolvers();
 
  setTimeout(() => {
    try {
      resolve(func(...args));
    } catch (e) {
      reject(e);
    }
  }, 2000);
 
  return promise;
};
```

简单实现

```js
function promiseWithResolvers() {
  let resolve;
  let reject;
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  return { promise, resolve, reject };
}
```