---
title: 'TypeScript实现设计模式——观察者模式'
date: 2020/04/16 17:55:55
pubDate: 2020/04/16 17:55:55
tags: [TypeScript, 设计模式,笔记]
category: 技术
description: 观察者模式是一种行为设计模式，允许一个对象将其状态的改变通知其他对象。观察者模式提供了一种作用于任何实现了订阅者接口的对象的机制， 可对其事件进行订阅和取消订阅。

---

**观察者模式**是一种行为设计模式，允许一个对象将其状态的改变通知其他对象。

观察者模式提供了一种作用于任何实现了订阅者接口的对象的机制， 可对其事件进行订阅和取消订阅。

![](https://refactoringguru.cn/images/patterns/content/observer/observer.png)

_图片来源：https://refactoringguru.cn/design-patterns/observer_

观察者模式是一种在前端领域应用十分广泛的设计模式，特别是在图形界面的组件中，如果你自定义了一个按钮组件，那么你很可能需要用到观察者模式。

观察者模式的核心成员有两个，一个是作为事件发布者的 Subject 类，另一个是作为事件接收者的 Observer 类。

### Subject 部分

Subject 类所具有的公共部分是对订阅者的管理和向所有订阅者发布消息，而具体 Subject 所负责的业务逻辑需要放到各自的 Subject 类中。

**Subject 接口**

```typescript
interface Subject {
  // 添加观察者
  attach(observer: Observer): void;
  // 移除观察者
  detach(observer: Observer): void;
  // 通知所有观察者
  notify(): void;
}
```

**具体 Subject 类**

```typescript
class ConcreteSubject implements Subject {
  // 发布者状态，测试使用
  public state: number;

  // 订阅者名单
  public observers: Array<Observer> = [];

  // 管理订阅方法
  public attach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex !== -1) {
      return console.log('已订阅');
    }

    this.observers.push(observer);
    console.log('订阅成功');
  }

  public detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      return console.log('订阅者未订阅');
    }

    this.observers.splice(observerIndex, 1);
    console.log('订阅者已移除');
  }

  public notify(): void {
    console.log('通知所有订阅者');
    for (const observer of this.observers) {
      observer.update(this);
    }
  }

  // 订阅管理以外的逻辑
  public someLogic() {
    this.state = Math.floor(Math.random() * 10 + 1);

    console.log(`我更改了我的状态：state=${this.state}`);
    this.notify();
  }
}
```

### Observer 部分

观察者只需要根据发布者的发出的消息来判断自己是否需要做出回应即可。

**Observer 接口**

```typescript
interface Observer {
  // 对发布者发出的更新消息作出回应
  update(subject: Subject): void;
}
```

**具体 Observer 类**

```typescript
//具体观察者A
class ConcreteObserverA implements Observer {
  public update(subject: ConcreteSubject) {
    if (subject.state <= 5) {
      console.log('观察者A作出回应');
    }
  }
}

// 具体观察者B
class ConcreteObserverB implements Observer {
  public update(subject: ConcreteSubject) {
    if (subject.state > 5) {
      console.log('观察者B作出回应');
    }
  }
}
```

### 测试代码

因为是随机数，可能会得不到想要的结果，可以多尝试几次

```typescript
const subject = new ConcreteSubject();

const observerA = new ConcreteObserverA();
subject.attach(observerA);

const observerB = new ConcreteObserverB();
subject.attach(observerB);

subject.someLogic();

subject.detach(observerB);

subject.someLogic();
```
