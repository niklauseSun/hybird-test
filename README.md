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
WebBridge.initMessageAction(String userId);

// 加入频道
// 初始化之后就可以加入频道了

WebBridge.joinChannelWithToken(String accessToken, String channelName);

WebBridge.joinChannelWithName(String channelName)

WebBridge.joinChannel()

WebBridge.leaveChannel();


// JS 监听native

onData() {

}

updateChatStatus() {

}
```
