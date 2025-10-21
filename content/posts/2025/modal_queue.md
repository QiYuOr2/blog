---
title: 基于队列的多弹窗调度中心
date: 2025/06/27 04:46:29
pubDate: 2025/06/27 04:46:29
description: 本文介绍了一种基于队列的多弹窗调度中心的实现方式，解决了传统弹窗管理方法中的耦合、复用性差和扩展性差等问题。
tags: [
  '前端',
  'Vue',
  '弹窗',
  '队列',
  '调度中心'
]
category: 技术
---

在前端业务开发中，尤其是移动端（H5 / 小程序）环境下，大概率会遇到根据不同条件触发多个阻断式弹窗的业务场景，这些弹窗需要按照优先级依次展示，只有前一个弹窗关闭后才会展示下一个。

类似下面动图的效果：

<img src="https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/20250627modal.gif" alt="示例动图" style="width: 100%; min-height: 500px; background-color: #eee" data-zoomable="true" />


### 常用的方案及其存在的问题

在前期业务不是特别复杂的情况下，常用的解决方案是为**每个弹窗设置一个状态值**或使用**弹窗索引**来控制弹窗的展示。

```jsx
// 不同状态值分别控制
<Modal1 v-if="modal1Visible" />
<Modal2 v-if="modal2Visible" />
<Modal3 v-if="modal3Visible" />

// 弹窗索引控制
<Modal1 v-if="modalStep === 1" />
<Modal2 v-if="modalStep === 2" />
<Modal3 v-if="modalStep === 3" />
```

这两种做法都有各自的优点，但当业务复杂后它们的缺陷就暴露出来了：

- **视图和业务逻辑耦合**。直接用状态值控制不必多说是强耦合，即便是一定程度上解耦了的 `modalStep` 也由于硬编码了展示顺序而存在耦合。
- **难以复用**。由于视图和业务耦合导致的结果。
- **扩展性差 / 后续维护困难**。新增弹窗或修改弹窗优先级时，需要直接修改条件判断的逻辑，当弹窗数量增加后代码会变得难以阅读和维护。

### 利用队列创建调度中心

由于弹窗存在顺序，很容易就能想到使用具有**先进先出**特性的队列结构来控制弹窗的弹出。我们只需要把所有满足弹出条件的弹窗根据优先级依次放入到队列中（由于加入了优先级排序，这里的队列并不是严格意义上的队列），然后每次关闭弹窗都弹出队列中的下一个弹窗即可。

之后我们要考虑的就是如何将弹窗放入队列，以及如何统一接管弹窗的显示和隐藏。这里提供一下我的思路。

首先是所有弹窗都需要有统一的 API 设计，我们可以设计一个 `modalify` 高阶函数解决这个问题：

```jsx
function modalify<T extends DefineComponent>(WrappedComponent: T) {
  const hasVisibleProp = 'visible' in (WrappedComponent.props || {})

  const Modalified = defineComponent({
    name: 'ModalifiedComponent',
    props: {
      ...WrappedComponent.props,
    },
    setup(props, { expose, attrs, slots }) {
      const localVisible = ref(false)

      const toggle = (value?: boolean) => {
        if (value !== undefined) {
          localVisible.value = value
          return
        }
        localVisible.value = !localVisible.value
      }

      expose({
        toggle,
        visible: localVisible,
      })

      if (hasVisibleProp) {
        return () => h(WrappedComponent, {
          ...props,
          ...attrs,
          'visible': localVisible.value,
          'onUpdate:visible': (value: boolean) => { localVisible.value = value },
        }, slots)
      }

      return () => h(
        Transition,
        { name: 'fade' },
        () => localVisible.value
          ? h(WrappedComponent, { ...props, ...attrs }, slots)
          : null,
      )
    },
  })

  return Modalified as DefineComponent & { new(): ComponentPublicInstance & { toggle: () => void } }
}

// 使用
const WrappedModal = modalify(Modal)
<WrappedModal>弹窗内容</WrappedModal>

```

这样既可以接管弹窗的 `visible` 又可以直接将普通组件变为弹窗，解决了统一接口的问题，当然这只是一段简单的实现，如果要更通用就要考虑更全面一些。

接下来是如何将弹窗放入队列，这里我有两个解决的思路：

```jsx
// 方案 1
useModalQueue([
  { ref: modal1, condition1, priority1 },
  { ref: modal2, condition2, priority2 }
])

// 方案 2
const { enqueue } = useModalQueue([{ ref: initialModal1, priority: 99 }, initialModal2])
enqueue(modal1, 1)
enqueue(modal2, 2)
enqueue(modal3) // 默认 priority = 0，无优先级
```

- 方案 1 是将弹窗的实例、弹出条件、优先级全部传入 `useModalQueue` ，所有逻辑统一在函数内部计算；
- 方案 2 则是动态的通过 `enqueue` 将弹窗传入 `useModalQueue` ，函数本身只负责维护弹窗队列，将所有入队的弹窗按照队列弹出，而弹窗入队的时机（包括条件和优先级）都交由业务控制。

方案 1 的缺点很明显是弹窗多了后， `condition` 必然会有许多状态依赖，这里的逻辑会变得特别复杂，并且一些复杂的条件判定实现起来会很麻烦， `useModalQueue` 的职责不够纯粹，复用会受到限制；

方案 2 的缺点则是业务自行维护弹窗的入队和优先级，可能会导致逻辑不够集中，并且无法完全保证弹窗按照优先级弹出，因为可能存在高优先级弹窗在其他弹窗全部弹出后才入队的情况。不过因为 `enqueue` 足够灵活，也可以通过新增状态值之类的方法去处理这种情况。

我个人是更倾向于方案 2 的，因为通用性更强，其他的问题则可以通过开发规范和 Code Review 进行约束，下面是方案 2 核心逻辑的伪代码：

```jsx
function useModalQueue(initialModals) {
  const queue = []
  let isRunning = false

  const sortQueue = () => queue.sort((a, b) => a.priority - b.priority)

  const waitForClose = (modal) => {
    return new Promise((resolve) => {
      const checkClosed = () => {
        !modal.value.visible
          ? resolve(true)
          : setTimeout(checkClosed, 50)
      }
      checkClosed()
    })
  }

  const run = async () => {
    if (isRunning)
      return

    isRunning = true

    while (queue.length > 0) {
      const current = queue.shift()
      current.ref.value.toggle(true)
      await waitForClose(current.ref) // 等待关闭后继续循环
    }

    isRunning = false
  }

  
  const enqueue = (modal, priority = 0) => {
    if (queue.find(item => item.ref === modal))
      return

    queue.push({ ref: modal, priority })
    sortQueue()
    run()
  }

  initialModals.forEach((modal) => {
    if (modal?.value) {
      enqueue(modal.value, 0)
    }
  })

  return { enqueue }
}
```

现在这种管理弹窗的方式，已经可以满足大部分的业务需求了，如果还有更复杂的弹窗状态和管理需求，可以考虑引入状态机模型进行处理。

-- 

顺便吐槽一下，Vue 的 `DefineComponent` 类型定义太复杂了，高阶组件写起来有些难受，不知道是不是我的用法有问题。
