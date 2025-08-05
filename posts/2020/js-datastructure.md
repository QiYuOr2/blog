---
title: 'JavaScript实现常见的数据结构'
date: 2020/01/29 15:26:47
pubDate: 2020/01/29 15:26:47
tags: [JavaScript, 数据结构,笔记]
category: 技术
description: 使用JavaScript实现栈、队列、链表、集合等常见数据结构。可能会有点用？

---

使用 JavaScript 实现栈、队列、链表、集合等常见数据结构。可能会有点用？

## 栈(Stack)

实际上 JavaScript 的 Array 本身就具有栈和队列的特性，所以我们可以借助 Array 来实现它们。

```js
class Stack {
  constructor() {
    this.items = [];
  }
  get length() {
    return this.items.length;
  }
  // 获取栈顶元素
  get peek() {
    return this.items[this.items.length - 1];
  }
  push(element) {
    this.items.push(element);
  }
  pop() {
    this.items.pop();
  }
}
```

## 队列(Queue)

```javascript
class Queue {
  constructor() {
    this.items = [];
  }
  get isEmpty() {
    return this.items.length === 0;
  }
  get length() {
    return this.items.length;
  }
  // 入队
  enqueue(element) {
    this.items.push(element);
  }
  // 出队
  dequeue() {
    return this.items.shift();
  }
}
```

### 优先队列

队列的升级版本，给每个元素一个优先级，入队时会先排序。这里`PriorityQueue`继承自`Queue`，所以只需要重写`enqueue`方法。

```javascript
class PriorityQueue extends Queue {
  /**
   * 入队
   * @param {*} element 元素
   * @param {*} priority 优先级
   */
  enqueue(element, priority) {
    const queueElement = { element, priority };
    if (this.isEmpty) {
      super.enqueue(queueElement);
    } else {
      const preIndex = this.items.findIndex(
        (items) => queueElement.priority < items.priority
      );
      if (preIndex > -1) {
        this.items.splice(preIndex, 0, queueElement);
      } else {
        super.enqueue(queueElement);
      }
    }
  }
}
```

### 循环队列

循环队列可以想象为一个首尾相连的圆环，相较于普通队列，它更节省空间。

虽然同样继承自`Queue`，但基本上所有方法都重写了。

```javascript
class LoopQueue extends Queue {
  constructor(maxSize) {
    super();
    this.maxSize = maxSize;
    this.head = -1; //头指针
    this.tail = -1; //尾指针
  }
  get isFull() {
    return (this.tail + 1) % this.maxSize === this.head;
  }
  get isEmpty() {
    return this.tail === -1 && this.head === -1;
  }
  enqueue(element) {
    if (this.isFull) {
      return false;
    }
    if (this.isEmpty) {
      this.head = 0;
    }
    this.tail = (this.tail + 1) % this.maxSize;
    this.items[this.tail] = element;
    return true;
  }
  dequeue() {
    if (!this.isEmpty) {
      if (this.tail === this.head) {
        this.tail = -1;
        this.head = -1;
      } else {
        this.head = (this.head + 1) % this.maxSize;
      }
      return true;
    }
    return false;
  }
}
```

## 链表(Linked List)

```javascript
// 节点
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

// 链表
class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }
  // 追加
  append(element) {
    const node = new Node(element);
    let current = null;
    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.length++;
  }
  /**
   * 插入
   * @param {*} element 元素
   * @param {*} position 位置
   */
  insert(element, position) {
    if (position >= 0 && position <= this.length) {
      const node = new Node(element);
      let current = this.head;
      let previous = null;
      if (position === 0) {
        this.head = node;
        this.head.next = current;
      } else {
        for (let index = 0; index < position; index++) {
          previous = current;
          current = current.next;
        }
        node.next = current;
        previous.next = node;
      }
      this.length++;
      return true;
    }
    return false;
  }
  /**
   * 删除
   * @param {*} position 位置
   */
  removeAt(position) {
    if (position >= 0 && position < this.length) {
      let current = this.head;
      let previous = null;
      if (position === 0) {
        this.head = current.next;
      } else {
        for (let index = 0; index < position; index++) {
          previous = current;
          current = current.next;
        }
        previous.next = current.next;
      }
      this.length--;
      return current.element;
    }
    return null;
  }
  // 查找元素所在位置
  indexOf(element) {
    let current = this.head;
    let index = 0;
    while (current) {
      if (element === current.element) {
        return index;
      }
      index++;
      current = current.next;
    }
    return -1;
  }
  // 根据元素删除
  remove(element) {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }
  toString() {
    let current = this.head;
    let string = '';
    while (current) {
      string += `${current.element} -- `;
      current = current.next;
    }
    string += '*';

    return string;
  }
}
```

## 集合(Set)

ES6 中引入了集合类型，可以参考一下。

```javascript
class Set {
  constructor() {
    this.items = {};
  }
  get size() {
    return Object.keys(this.items).length;
  }
  get values() {
    return Object.keys(this.items);
  }
  // 判断元素是否存在
  has(value) {
    return this.items.hasOwnProperty(value);
  }
  add(value) {
    if (!this.has(value)) {
      this.items[value] = value;
      return true;
    }
    return false;
  }
  remove(value) {
    if (this.has(value)) {
      delete this.items[value];
      return true;
    }
    return false;
  }
  // 并集
  union(otherSet) {
    const unionSet = new MySet();
    this.values.forEach((value) => unionSet.add(this.value));
    otherSet.values.forEach((value) => unionSet.add(otherSet.value));
    return unionSet;
  }
  // 交集
  intersection(otherSet) {
    const intersectionSet = new MySet();
    this.values.forEach((value, index) => {
      if (otherSet.has(value)) {
        intersectionSet.add(value);
      }
    });
    return intersectionSet;
  }
  // 差集
  difference(otherSet) {
    const differenceSet = new MySet();
    this.values.forEach((value) => {
      if (!otherSet.has(value)) {
        differenceSet.add(value);
      }
    });
    return differenceSet;
  }
  // 子集
  subset(otherSet) {
    return this.values.every((value) => otherSet.has(value));
  }
}
```

## 字典(Dictionary)

在 JavaScript 中，`Object`对象实际上就是字典，都是以`{ key: value }`的形式存储数据的。

```javascript
class Dictionary {
  constructor() {
    this.items = {};
  }
  get keys() {
    return Object.keys(this.items);
  }
  get values() {
    const r = [];
    Object.keys(this.items).forEach((value) => {
      r.push(this.items[value]);
    });
    return r;
  }
  set(key, value) {
    this.items[key] = value;
  }
  get(key) {
    return this.items[key];
  }
  remove(key) {
    delete this.items[key];
  }
}
```

## 哈希表(Hash Table)

哈希表也是以键值对的形式存储数据的，但是因为每个数据都会根据`key`生成唯一的哈希值，所以查询速度非常快。

这里散列函数就是用来生成哈希值的，随便写的，常用的构造散列函数的方法在网上能查到很多。

```javascript
class HashTable {
  constructor() {
    this.table = [];
  }
  // 散列函数
  getHashCode(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return (hash % 64) * 0xffffff;
  }
  put(key, value) {
    const position = this.getHashCode(key);
    this.table[position] = value;
  }
  get(key) {
    return this.table[this.getHashCode(key)];
  }
  remove(key) {
    this.table[this.getHashCode(key)] = undefined;
  }
}
```

## 树(tree)

正常的二叉树没有必要实现，这里实现一下二叉搜索树。

```javascript
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  insert(data) {
    const newNode = new Node(data);
    const insertNode = (node, newNode) => {
      if (newNode.data < node.data) {
        if (node.left === null) {
          node.left = newNode;
        } else {
          insertNode(node.left, newNode);
        }
      } else {
        if (node.right === null) {
          node.right = newNode;
        } else {
          insertNode(node.right, newNode);
        }
      }
    };
    if (!this.root) {
      this.root = newNode;
    } else {
      insertNode(this.root, newNode);
    }
  }
  // 中序遍历
  inOrderTraverse(callback) {
    const inOrderTraverseNode = (node, callback) => {
      if (node !== null) {
        inOrderTraverseNode(node.left, callback);
        callback(node.data);
        inOrderTraverseNode(node.right, callback);
      }
    };
    inOrderTraverseNode(this.root, callback);
  }
  // 先序遍历
  preOrderTraverse(callback) {
    const preOrderTraverseNode = (node, callback) => {
      if (node !== null) {
        callback(node.data);
        preOrderTraverseNode(node.left, callback);
        preOrderTraverseNode(node.right, callback);
      }
    };
    preOrderTraverseNode(this.root, callback);
  }
  // 后序遍历
  postOrderTraverse(callback) {
    const postOrderTraverseNode = (node, callback) => {
      if (node !== null) {
        postOrderTraverseNode(node.left, callback);
        postOrderTraverseNode(node.right, callback);
        callback(node.data);
      }
    };
    postOrderTraverseNode(this.root, callback);
  }
  min() {
    let current = this.root;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }
  max() {
    let current = this.root;
    while (current.right !== null) {
      current = current.right;
    }
    return current.data;
  }
  search(data) {
    let current = this.root;
    while (current.data !== data) {
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
      if (current == null) {
        return null;
      }
    }
    return current;
  }
  remove(data) {
    const removeNode = (node, data) => {
      if (node === null) {
        return false;
      }
      if (node.data === data) {
        if (node.left === null && node.right === null) {
          return null;
        }
        if (node.left === null) {
          return node.right;
        }
        if (node.right === null) {
          return node.left;
        }

        let tempNode = node.right;
        while (tempNode.left !== null) {
          tempNode = tempNode.left;
        }
        node.data = tempNode.data;
        node.right = removeNode(node.right, tempNode.data);
        return node;
      }
      if (node.data > data) {
        node.left = removeNode(node.left, data);
        return node;
      }
      if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;
      }
    };
    this.root = removeNode(this.root, data);
  }
}
```

## 图(Graph)

这里实现的无向图。

```javascript
class Graph {
  constructor() {
    this.vertices = []; // 存顶点
    this.adjList = {}; // 存边
  }
  // 顶点
  addVertex(v) {
    this.vertices.push(v);
    this.adjList[v] = [];
  }
  // 边
  addEdge(v, w) {
    this.adjList[v].push(w);
    this.adjList[w].push(v);
  }
  // 转化成邻接表的形式的字符串
  toString() {
    let str = '\n';
    for (let i = 0; i < this.vertices.length; i++) {
      const v = this.vertices[i];
      str += v + ' => ';
      const e = this.adjList[v];
      for (let j = 0; j < e.length; j++) {
        str += ' ' + e[j] + ' ';
      }
      str += '\n';
    }
    return str;
  }
}
```

## 参考文章

- [在 JavaScript 中学习数据结构与算法](https://juejin.im/post/594dfe795188250d725a220a#heading-14)

- [常见数据结构和 Javascript 实现总结](https://segmentfault.com/a/1190000020011987)
