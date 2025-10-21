---
title: 'TypeScript实现设计模式——单例模式'
date: 2020/03/19 21:51:43
pubDate: 2020/03/19 21:51:43
tags: [typescript, 设计模式,笔记]
category: 技术
description: 最近在学习设计模式，又正好刚上手了typescript，就想要用ts实现一下试试。

---

最近在学习设计模式，又正好刚上手了 typescript，就想要用 ts 实现一下试试。

单例模式的目的是限制一个类只能被实例化一次，提供一个全局的访问点。单例模式又被分为懒汉单例模式和饿汉单例模式，懒汉单例模式就是在第一次调用时实例化，饿汉单例模式是类加载时就实例化。

**核心要点：**

把一个静态私有变量确立为唯一的实例，外部通过静态方法访问这个唯一的实例，并把构造函数设为私有。

## 懒汉单例模式

```typescript
class PeopleSingle {
  /**核心 - 一个接收实例的静态成员 */
  private static people: PeopleSingle;
  private name: string;

  /**核心 - 私有构造函数 */
  private constructor(name: string) {
    this.name = name;
  }

  /**核心 - 获取实例 */
  public static getInstance(): PeopleSingle {
    if (this.people == null) {
      this.people = new PeopleSingle('金闪闪');
    }
    return PeopleSingle.people;
  }

  public say(): void {
    console.log(`I'm ${this.name}.`);
  }
}
```

测试

```typescript
let people = PeopleSingle.getInstance();
people.say();
```

## 饿汉单例模式

```typescript
class PeopleSingle {
  /**核心 - 一个接收实例的静态成员，直接创建好实例 */
  private static people: PeopleSingle = new PeopleSingle('金闪闪');
  private name: string;

  /**核心 - 私有构造函数 */
  private constructor(name: string) {
    this.name = name;
  }

  /**核心 - 获取实例 */
  public static getInstance(): PeopleSingle {
    return PeopleSingle.people;
  }

  public say(): void {
    console.log(`I'm ${this.name}.`);
  }
}
```

测试

```typescript
let people = PeopleSingle.getInstance();
people.say();
```

举的例子不是特别好，但是意思是这个意思。
