---
title: 图片颜色替换研究记录
date: 2023/05/19 19:44:01
pubDate: 2023/05/19 19:44:01
description: 关于如何将带有颜色的图片直接修改为我们想要的颜色
category: 技术
tags: [Canvas, 图像处理]
---

设计师提供了不同发型的头发，并且这些发型图片都带有底色，我们需要在排除底色色相的影响下修改发色。并且最终需要生成一个修改后的完整的图片。

![需求示例图](https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/2023061902.png)

## 解决方案

1. 让设计师导出发型为 SVG，直接替换 SVG 的颜色。
2. 将发型图片画到 Canvas 上，通过操作 Canvas 来修改颜色。

> 两种方案从原理上来讲都是可行的，但都存在一些问题：
>
> 1. SVG 方案能够十分便利地修改颜色，但是在生成图片时出现了各种各样的兼容性问题（eg. img 标签的 `position: absolute` 属性在 iOS 机型上失效）
> 2. Canvas 方案有两个选择，一个是通过现有库的滤镜叠加来实现换色，另一个是遍历像素点来替换指定颜色。
>    - 通过滤镜调整存在的问题是无法根据目标颜色和现有的底色计算出滤镜需要设置的颜色，如果真要采用这种方案，需要在开发前和设计师沟通，让设计师绘制时就采用这种方法。
>    - 遍历像素点存在的问题是不知道如何判断某个像素点要替换成什么颜色，因为设计师绘制的图片是有笔触的，在线条边缘位置的颜色与中心位置的颜色是不同的，我们很难获取到这个差异范围。

由于开发时间较为紧张，并且之前也有类似捏人的项目采用了 SVG 方案，我们优先选用了 SVG 实现，后续优化的时候再考虑 Canvas 的方案。（上面提到的 img 标签定位失效问题可以通过外层包裹 div，在 div 上设置定位解决，但不能保证是否会出现其他问题）

## Canvas 调研

参考项目：https://www.neka.cc/

neka.cc 中有十分完善的换色功能，它的替换颜色功能能够将图片上不同明度的位置修改为不同颜色，这个功能就是还原的绘画、设计软件中的渐变映射功能。

> **如何确定这是渐变映射功能的？**
>
> 在目前电子绘画技术比较成熟的情况下，这个功能是 neka.cc 完全原创的可能性比较小。而最初我们认为这个功能可能是由多个滤镜叠加实现的，于是就去询问设计师「你画画时，如果想要做到同样的效果要怎么操作？」
>
> 结果设计师回答是「这就叫渐变映射，软件本来就有这个功能」

neka.cc 中使用的 canvas 库 Konvajs 没有直接的渐变映射滤镜，因此对于该功能的实现有以下推测：

1. Konvajs 可以通过多重滤镜/其他设置实现该功能
2. 应用其他的 Canvas 库来实现
3. 开发人员自行编写相应代码

最开始并没有去理解这个功能的实现原理，想要尝试从他们的代码中找出来如何实现的，或者寻找开源库去实现。

### 尝试实现

**尝试定位代码**

[找到点击事件真正触发的函数](https://xiaogenban1993.github.io/20.11/web_%E6%89%BE%E5%88%B0%E7%82%B9%E5%87%BB%E4%BA%8B%E4%BB%B6%E7%9C%9F%E6%AD%A3%E8%A7%A6%E5%8F%91%E7%9A%84%E5%87%BD%E6%95%B0.html)，通过点击事件能够定位到人物的配置数据，但推测修改发色是通过副作用进行的，因此点击事件无法查找到对图片操作的方法（未验证）

**开源库可调研方向**

- 研究 Konvajs 中的渐变设置是否与渐变映射有关
- 2013 年的一个用于设置渐变映射的库 https://github.com/awgreenblatt/gradientmaps
- 为 SVG 设置渐变映射滤镜 https://yoksel.github.io/svg-gradient-map/#/

经过尝试发现分析 webpack 打包并混淆后的代码难度过高，而现有开源库基本没有这方面的内容，于是转而研究实现原理。

### 根据原理自己实现

从原理出发，发现该功能似乎并非难以实现，该功能的核心是不同亮度替换不同颜色，要获取到某个像素点的亮度可以通过将像素点的 RGB 转为 HSL 来实现，而替换颜色就是简单的 RGB 复制，因此得出以下实现思路：

遍历每个像素点，转化为 HSL 并取其中的亮度，然后根据亮度去替换指定颜色就能实现我们想要的效果。

![渐变映射原理解析](https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/2023061901.png)

而我们发型图片实际上只存在三种颜色，我们只需要将底色中三种颜色的亮度作为分界点，得到三个亮度范围（eg. 0-81, 81-89, 89-100 ），根据亮度范围替换为指定的颜色即可。

### 参考代码

```jsx
function gradientMapFilter(imageData: ImageData) {
  const length = imageData.data.length;
  for (let index = 0; index < length; index += 4) {
    const r = imageData.data[index];
    const g = imageData.data[index + 1];
    const b = imageData.data[index + 2];
    const a = imageData.data[index + 3];
    if (a != 0) {
      const l = Math.ceil(rgbToHsl(r, g, b)[2] * 100);
      if (l <= 81) {
        imageData.data[index] = color1.r;
        imageData.data[index + 1] = color1.g;
        imageData.data[index + 2] = color1.b;
      } else if (l > 81 && l < 89) {
        imageData.data[index] = color2.r;
        imageData.data[index + 1] = color2.g;
        imageData.data[index + 2] = color2.b;
      } else if (l >= 89) {
        imageData.data[index] = color3.r;
        imageData.data[index + 1] = color3.g;
        imageData.data[index + 2] = color3.b;
      }
    }
  }
}
```

## 后续目标

实现真正的渐变映射，能够将图片中 0-100%亮度的所有颜色按照渐变色盘替换。

具体有两个关键步骤：

1. 生成渐变色盘，并能够拿到上面任一位置的色值。可以利用 Canvas 的 createLinearGrandient 和 getImageData 来实现。
2. 将渐变色盘的位置按照 0-100%与图片的亮度相对应，替换颜色。即 Canvas 调研所得出的方法。

> 经实践，该渐变映射实现方案存在很严重的性能问题，经过与 neka.cc 源码比较推测在「从渐变色盘取色」这一步可能有较大的性能消耗，需要考虑优化方案或采用其他渐变色生成方案。

**优化方案**

渐变色生成采用 [tinygradient](https://www.npmjs.com/package/tinygradient) （直接通过算法计算）实现，不需要再经过 canvas 处理
