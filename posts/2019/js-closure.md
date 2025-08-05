---
title: 'JavaScript闭包'
date: 2019/10/18 22:00:04
pubDate: 2019/10/18 22:00:04
tags: [JavaScript,笔记]
category: 技术
description: 闭包是JavaScript中的一个难点，同时也是它的特色，JavaScript的很多高级应用都要依靠闭包来实现。以下是我学习闭包的记录，希望对你有些帮助。

---

闭包是 JavaScript 中的一个难点，同时也是它的特色，JavaScript 的很多高级应用都要依靠闭包来实现。以下是我学习闭包的记录，希望对你有些帮助。

## 变量作用域

在学习闭包之前，我们首先要理解 JavaScript 不同与其他语言独特的变量作用域。在 JavaScript 中，不存在局部作用域的概念，但是有全局作用域以及函数作用域。全局作用域与其他语言的相同，没有需要注意的地方，而函数作用域是指函数内部声明的变量在函数外部无法直接访问。

```javascript
var a = 99;
function f1() {
  console.log(a);
}
f1();
```

上面的代码中，f1 可以读取到全局变量 a，而下面的代码中 a 无法被访问。

```javascript
function f1() {
  var a = 99;
}
console.log(a);
```

## 如何从外部读取函数内部声明的变量？

在某些情况下，我们可能需要得到函数内部的变量，正常情况下是无法做到的，因此需要用特殊的办法。

```javascript
function f1() {
  var a = 99;
  function f2() {
    console.log(a);
  }
}
```

上面代码中，我们在函数 f1 中定义另一个函数 f2，这样 f1 中的所有变量对于 f2 来说就是可见的，既然 f2 可以读取到 f1 中的变量，那么我们只要把 f2 作为 f1 的返回值，我们就可以在 f1 的外部读取到它内部的变量了。

```javascript
function f1() {
  var a = 99;
  function f2() {
    console.log(a);
  }
  return f2;
}
var result = f1();
result();
```

此时，就形成了一个简单的闭包。因此，闭包就可以简单的理解为函数中的函数，而本质上，闭包就是一个连接函数内部和外部的桥梁。

## 闭包的特性

闭包会使得函数中的变量都被保存到内存中。首先我们先看一下以下两个例子

```javascript
function A() {
  var count = 0;
  function B() {
    count++;
    console.log(count);
  }
  return B;
}
var C = A();
C(); // 1
C(); // 2
C(); // 3
```

count 是函数 A 中的一个变量，它的值在函数 B 中被改变，函数 B 每执行一次，count 的值就在原来的基础上累加 1，因此，函数 A 中的 count 变量会一直保存在内存中。

```javascript
function A(x) {
  function B(y) {
    console.log(x + y);
  }
  return B;
}
var C = A(3);
C(5); //8
```

当 3 传入 A 函数后，B 函数就会记住这个值，所以在后面传入 5 的时候只会对 B 函数中的 y 赋值，所以最后会输出 8。

## 使用闭包的注意点

由于上述闭包的特性，每次使用闭包都会大量增加内存的消耗，所以不能滥用闭包，否则会影响网页的性能。我们也可以在函数退出前，使函数内变量指向 null 来手动删除变量。我们可以来看下一道经典的面试题来理解。

```javascript
function outer() {
  var num = 0; //内部变量
  return function add() {
    //通过return返回add函数，就可以在outer函数外访问了
    num++; //内部函数有引用，作为add函数的一部分了
    console.log(num);
  };
}
var func1 = outer();
func1(); //实际上是调用add函数， 输出1
func1(); //输出2 因为outer函数内部的私有作用域会一直被占用
var func2 = outer();
func2(); // 输出1  每次重新引用函数的时候，闭包是全新的。
func2(); // 输出2
```

## 参考文章

- [深入浅出 Javascript 闭包](https://github.com/ljianshu/Blog/issues/6)
- [让你分分钟理解 JavaScript 闭包](https://www.cnblogs.com/onepixel/p/5062456.html)
- [学习 Javascript 闭包（Closure）](http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html)
