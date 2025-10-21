---
title: React Native中使用Markdown编辑器
date: 2021/02/17 11:31:32
pubDate: 2021/02/17 11:31:32
tags: [React Native, WebView]
category: 技术
description: 最近在研究`React Native`，准备用它写一个笔记APP，但是并没有搜到很好用的编辑器插件，因此准备使用`WebView`和已有的Web端编辑器自己封装一个。

---

最近在研究`React Native`，准备用它写一个笔记 APP，但是并没有搜到很好用的编辑器插件，因此准备使用`WebView`和已有的 Web 端编辑器自己封装一个。

> 因本人没有苹果电脑，因此只尝试安卓版本

完整项目地址：[qiyuor2/rn-xnote](https://github.com/qiyuor2/rn-xnote)

## React Native WebView

`WebView`是一个能够在原生 APP 上加载 HTML 页面的组件，不过它没有提供浏览器的地址栏、导航栏等功能。在原生 APP 的开发中经常会用到。

### 安装

```bash
npm install react-native-webview
# or yarn add react-native-webview
```

### 基本使用

#### 引入 URL

```jsx
import React, { Component } from 'react';
import { WebView } from 'react-native';

export default function MyWeb() {
  return (
    <WebView source={{ uri: 'https://github.com/facebook/react-native' }} />
  );
}
```

#### 引入本地文件

```jsx
import React, { Component } from 'react';
import { WebView, Platform } from 'react-native';

export default function MyWeb() {
  return (
    <WebView
      source={
        Platform.OS === 'ios'
          ? require('../../../assets/vditor.html')
          : { uri: 'file:///android_asset/vditor.html' }
      }
    />
  );
}
```

### Web 和 React Native 之间的通信

**Web 到 React Native**

`window.ReactNativeWebView.postMessage(message)`该方法接收一个字符串，并将该字符串发送到 React Native 中。在 React Native 中使用`WebView`组件的`onMessage`属性接收

**React Native 到 Web**

- `injectedJavaScript`向网页中注入 js
- `injectedJavaScriptBeforeContentLoaded`在网页加载之前向网页中注入 js
- `postMessage(message)`向网页中发送消息，与`window.ReactNativeWebView.postMessage(message)`相对应。网页可以通过监听`message`事件收到消息。

> 更多 API 请查看[WebView 文档](https://reactnative.cn/docs/webview)

## 封装 Vditor

### 准备 HTML 文件

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, user-scalable=no"
    />
    <!-- 以下文件建议放到本地使用 -->
    <link
      rel="stylesheet"
      href="https://gcore.jsdelivr.net/npm/vditor/dist/index.css"
    />
    <script src="https://gcore.jsdelivr.net/npm/vditor/dist/index.min.js"></script>
  </head>
  <body>
    <div id="vditor"></div>
    <script>
      // window.options 会在React Native中通过injectedJavaScriptBeforeContentLoaded注入
      const vditor = new Vditor('vditor', {
        ...window.options,
        // 向编辑器输入时，通过postMessage向React Native发送消息，触发onMessage
        input: (value) => {
          const message = {
            type: 'onChange',
            message: value,
          };
          window.ReactNativeWebView.postMessage(JSON.stringify(message));
        },
      });
      // 监听React Native发送来的消息
      window.document.addEventListener('message', (e) => {
        vditor.setValue(e.data);
      });
    </script>
  </body>
</html>
```

如果是安卓开发，需要将该文件放到`your-project/android/app/src/main/assets/`下，之后通过`{uri: 'file:///android_asset/xxxx.html'}`引入

### React Native 组件

```jsx
import React, { useRef, useState } from 'react';
import { WebView, WebViewMessageEvent } from 'react-native-webview';

export default function Vditor() {
  const webviewRef = useRef < WebView > null;
  const [content, setContent] = useState('');

  // 注入到网页中的vditor配置数据
  const options = `window.options=${JSON.stringify({
    mode: 'ir',
    toolbar: [],
    outline: false,
    debugger: false,
    placeholder: '可使用markdown语法...',
  })}`;

  //#region 初始化编辑器内容
  useEffect(() => {
    const fetchData = async () => {
      // 获取初始化的数据
      const data = await request();
      setContent(data);
    };
    fetchData();
  }, []);
  useEffect(() => {
    webviewRef.current?.postMessage(content);
  }, [content]);
  //#endregion

  const onMessage = (e: WebViewMessageEvent) => {
    const data = JSON.parse(e.nativeEvent.data);
    if (data.type === 'onChange') {
      setContent(data.message);
    }
  };

  return (
    <WebView
      ref={webviewRef}
      onMessage={onMessage}
      javaScriptEnabled
      source={
        Platform.OS === 'ios'
          ? require('../../../assets/vditor.html')
          : { uri: 'file:///android_asset/vditor.html' }
      }
      injectedJavaScriptBeforeContentLoaded={options}
      style={{
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
      }}
    />
  );
}
```

> 注意：React Native 中使用 WebView 必须要给他设置宽和高，不然可能会导致应用卡死

完整项目地址：[qiyuor2/rn-xnote](https://github.com/qiyuor2/rn-xnote)

## 参考文章

- [手摸手带你封装 React Native 富文本编辑器](https://juejin.cn/post/6867945949788897288)
