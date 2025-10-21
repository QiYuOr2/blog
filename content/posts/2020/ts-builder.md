---
title: 'TypeScript实现设计模式——生成器模式'
date: 2020/09/28 13:47:16
pubDate: 2020/09/28 13:47:16
tags: [TypeScript, 设计模式,笔记]
category: 技术
description: 生成器模式是一种在TypeScript/JavaScript中非常常见的创建型设计模式，它使你能够分步骤创建复杂对象。当你需要创建一个可能有许多配置选项的对象时， 该模式会特别有用。

---

**生成器模式**是一种在 TypeScript/JavaScript 中非常常见的创建型设计模式，它使你能够分步骤创建复杂对象。当你需要创建一个可能有许多配置选项的对象时， 该模式会特别有用。

### 问题

假设我们需要构造一个复杂对象，构造时需要给这个对象的诸多成员变量进行初始化工作，如果使用传统的构造函数创建这个对象，那么它的构造函数将十分复杂，比如`new Product(partA, partB, partC, ...)`，这样的构造函数不仅缺乏灵活性还会严重的影响代码的可读性，因此我们需要一种更优秀的方法来创建复杂对象。

### 创建想要生成的产品类

```typescript
class Product {
  public partA: string;
  public partB: string;
  public partC: string;
  public partD: string;
}
```

### 创建生成器类

可以将基本生成器定义为一个接口，再为每个形式的产品创建具体的生成类，这里只定义一个生成器类作为演示

```typescript
class ProductBuilder {
  private product: Product;

  constructor() {
    // 创建要生成的对象
    this.product = new Product();
  }

  // 以下为给对象添加各部分的方法
  public setPartA(partA: string): this {
    this.product.partA = partA;
    return this;
  }

  public setPartB(partB: string): this {
    this.product.partB = partB;
    return this;
  }

  public setPartC(partC: string): this {
    this.product.partC = partC;
    return this;
  }

  public setPartD(partD: string): this {
    this.product.partD = partD;
    return this;
  }

  // 完成产品生成
  public build(): void {
    // 这里可以写具体的构建完成后要执行的操作
    console.log(this.product);
  }
}
```

### 测试代码

```typescript
const product = new ProductBuilder()
  .setPartA('这是Part A')
  .setPartB('这是Part B')
  .setPartD('这是Part D')
  .build();
// Product { partA: '这是Part A', partB: '这是Part B', partD: '这是Part D' }
```

```typescript
const product = new ProductBuilder()
  .setPartA('这是Part A')
  .setPartB('这是Part B')
  .build();
// Product { partA: '这是Part A', partB: '这是Part B' }
```
