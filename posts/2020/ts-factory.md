---
title: 'TypeScript实现设计模式——工厂模式'
date: 2020/03/20 11:47:31
pubDate: 2020/03/20 11:47:31
tags: [TypeScript, 设计模式,笔记]
category: 技术
description: 上回用typescript实现了单例模式，这回来实现工厂模式。工厂模式又分为简单工厂模式、工厂方法模式以及抽象工厂模式。

---

上回用 typescript 实现了单例模式，这回来实现工厂模式。工厂模式又分为简单工厂模式、工厂方法模式以及抽象工厂模式。

## 简单工厂模式

简单工厂模式通常在业务比较简单的情况下使用，它有三个部分组成：工厂类、抽象产品类、具体产品类。

**抽象产品类**

```typescript
abstract class Pizza {
  public abstract show(): void;
  public abstract cut(): void;
}
```

**具体产品类**

```typescript
class KFCPizza extends Pizza {
  public show(): void {
    console.log('This is KFCPizza!');
  }
  public cut(): void {
    console.log('Cut KFCPizza!');
  }
}

class MCPizza extends Pizza {
  public show(): void {
    console.log('This is MCPizza!');
  }
  public cut(): void {
    console.log('Cut MCPizza!');
  }
}
```

**工厂类**

```typescript
class PizzaFactory {
  /**
   * 静态工厂方法
   * @param pizzaType 限制传入的参数为类，而非类的实例
   */
  public static createPizza(pizzaType: new () => Pizza): Pizza {
    let pizza = null;

    try {
      pizza = new pizzaType();
    } catch (e) {
      console.error('Create failed!');
    }

    return pizza;
  }
}
```

**测试**

```typescript
let pizza = PizzaFactory.createPizza(KFCPizza);
pizza.show();

pizza = PizzaFactory.createPizza(MCPizza);
pizza.show();
```

## 工厂方法模式

正常情况下，简单工厂模式每次增加新的产品都需要在工厂类中增加对应的逻辑，这样就违背了开闭原则（但因为 ts 和我举的例子的原因体现不出这个缺点）。工厂方法模式就解决了这个问题，同时它能更好的解决复杂的业务环境。

工厂方法模式具有四个部分：抽象工厂类、具体工厂类、抽象产品类、具体产品类。

**抽象产品类**

```typescript
abstract class Pizza {
  public abstract show(): void;
  public abstract cut(): void;
}
```

**具体产品类**

```typescript
class KFCPizza extends Pizza {
  public show(): void {
    console.log('This is KFCPizza!');
  }
  public cut(): void {
    console.log('Cut KFCPizza!');
  }
}

class MCPizza extends Pizza {
  public show(): void {
    console.log('This is MCPizza!');
  }
  public cut(): void {
    console.log('Cut MCPizza!');
  }
}
```

**抽象工厂类**

```typescript
abstract class PizzaFactory {
  public abstract createPizza(): Pizza;
}
```

**具体工厂类**

```typescript
class KFCPizzaFactory extends PizzaFactory {
  public createPizza(): Pizza {
    try {
      return new KFCPizza();
    } catch (error) {
      console.log(error);
    }
  }
}

class MCPizzaFactory extends PizzaFactory {
  public createPizza(): Pizza {
    try {
      return new MCPizza();
    } catch (error) {
      console.log(error);
    }
  }
}
```

**测试**

```typescript
let factory: PizzaFactory = new KFCPizzaFactory();
let pizza = factory.createPizza();
pizza.show();
```

当我们需要增加新的产品时，只需要增加对应的工厂类而不需要更改原本工厂类内部的逻辑，完全符合了开闭原则。

## 抽象工厂模式

学习抽象工厂模式之前，首先要先了解两个概念：**产品等级结构**和**产品族**

- **产品等级结构**

  产品等级结构即产品的继承结构，例如抽象的披萨类和具体某品牌的披萨类之间就构成了一个产品等级结构。

- **产品族**

  位于不同产品等级结构中的一组产品，功能相关联的产品组成的家族，如 KFC 水果披萨、MC 水果披萨都是水果披萨，就可以放到同一个产品族中。

抽象工厂模式具有和工厂方法模式一样的四个部分：抽象工厂类、具体工厂类、抽象产品类、具体产品类。

**抽象产品类**

```typescript
// KFC产品父类
abstract class KFCPizza {
  public abstract show(): void;
  public abstract cut(): void;
}

// MC产品父类
abstract class MCPizza {
  public abstract show(): void;
  public abstract cut(): void;
}
```

**具体产品类**

```typescript
// 具体KFCPizza类
class KFCFruitPizza extends KFCPizza {
  public show(): void {
    console.log('This is KFCFruitPizza!');
  }
  public cut(): void {
    console.log('Cut KFCFruitPizza!');
  }
}

class KFCCheesePizza extends KFCPizza {
  public show(): void {
    console.log('This is KFCCheesePizza!');
  }
  public cut(): void {
    console.log('Cut KFCCheesePizza!');
  }
}

// 具体KFCPizza类
class MCFruitPizza extends MCPizza {
  public show(): void {
    console.log('This is MCFruitPizza!');
  }
  public cut(): void {
    console.log('Cut MCFruitPizza!');
  }
}

class MCCheesePizza extends MCPizza {
  public show(): void {
    console.log('This is MCCheesePizza!');
  }
  public cut(): void {
    console.log('Cut MCCheesePizza!');
  }
}
```

**抽象工厂类**

```typescript
abstract class PizzaFactory {
  public abstract createKFCPizza(): KFCPizza;
  public abstract createMCPizza(): MCPizza;
}
```

**具体工厂类**

```typescript
// 水果披萨工厂
class FruitPizzaFactory extends PizzaFactory {
  public createKFCPizza(): KFCPizza {
    try {
      return new KFCFruitPizza();
    } catch (error) {
      console.log(error);
    }
  }
  public createMCPizza(): MCPizza {
    try {
      return new MCFruitPizza();
    } catch (error) {
      console.log(error);
    }
  }
}

// 芝士披萨工厂
class CheesePizzaFactory extends PizzaFactory {
  public createKFCPizza(): KFCPizza {
    try {
      return new KFCCheesePizza();
    } catch (error) {
      console.log(error);
    }
  }
  public createMCPizza(): MCPizza {
    try {
      return new MCCheesePizza();
    } catch (error) {
      console.log(error);
    }
  }
}
```

**测试**

```typescript
let factory: PizzaFactory = new CheesePizzaFactory();
let cheesePizza = factory.createKFCPizza();
cheesePizza.show();
```
