---
title: Vue.js 源码学习 - 初始化
date: 2022/07/07 14:44:39
pubDate: 2022/07/07 14:44:39
description: 对于Vue.js 技术揭秘与Vue源码的学习笔记
tags: [笔记]
category: 技术
---

对于[Vue.js 技术揭秘](https://ustbhuangyi.github.io/vue-analysis/v2/prepare/)与 Vue 源码的学习笔记

## 构建与入口

Vue.js 通过执行`node scripts/build.js`进行构建

```js
if (process.argv[2]) {
  const filters = process.argv[2].split(",");
  builds = builds.filter((b) => {
    return filters.some((f) => b.output.file.indexOf(f) > -1 || b._name.indexOf(f) > -1);
  });
} else {
  builds = builds.filter((b) => {
    return b.output.file.indexOf("weex") === -1;
  });
}

build(builds);
```

这段代码针对构建命令`npm run build -- web-runtime-cjs,web-server-renderer`传入的参数不同进行过滤，向`build`函数中传入了不同的参数，这些参数都配置在`scripts/config.js`中，声明了编译的入口、出口、格式、环境

```js
const builds = {
  // Runtime only (CommonJS). Used by bundlers e.g. Webpack & Browserify
  "web-runtime-cjs-dev": {
    entry: resolve("web/entry-runtime.js"),
    dest: resolve("dist/vue.runtime.common.dev.js"),
    format: "cjs",
    env: "development",
    banner,
  },
  "web-runtime-cjs-prod": {
    entry: resolve("web/entry-runtime.js"),
    dest: resolve("dist/vue.runtime.common.prod.js"),
    format: "cjs",
    env: "production",
    banner,
  },
  //...
};
```

**Runtime Only**

该版本的 Vue.js 需要借助 vue-loader 编译 .vue 文件

**Runtime + Compiler**

该版本的 Vue.js 带有编译器，能够在客户端将 template 编译成 render 函数，大致效果可以理解为下面的两段代码

```js
new Vue({
  template: "<div>{{ hi }}</div>",
});

new Vue({
  render(h) {
    return h("div", this.hi);
  },
});
```

### 入口文件

之前提到`config.js`中声明了编译版本的入口文件，这样就很方便的找到了 Runtime + Compiler 版本的入口文件所在的位置`src/platforms/web/entry-runtime-with-compiler.js`

可以看到该文件的最底部有一个`export default Vue`，我们写 Vue 项目时的`import Vue from 'vue`就是从这里倒入的（这里是构建前的代码，实际上是从构建后的代码中倒入），不过一般情况下我们开发使用的是 Runtime Only`src/platforms/web/entry-runtime.js`。

这个入口文件中 Vue 的来源是`import Vue from './runtime/index'`，而在`src/platforms/web/runtime/index.js`中可以看到，Vue 真正初始化的位置是`src/core/index.js`

```js
import Vue from "./instance/index";
import { initGlobalAPI } from "./global-api/index";
import { isServerRendering } from "core/util/env";
import { FunctionalRenderContext } from "core/vdom/create-functional-component";

initGlobalAPI(Vue);

// ...

export default Vue;
```

在这里通过`initGlobalAPI(Vue)`初始化了 Vue 的全局 API，我们见到的`Vue.set`，`Vue.nextTick`，`Vue.use`等 API 都是在这里挂载到 Vue 上的

而 Vue 本身声明在`src/core/instance/index.js`中

```js
import { initMixin } from "./init";
import { stateMixin } from "./state";
import { renderMixin } from "./render";
import { eventsMixin } from "./events";
import { lifecycleMixin } from "./lifecycle";
import { warn } from "../util/index";

function Vue(options) {
  if (process.env.NODE_ENV !== "production" && !(this instanceof Vue)) {
    warn("Vue is a constructor and should be called with the `new` keyword");
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

export default Vue;
```

## new Vue

当我们`new Vue({ ... })`初始化时，调用了`this._init`方法，该方法是通过`initMixin(Vue)`挂载到 Vue 上的，定义在`src/core/instance/init.js`中，而`_init`方法主要逻辑就是进行一些初始化行为：生命周期、data、props 等内容的初始化

```js
Vue.prototype._init = function (options?: Object) {
  const vm: Component = this;
  // a uid
  vm._uid = uid++;

  let startTag, endTag;
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== "production" && config.performance && mark) {
    startTag = `vue-perf-start:${vm._uid}`;
    endTag = `vue-perf-end:${vm._uid}`;
    mark(startTag);
  }

  // a flag to avoid this being observed
  vm._isVue = true;
  // merge options
  if (options && options._isComponent) {
    // optimize internal component instantiation
    // since dynamic options merging is pretty slow, and none of the
    // internal component options needs special treatment.
    initInternalComponent(vm, options);
  } else {
    vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
  }
  /* istanbul ignore else */
  if (process.env.NODE_ENV !== "production") {
    initProxy(vm);
  } else {
    vm._renderProxy = vm;
  }
  // expose real self
  vm._self = vm;
  initLifecycle(vm);
  initEvents(vm);
  initRender(vm);
  callHook(vm, "beforeCreate");
  initInjections(vm); // resolve injections before data/props
  initState(vm);
  initProvide(vm); // resolve provide after data/props
  callHook(vm, "created");

  /* istanbul ignore if */
  if (process.env.NODE_ENV !== "production" && config.performance && mark) {
    vm._name = formatComponentName(vm, false);
    mark(endTag);
    measure(`vue ${vm._name} init`, startTag, endTag);
  }

  if (vm.$options.el) {
    vm.$mount(vm.$options.el);
  }
};
```

## vm.$mount

在 init 的最后会通过`vm.$mount`挂载 Vue 实例，而`$mount`在不同平台、构建方式下都有所不同。

首先是`src/platforms/web/runtime/index.js`中定义了一个通用的`$mount`，无论是在哪个平台、哪个构建方式下最终都会调用这个通用的`$mount`，只不过会有一些不同的前置操作

```js
// public mount method
Vue.prototype.$mount = function (el?: string | Element, hydrating?: boolean): Component {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating);
};
```

`src/platforms/web/entry-runtime-with-compiler.js`中就是实现缓存了该`$mount`之后重写了它

```js
const mount = Vue.prototype.$mount;
Vue.prototype.$mount = function (el?: string | Element, hydrating?: boolean): Component {
  //...

  return mount.call(this, el, hydrating);
};
```

在该模式下，由于需要编译 template，`$mount`增加了一些前置操作

首先是禁止挂载到 html 或 body 上

```js
if (el === document.body || el === document.documentElement) {
  process.env.NODE_ENV !== "production" && warn(`Do not mount Vue to <html> or <body> - mount to normal elements instead.`);
  return this;
}
```

然后通过判断传入的是 template 还是 render 方法，如果是 template 则需要转化为 render 方法，转化所调用的`compileToFunctions`引入自`src/compiler/index.js`，compiler 目录下包含了 Vue.js 所有的编译相关的代码

```js
if (!options.render) {
  let template = options.template;
  if (template) {
    if (typeof template === "string") {
      if (template.charAt(0) === "#") {
        template = idToTemplate(template);
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== "production" && !template) {
          warn(`Template element not found or is empty: ${options.template}`, this);
        }
      }
    } else if (template.nodeType) {
      template = template.innerHTML;
    } else {
      if (process.env.NODE_ENV !== "production") {
        warn("invalid template option:" + template, this);
      }
      return this;
    }
  } else if (el) {
    template = getOuterHTML(el);
  }
  if (template) {
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== "production" && config.performance && mark) {
      mark("compile");
    }

    const { render, staticRenderFns } = compileToFunctions(
      template,
      {
        outputSourceRange: process.env.NODE_ENV !== "production",
        shouldDecodeNewlines,
        shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments,
      },
      this
    );
    options.render = render;
    options.staticRenderFns = staticRenderFns;

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== "production" && config.performance && mark) {
      mark("compile end");
      measure(`vue ${this._name} compile`, "compile", "compile end");
    }
  }
}
```

最后就是调用缓存的`mount`，在这个方法中调用了`mountComponent`，也就是说真正挂载 Vue 实例的函数是`src/core/instance/lifecycle.js`中的`mountComponent`

`mountComponet`的核心逻辑就是通过`vm._render`生成 VNode 以及通过`vm._update`更新 DOM，在初始化时会通过`new Watcher`(Watcher 的构造函数)执行一遍`vm._update`和`vm._render`

## render

`vm._render`声明在`src/core/instance/render.js`中，该方法最关键的逻辑就是对于用户声明的 render 或是通过 template 编译出的 render 的调用

```js
vnode = render.call(vm._renderProxy, vm.$createElement);
```

这个`vm._renderProxy`实际上就是 this，在初始化的逻辑中可以找到，`vm.$createElement`是`src/core/vdom/create-element.js`中的`createElement`函数，用户手写的 render 时的入参就是该函数。`createElement`最终会创建 VNode 并返回。

在`new VNode`之前会进行 children 的规范化操作，将 children 变为`VNode[]`

```js
if (normalizationType === ALWAYS_NORMALIZE) {
  children = normalizeChildren(children);
} else if (normalizationType === SIMPLE_NORMALIZE) {
  children = simpleNormalizeChildren(children);
}
```

## update

`vm._update`会将`vm.render`返回的 vnode 传入`vm.__patch__`中，渲染为真实 DOM，`vm.__patch__`在 web 和 weex 上实现方法是不同的，因此分别定义在了`src/platforms`的 web 和 weex 中

`vm.__patch__`是`src/core/vdom/patch.js`中`createPatchFunction`创建出来的`patch`函数。

`createPatchFunction`的入参是一些定义好的 DOM 操作函数和一些钩子函数，采用这样的做法而不是在`src/core/vdom/patch.js`中直接 import 的原因是 web 和 weex 的这些 DOM 操作和钩子不同，但是创建`vm.__patch__`使用的是同一个`createPatchFunction`

### 初始化的 patch

```js
new Vue({
  el: "#app",
  render: function (createElement) {
    return createElement(
      "div",
      {
        attrs: {
          id: "app",
        },
      },
      this.message
    );
  },
  data: {
    message: "Hello Vue!",
  },
});
```

```js
vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
```

入参中的`vm.$el`是在`$mount`时获取到的`<div id="app">`，`hydrating`在非服务端渲染时都是`false`

`patch`会将`vm.$el`转为 VNode，之后通过`createElm`将 VNode 创建为真实 DOM 并插入父节点

```js
if (isRealElement) {
  // mounting to a real element
  // check if this is server-rendered content and if we can perform
  // a successful hydration.
  if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
    oldVnode.removeAttribute(SSR_ATTR);
    hydrating = true;
  }
  if (isTrue(hydrating)) {
    // ...
  }
  // either not server-rendered, or hydration failed.
  // create an empty node and replace it
  oldVnode = emptyNodeAt(oldVnode);
}

// replacing existing element
const oldElm = oldVnode.elm;
const parentElm = nodeOps.parentNode(oldElm);

// create new node
createElm(
  vnode,
  insertedVnodeQueue,
  // extremely rare edge case: do not insert if old element is in a
  // leaving transition. Only happens when combining transition +
  // keep-alive + HOCs. (#4590)
  oldElm._leaveCb ? null : parentElm,
  nodeOps.nextSibling(oldElm)
);
// ...
```

```js
// function createElm

vnode.elm = vnode.ns ? nodeOps.createElementNS(vnode.ns, tag) : nodeOps.createElement(tag, vnode);

// ...

if (isDef(tag)) {
  if (process.env.NODE_ENV !== "production") {
    if (data && data.pre) {
      creatingElmInVPre++;
    }
    if (isUnknownElement(vnode, creatingElmInVPre)) {
      warn(
        "Unknown custom element: <" +
          tag +
          "> - did you " +
          "register the component correctly? For recursive components, " +
          'make sure to provide the "name" option.',
        vnode.context
      );
    }
  }

  vnode.elm = vnode.ns ? nodeOps.createElementNS(vnode.ns, tag) : nodeOps.createElement(tag, vnode);
  setScope(vnode);

  /* istanbul ignore if */
  if (__WEEX__) {
    // ...
  } else {
    createChildren(vnode, children, insertedVnodeQueue);
    if (isDef(data)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
    }
    insert(parentElm, vnode.elm, refElm);
  }

  if (process.env.NODE_ENV !== "production" && data && data.pre) {
    creatingElmInVPre--;
  }
} else if (isTrue(vnode.isComment)) {
  // 注释
  vnode.elm = nodeOps.createComment(vnode.text);
  insert(parentElm, vnode.elm, refElm);
} else {
  // 文本
  vnode.elm = nodeOps.createTextNode(vnode.text);
  insert(parentElm, vnode.elm, refElm);
}
```

其中的`createChildren`是对于`createElm`的递归调用，遍历所有的子节点，它的入参`insertedVnodeQueue`是通过`invokeCreateHooks`创建的，它会将 vnode 放到`insertedVnodeQueue`中。

最终`patch`就会将完整的 DOM 树创建出来
