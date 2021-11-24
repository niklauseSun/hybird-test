<template>
  <div id="app">
    <div class="header-nav">顶部测试</div>
    <div class="header-content">
      <div class="title">测试</div>
      <div class="action-list">
        <img
          style="width: 100px; height: 100px"
          :src="imageName"
          v-if="imageName"
        />
        <input multiple="multiple" type="file" @change="tirggerFile($event)" />
        <div class="action-button" @click="testWebView">
          <span>testWebView</span>
        </div>
        <div class="action-button" @click="getVendorInfo">
          <span>获取device信息</span>
        </div>
        <div class="action-button" @click="jumpToWebView">
          <span>jumpToWebView</span>
        </div>
        <div class="action-button" @click="alertAction">
          <span>alert</span>
        </div>
        <div class="action-button" @click="toastAction">
          <span>toast</span>
        </div>
        <div class="action-button" @click="scanAction">
          <span>scan</span>
        </div>
        <div class="action-button" @click="selectPhoto">
          <span>选择照片</span>
        </div>
        <div class="action-button" @click="takePhoto">
          <span>拍照</span>
        </div>
        <div class="action-button" @click="selectFile">
          <span>选择文件</span>
        </div>
        <div class="action-button" @click="openFolder">
          <span>打开指定文件夹</span>
        </div>
        <div class="action-button" @click="createNewFolder">
          <span>新建文件夹</span>
        </div>
        <div class="action-button" @click="loginWithOutToken">
          <span>登录不需要token</span>
        </div>
        <div class="action-button" @click="loginWithToken">
          <span>登录需要token</span>
        </div>
        <div class="action-button" @click="createChannelListenner">
          <span>新建频道监听</span>
        </div>
        <div class="action-button" @click="joinChannel">
          <span>加入频道</span>
        </div>
        <div class="action-button" @click="leaveChannel">
          <span>离开频道</span>
        </div>
        <div class="action-button" @click="sendGroupMessage">
          <span>发送群组消息</span>
        </div>
        <div class="action-button" @click="sendPeerMessage">
          <span>发送单对单消息</span>
        </div>
        <div class="action-button" @click="initAgroaMessage">
          <span>初始化语音</span>
        </div>
        <div class="action-button" @click="joinCallChannel">
          <span>加入频道</span>
        </div>
        <div class="action-button" @click="leaveCallChannel">
          <span>离开频道</span>
        </div>
        <div class="action-button" @click="adjustPlayerVolume">
          <span>调整播放音量</span>
        </div>
        <div class="action-button" @click="adjustCallVolume">
          <span>调整语音音量</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
        imageName: undefined,
      };
    },
    mounted() {
      JSBridge.registerHandler("onChannelJoinChanged", (e) => {
        console.log("onChannelJoinChanged", e);
      });
      JSBridge.registerHandler("onReceiveFromGroup", (e) => {
        console.log("onReceiveFromGroup", e);
      });
      JSBridge.registerHandler("onReceiveFromPeer", (e) => {
        console.log("onReceiveFromPeer", e);
      });
      JSBridge.registerHandler("onCallUserState", (e) => {
        console.log("onCallUserState", e);
      });
      JSBridge.registerHandler("onCallUserMute", (e) => {
        console.log("onCallUserMute", e);
      });
    },
    methods: {
      tirggerFile(event) {
        //  String ACCEPT_IMAGE = "image";
        // String ACCEPT_CAMERA = "camera";
        // String ACCEPT_FILE = "file";
        console.log("triggerFile", event.target.files);

        let fr = new FileReader();

        fr.onload = function(e) {
          console.log("e", e);
        };

        fr.readAsText(event.target.files[0], "UTF-8");
      },
      testWebView() {
        WebBridge.testJs();
      },
      jumpToWebView() {
        // android
        // WebBridge.jumpToWebView(
        //   "https://xiu2.net/it/details/6105a3c479193629344217b9"
        // );
        console.log("window", window.webkit.messageHandlers);
        // ios
        window.webkit.messageHandlers.jumpToWebView.postMessage(
          "https://xiu2.net/it/details/6105a3c479193629344217b9"
        );
      },
      getVendorInfo() {
        quick.device.getVendorInfo({
          success: function(res) {
            console.log("res", res)
          }
        })
      },
      alertAction() {
        quick.ui.alert({
          title: "标题",
          message: "信息",
          buttonName: "确定",
          cancelable: 1,
          success: function() {
            // 点击 alert的按钮后回调
          },
          error: function() {},
        });
      },
      toastAction() {
        quick.ui.toast({
          message: "sd#ddd测试",
          success: function() {},
          error: function() {},
        });
      },
      scanAction() {
        quick.util.scan({
          success: function(result) {
            console.log("result", result);
          },
          error: function(error) {},
        });
      },
      selectFile() {
        quick.util.selectFile({
          success: (result) => {
            console.log("selectFile", result);
          },
        });
      },
      openFolder() {
        quick.util.openFolder({
          path: "/DCIM",
          success: (result) => {
            console.log("openFolder", result);
          },
        });
      },
      // 复制文件到制定文件
      copyFileTo() {
        quick.util.copyFileToLocation({
          oldpath: "",
          despath: "",
        });
      },
      createNewFolder() {
        quick.util.createFolder({
          path: "/com/test/test",
          success: (result) => {
            console.log("createFolder", result);
          },
        });
      },
      // 保存文件到指定名称中，保存在某些本地存储中，不涉及文件夹的操作
      saveFilesToPath() {
        quick.util.saveFilePaths({
          paths: "",
          saveName: "",
          success: (result) => {},
        });
      },
      // 对于大文件的处理
      getMd5List() {
        quick.uitl.getMd5List({
          filePath: "",
          success: (result) => {
            console.log("md5List", result);
          },
        });
      },
      // 上传图片或者单个文件
      uploadImage() {
        quick.util.uploadImage({
          reqUrl: "", // url地址
          type: "", // 请求类型
          filePath: "", // 文件地址
          success: (result) => {},
        });
      },
      // 上传md5文件的一部分
      uploadFilePart() {
        quick.util.uploadMd5Part({
          reqUrl: "",
          type: "",
          index: 0, // 这个位置是之前保存的一部分的具体位置，如果需要改成md5的可以讲下，或者直接用上面那个试试
          success: (result) => {},
        });
      },
      selectPhoto() {
        quick.util.selectImage({
          photoCount: 9,
          previewEnabled: 1,
          selectedPhotos: [],
          success: (result) => {
            console.log("selectImages", result.resultData);
          },
          error: function(error) {
            console.log("errror", error);
          },
        });
      },
      takePhoto() {
        quick.util.cameraImage({
          corp: 1,
          success: (result) => {
            console.log("selectImages", result);
            /**
         * 拍完照后返回
         * {
                resultData: "/storage/emulated/0/DCIM/Camera/IMG_20170703_133717.jpg" // 返回图片的本地路径
           }
         */
          },
          error: function(error) {},
        });
      },
      //
      loginWithOutToken() {
        // 登录不需要token的模块
        // 这个地方不需要callback
        quick.taketosee.loginWithOutToken({
          appId: "511767b5f6974accbae15e9022518589",
          userId: "userA",
          success: function() {},
          error: function(error) {},
        });
      },
      loginWithToken() {
        quick.taketosee.loginWithUserName({
          appId: "511767b5f6974accbae15e9022518589",
          userId: "userA",
          token: "",
          success: function() {},
          error: function(error) {},
        });
      },
      logout() {
        quick.taketosee.logout({
          success: function() {},
          error: function(error) {},
        });
      },
      createChannelListenner() {
        // 登录频道的时候需要先创建 监听
        quick.taketosee.createChannelListener({
          success: function() {},
          error: function(error) {},
        });
      },
      joinChannel() {
        quick.taketosee.joinChannel({
          channelName: "channel",
          success: function(e) {
            console.log("joinChannel callback", e);
          },
          error: function(error) {},
        });
      },
      leaveChannel() {
        quick.taketosee.leaveChannel({
          success: function(e) {
            console.log("leaveChannel callback", e);
          },
          error: function(error) {},
        });
      },
      sendGroupMessage() {
        quick.taketosee.sendGroupMessage({
          channelText: "test111",
          success: function() {},
          error: function(error) {},
        });
      },
      sendPeerMessage() {
        quick.taketosee.sendPeerMessage({
          userId: "userB",
          peerMessage: "test peer",
          success: function() {},
          error: function(error) {},
        });
      },
      initAgroaMessage() {
        quick.taketosee.initAgoraCall({
          // 语音appId
          appId: "3dc9b22d18a8405ea10efc0fcc2054d7",
          success: function(e) {
            console.log("initAgroaMessage", e);
          },
          error: function(error) {},
        });
      },
      joinCallChannel() {
        quick.taketosee.joinAgoraCallChannel({
          // 语音appId
          accessToken:
            "0063dc9b22d18a8405ea10efc0fcc2054d7IACSQCZEpK+36X1cgSiXKvm4Xt5SrApUwYkNGixu3X415z37XygAAAAAEAAZP2Q5owMBYQEAAQCiAwFh",
          channelName: "voiceDemoChannel1",
          userId: "100",
          extraInfo: "",
          success: function(e) {
            console.log("joinCallChannel", e);
          },
          error: function(error) {},
        });
      },
      leaveCallChannel() {
        quick.taketosee.leaveAgoraCallChannel({
          success: function(e) {
            console.log("leaveCallChannel", e);
          },
          error: function(error) {},
        });
      },
      adjustPlayerVolume() {
        quick.taketosee.adjustPlayerVolume({
          volume: 0,
          success: function() {},
          error: function(error) {},
        });
      },
      adjustCallVolume() {
        quick.taketosee.adjustRecordingVolume({
          volume: 0,
          success: function() {},
          error: function(error) {},
        });
      },
      getBase64Image(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
        var dataURL = canvas.toDataURL("image/" + ext);
        return dataURL;
      },
    },
  };
</script>

<style>
  * {
    margin: 0px;
  }
  .header-nav {
    background: red;
    width: 100%;
    height: 120px;
    position: fixed;
    z-index: 100;
  }

  .header-content {
    position: absolute;
    margin-top: 120px;
  }

  /* .title {
    margin: 120px;
  } */

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .action-list {
    display: flex;
    flex-direction: column;
  }

  .action-button {
    margin-top: 20px;
  }
</style>
