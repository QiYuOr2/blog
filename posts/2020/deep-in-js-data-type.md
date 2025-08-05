---
title: 深入学习JavaScript数据类型
date: 2020/07/06 19:44:50
pubDate: 2020/07/06 19:44:50
tags: [JavaScript,笔记]
category: 技术
description: 数据类型是我们学习`JavaScript`时最先接触的东西，它是`JavaScript`中最基础的知识，这些知识看似简单，但实则有着许多初学者甚至是部分学习了多年`JavaScript`的老手所不了解的知识。

---

数据类型是我们学习`JavaScript`时最先接触的东西，它是`JavaScript`中最基础的知识，这些知识看似简单，但实则有着许多初学者甚至是部分学习了多年`JavaScript`的老手所不了解的知识。


## 数据类型

ECSMAScript标准中规定了7种数据类型，这7种数据类型又分为基本类型和引用类型。

**基本类型**：

- `Null`：只包含一个值：`null`
- `Undefined`：只包含一个值：`undefined`
- `Boolean`：包含`true`和`false`
- `Number`：整数或浮点数，还有一些特殊值（`-Infinity`、`+Infinity`、`NaN`）
- `String`：字符串
- `Symbol`：表示独一无二的值（ES6加入）

ES10(ES2019)中新增了一种基本类型`BigInt`，可以用来表示超出`number`安全范围的任意精度整数。

**引用类型**：

- `Object`对象：包含对象、数组、函数等。

## 基本类型和引用类型的区别

### 存放位置不同

内存空间被分为两种：栈内存和堆内存。

**栈内存**：

- 存储的值大小固定
- 空间较小
- 可以直接操作，效率高

**堆内存**：

- 存储的值大小不确定，可以动态调整
- 空间较大，运行效率低
- 无法直接操作其内部，使用引用地址读取

基本类型就属于较为简单的数据，且会被频繁使用，因此通常存放在栈中。

```js
var a = 10;
var b = 'hello';
var c = true;
```

![基本类型存储](https://gcore.jsdelivr.net/gh/qiyuor2/blog-image/img/2020070702stack.png)

引用类型则是**同时**保存在栈和堆当中：引用类型的实际值存储在堆当中，同时它会在栈中存储一个指向堆内存中的值的地址。

```js
var a = 10;
var obj1 = { name: 'nihao' };
var obj2 = function () {
    // do something
}
```

![引用类型存储](https://gcore.jsdelivr.net/gh/qiyuor2/blog-image/img/20200707heap2.png)

### 基本类型具有不可变性

```js
var name = 'hello';
name.toUpperCase(); // "HELLO"
console.log(name); // "hello"
```

由以上代码我们会发现，如果不使用`name`变量本身去接收`toUpperCase()`的返回值，那么`name`的值不会被改变。

由于栈中的内存空间大小固定，所以存储在栈中的变量就是不可变的，但在使用`JavaScript`时我们会发现可以改变基本类型的值，例如：

```js
var c = true;
c = false;
console.log(c); // false
```

这实际上是相当于在栈中开辟了一片新的空间用来存储`false`这个值，然后用变量`c`指向这个值，并非改变原本的`true`。

![更改基本类型的值](https://gcore.jsdelivr.net/gh/qiyuor2/blog-image/img/2020070703stack.png)

引用类型就可以很轻易的改变了，它不需要使用变量本身(`obj1`)去再次接收新的值就可以改变，例如：

```js
var obj1 = { name: 'nihao' };
obj1.name = 'nibuhao';
console.log(obj1); // { name: 'nibuhao' }
```

### 值比较和引用比较

对于基本类型，比较时会直接比较它们的值，相等返回`true`

```js
var str1 = 'Hello';
var str2 = 'Hello';
console.log(str1 === str2); // true
```

对于引用类型，比较时会比较它们的引用地址，哪怕两个变量具有同名属性，且同名属性的值相同，但是因为存储位置不同，两者仍然不相等

```js
var obj1 = { name: 'obj' };
var obj2 = { name: 'obj' };
console.log(obj1 === obj2); // false
```

![](https://gcore.jsdelivr.net/gh/qiyuor2/blog-image/img/20200707diff.png)

### 赋值

与上面的两种比较类似，基本类型赋值时是直接将值给另一个变量，而引用类型则是将地址给另一个变量

```js
var str1 = 'Hello';
var str2 = str1;
str2 = 'World';
console.log(str1); // "Hello"
//str1的值没变
```

```js
var obj1 = { name: 'obj1' };
var obj2 = obj1;
obj2.name = 'obj2';
console.log(obj1.name); // "obj2"
// obj1的值改变
```

## null与undefined

- `null`表示空值
- `undefined`表示“缺少值”，即此处应该有值，但是还未定义

```js
var a = null;
console.log(typeof a); // object
console.log(typeof b); // undefined
```

如果学过`C#`、`Java`之类的静态类型语言就会知道，直接使用未声明的变量会直接报错，而`JavaScript`是动态类型语言，成员除了存在空值外，还有可能根本就不存在（因为只有在运行时才会知道是否存在）。

## Symbol类型

`symbol`变量需要使用`Symbol()`创建

```js
var s = Symbol(); // 注意没有new
```

`Symbol()`函数接受一个可选参数，用来描述即将创建的`symbol`变量，无论传入的描述是否相同，最后生成的`symbol`一定是独一无二的

```js
var name1 = Symbol('Tom');
var name2 = Symbol('Tom');
console.log(name1 === name2); // false
```

如果一定要创建两个一模一样的`symbol`，需要使用`Symbol.for()`

```js
var name1 = Symbol.for('Tom');
var name2 = Symbol.for('Tom');
console.log(name1 === name2); // true
```

`Symbol`类型可以用作对象属性，使用该类型可以保证对象不会出现同名属性

```js
var obj = {
    [Symbol('name')]: 'Tom'
};
```

使用`Symbol`类型作为对象的属性名时，是无法是用`for ... in`、`Object.getOwnPropertyNames`和`Object.keys()`获取到该属性的，可以调用用来专门获取`Symbol`的方法`Object.getOwnPropertySymbols()`来获取

```js
var obj = {
    [Symbol('name')]: 'Tom'
};
for (var key in obj) {
   console.log(key); // undefined
}
Object.getOwnPropertySymbols(obj); // [Symbol(name)]
```

## 数据类型转换

![](https://gcore.jsdelivr.net/gh/qiyuor2/blog-image/img/20200707table.png)

图片来源：https://juejin.im/post/5cec1bcff265da1b8f1aa08f#heading-23

### 宽松等号（==）的隐式转换

使用`==`时，如果等号两侧的数据类型相同，那么比较结果与`===`相同，否则会发生隐式转换

#### NaN

`NaN`和任何类型比较都会返回`false`，包括他自己

```js
NaN == NaN // false
```

#### Boolean类型与其他类型进行比较

只要`Boolean`类型参与比较，该`Boolean`类型的值都会被转换为`Number`类型，`1`转为`true`，`0`转为`false`

```js
false == 0 // true
true == 1 // true
true == 2 // false
```

如果在使用`if`判断时，我们使用数字作为判断条件

```js
var x = 10;
if (x) {
	// ...
}
if (x == true) {
    // ...
}
```

我们会发现，第一个判断结果为`true`，而第二个的结果为`false`，这就是因为`true`被转换为了`1`，判断条件变为了`x == 1`

#### Number类型和String类型进行比较

这两者进行比较时，`String`类型会被转为`Number`类型，除了纯数字字符串正常转换为`Number`类型外，空字符串`''`转为`0`，科学计数法（例如`1e11`）正常转换，`Infinity`正常转换，其他全部转换为`NaN`

```js
'' == 0 // true
'123' == 123 // true
'1e11' == 1e11 // true
Infinity == 'Infinity' // true
true == '1' // true
false == '0' // true
```

#### null与undefined

除`null == undefined`结果为`true`外，其他任何类型和`null`或`undefined`比较都为`false`

#### 基本类型与引用类型比较

**ToPrimitive规则**

首先我们要先了解`ToPrimitive`规则，即引用类型转为基本类型

- 当引用类型需要被转为基本类型时，它会先查找对象的`valueOf`方法，如果该方法返回基本类型的值，则`ToPrimitive`的结果就是这个值
- 如果`valueOf`不存在或者`valueOf`方法返回的不是基本类型，就会尝试调用对象的`toString`方法，然后使用`toString`的返回值作为`ToPrimitive`的结果
- 若`valueOf`和`toString`都不存在，或者没有返回基本类型，则抛出`TypeError`异常

> 对于不同的引用类型，该过程会有些许不同，比如`Date`会先调用`toString`
>
> 引用类型转换为不同的基本类型也会有一些不同，比如：
>
> - 引用类型转换为`Number`类型，先调用`valueOf`，再调用`toString`
> - 引用类型转换为`String`类型，先调用`toString`，再调用`valueOf`
>
> 具体请参考[ECMA标准](https://www.ecma-international.org/ecma-262/6.0/#sec-toprimitive)

```js
Number([]); // 0
Number([10]); // 10

var obj = {
    valueOf: () => { return 10; },
    toString: () => { return -10; }
};
Number(obj); // 10
String(obj); // -10
```

**基本类型与引用类型比较**

比较时，引用类型会依据`ToPrimitive`规则转换为基本类型

```js
var a = {};
var b = [1, 2, 3];

a == '[object Object]'; // true
a.toString(); // [object Object]
b == '1,2,3' // true
b.toString(); // "1,2,3"
```

## 判断数据类型

### typeof

`typeof`只能用来判断以下几个类型

```js
typeof 'str';  // string
typeof 123;  // number
typeof true;  // boolean
typeof Symbol();  // symbol
typeof undefined;  // undefined
typeof function () {} // function
```

对于引用类型（数组、对象等）以及`null`，`typeof`的返回值均为`object`

### instanceof

`instanceof`可以判断引用类型的具体类型

```js
[] instanceof Array; // true
/1/ instanceof RegExp; // true
new Date() instanceof Date; // true
```

但是，`instanceof`同样没法判断`null`

```js
null instanceof null; // Uncaught TypeError: Right-hand side of 'instanceof' is not an object
null instanceof Object; // false
```

在[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)中，`instanceof`被这样描述：

> **`instanceof`** **运算符**用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

也就是说`instanceof`设计的初衷并不是用来检测数据类型的，因此很多类型它也无法判断

### Object.prototype.toString.call()

`Object.prototype.toString.call()`利用`call`来改变`this`的指向，可以让该方法能够获取到任意变量的`[[class]]`属性，通过该属性可以判断所有`JavaScript`的内置类型

```js
Object.prototype.toString.call(null); // [object Null]
Object.prototype.toString.call(undefined); // [object Undefined]
Object.prototype.toString.call(123); // [object Number]
Object.prototype.toString.call(new Date()); // [object Date]
// ...
```

但是该方法并不能判断自定义类型，而`instanceof`可以实现对自定义类型的判断

```js
function Person() {}
Object.prototype.toString.call(new Person()); // [object Object]
new Person() instanceof Person; // true
```



## 参考资料

- [【JS 进阶】你真的掌握变量和类型了吗](https://juejin.im/post/5cec1bcff265da1b8f1aa08f#heading-34)

- [JavaScript的数据类型及其检测](https://juejin.im/post/5bbda2b36fb9a05cfd27f55e)

- [undefined与null的区别](https://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html)

- [从一道面试题说起—js隐式转换踩坑合集](https://juejin.im/post/5bc5c752f265da0a9a399a62)