# hybird-test

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### WebBridge 接口

```js
// 发送消息
WebBridge.sendData(String data);

// 挂断
WebBridge.hangup();

// 打电话
WebBridge.call();

// 初始化
// android 只需要userId即可
WebBridge.initMessageAction(String userId);

// 加入频道
// 初始化之后就可以加入频道了

// WebBridge.joinChannelWithToken(String accessToken, String channelName);

// WebBridge.joinChannelWithName(String channelName)

// WebBridge.joinChannel()

// WebBridge.leaveChannel();

// iOS的代码 需要通过json传过来

// 初始化
window.webkit.messageHandlers.initMessageAction.postMessage("")// userId

// 拨打
window.webkit.messageHandlers.call.postMessage("") //roomid houseid houseurl channelName peerId

// 加入 客服
window.webkit.messageHandlers.joinChannel.postMessage("") // channelName 频道名 audioToken 语音token？

// 挂断 客服
window.webkit.messageHandlers.hangup.postMessage("")

// 拒绝
window.webkit.messageHandlers.refuse.postMessage("")

// 接受
window.webkit.messageHandlers.accept.postMessage("")

// 静音
window.webkit.messageHandlers.mute.postMessage("")

// 打开语音
window.webkit.messageHandlers.unmute.postMessage("")

// JS 监听native

onData() {

}

updateChatStatus() {

}
```
