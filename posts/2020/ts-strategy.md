---
title: 'TypeScript实现设计模式——策略模式'
date: 2020/03/21 17:29:07
pubDate: 2020/03/21 17:29:07
tags: [TypeScript, 设计模式,笔记]
category: 技术
description: 策略模式（Strategy）：它定义了算法家族，分别封装起来，让它们之间可以互相替换，此模式让算法的变化不会影响到使用算法的客户。——《大话设计模式》

---

> 策略模式（Strategy）：它定义了算法家族，分别封装起来，让它们之间可以互相替换，此模式让算法的变化不会影响到使用算法的客户。
>
> ——《大话设计模式》

策略模式主要用来解决当有多种相似算法的时，使用 if...else 产生的难以维护的问题。它主要由三部分组成：Strategy 接口、具体的 Strategy 类以及用来改变和执行策略的 Context 类。

接下来将以一个超市选择优惠活动的例子实现策略模式。

**Strategy 接口**

```typescript
interface Strategy {
  /**
   * 优惠活动
   * @param money 原价
   * @returns 现价
   */
  discount(money: number): number;
}
```

**具体的优惠策略**

```typescript
// 满减优惠
class FullAndReduceStrategy implements Strategy {
  // 满足条件的金额
  private conditionMoney: number;
  // 减少的金额
  private reduceMoney: number;

  constructor(money: number, returnMoney: number) {
    this.conditionMoney = money;
    this.reduceMoney = returnMoney;
  }

  public discount(money: number): number {
    let result: number;

    if (money >= this.conditionMoney) {
      result =
        money - Math.floor(money / this.conditionMoney) * this.reduceMoney;
    }

    return result;
  }
}

// 现金折扣
class CashRebateStrategy implements Strategy {
  // 折扣值
  private moneyRabte: number;

  constructor(moneyRabte: number) {
    this.moneyRabte = moneyRabte;
  }

  discount(money: number): number {
    return money * this.moneyRabte;
  }
}
```

**Context 类**

`setStrategy`方法用来控制要使用的策略，`execute`方法用来执行策略。

```typescript
class Context {
  private strategy: Strategy;
  private money: number;

  constructor(money: number) {
    this.money = money;
  }

  // 设置优惠策略
  public setStrategy(strategy: Strategy): void {
    this.strategy = strategy;
  }

  // 执行策略
  public execute(): number {
    return this.strategy.discount(this.money);
  }
}
```

**测试**

```typescript
const context: Context = new Context(100);

context.setStrategy(new FullAndReduceStrategy(50, 2));
console.log(context.execute()); // 96

context.setStrategy(new CashRebateStrategy(0.5));
console.log(context.execute()); // 50
```
