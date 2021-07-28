<template>
  <div id="app">
    <div>测试</div>
    <div class="action-list">
      <img
        style="width: 100px;height: 100px"
        :src="imageName"
        v-if="imageName"
      />
      <input type="file" @change="tirggerFile($event)" />
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
      <div class="action-button" @click="chooseFile">
        <span>选择文件</span>
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
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      imageName: undefined
    };
  },
  mounted() {
    JSBridge.registerHandler('onChannelJoinChanged', (e) => {
      console.log('onChannelJoinChanged', e);
    });
    JSBridge.registerHandler('onReceiveFromGroup', (e) => {
      console.log('onReceiveFromGroup', e);
    });
    JSBridge.registerHandler('onReceiveFromPeer', (e) => {
      console.log('onReceiveFromPeer', e);
    });
    JSBridge.registerHandler('onCallUserState', (e) => {
      console.log('onCallUserState', e);
    });
    JSBridge.registerHandler('onCallUserMute', (e) => {
      console.log('onCallUserMute', e);
    });
  },
  methods: {
    tirggerFile(event) {
      //  String ACCEPT_IMAGE = "image";
      // String ACCEPT_CAMERA = "camera";
      // String ACCEPT_FILE = "file";
      console.log('triggerFile', event.target.files);
    },
    alertAction() {
      quick.ui.alert({
        title: '标题',
        message: '信息',
        buttonName: '确定',
        cancelable: 1,
        success: function() {
          // 点击 alert的按钮后回调
        },
        error: function() {}
      });
    },
    toastAction() {
      quick.ui.toast({
        message: 'sd#ddd测试',
        success: function() {},
        error: function() {}
      });
    },
    scanAction() {
      quick.util.scan({
        success: function(result) {
          console.log('result', result);
        },
        error: function(error) {}
      });
    },
    selectPhoto() {
      quick.util.selectImage({
        photoCount: 9,
        previewEnabled: 1,
        selectedPhotos: [],
        success: (result) => {
          console.log('selectImages', result.resultData);
          this.imageName = 'http://localimg' + result.resultData;

          var fr = new FileReader();
          fr.readAsDataURL(this.imageName);
          fr.onload = (e) => {
            console.log('fileRead', e);
          };
          fr.onerror = (e) => {
            console.log('fileRead err', e);
          };
          /**
         * 选择完图片后返回
         * {
                resultData: ["/storage/emulated/0/DCIM/Camera/IMG_20170703_133717.jpg"] // 返回图片的本地路径数组
           }
         */
        },
        error: function(error) {}
      });
    },
    takePhoto() {
      quick.util.cameraImage({
        corp: 1,
        success: (result) => {
          console.log('selectImages', result);
          /**
         * 拍完照后返回
         * {
                resultData: "/storage/emulated/0/DCIM/Camera/IMG_20170703_133717.jpg" // 返回图片的本地路径
           }
         */
        },
        error: function(error) {}
      });
    },
    chooseFile() {
      quick.util.selectFile({
        className: 'FileChooseActivity',
        success: (result) => {
          console.log('selectFile', result);
        }
      });
    },
    loginWithOutToken() {
      // 登录不需要token的模块
      // 这个地方不需要callback
      quick.taketosee.loginWithOutToken({
        appId: '511767b5f6974accbae15e9022518589',
        userId: 'userA',
        success: function() {},
        error: function(error) {}
      });
    },
    loginWithToken() {
      quick.taketosee.loginWithUserName({
        appId: '511767b5f6974accbae15e9022518589',
        userId: 'userA',
        token: '',
        success: function() {},
        error: function(error) {}
      });
    },
    logout() {
      quick.taketosee.logout({
        success: function() {},
        error: function(error) {}
      });
    },
    createChannelListenner() {
      // 登录频道的时候需要先创建 监听
      quick.taketosee.createChannelListener({
        success: function() {},
        error: function(error) {}
      });
    },
    joinChannel() {
      quick.taketosee.joinChannel({
        channelName: 'channel',
        success: function(e) {
          console.log('joinChannel callback', e);
        },
        error: function(error) {}
      });
    },
    leaveChannel() {
      quick.taketosee.leaveChannel({
        success: function(e) {
          console.log('leaveChannel callback', e);
        },
        error: function(error) {}
      });
    },
    sendGroupMessage() {
      quick.taketosee.sendGroupMessage({
        channelText: 'test111',
        success: function() {},
        error: function(error) {}
      });
    },
    sendPeerMessage() {
      quick.taketosee.sendPeerMessage({
        userId: 'userB',
        peerMessage: 'test peer',
        success: function() {},
        error: function(error) {}
      });
    },
    initAgroaMessage() {
      quick.taketosee.initAgoraCall({
        // 语音appId
        appId: '3dc9b22d18a8405ea10efc0fcc2054d7',
        success: function(e) {
          console.log('initAgroaMessage', e);
        },
        error: function(error) {}
      });
    },
    joinCallChannel() {
      quick.taketosee.joinAgoraCallChannel({
        // 语音appId
        accessToken:
          '0063dc9b22d18a8405ea10efc0fcc2054d7IACSQCZEpK+36X1cgSiXKvm4Xt5SrApUwYkNGixu3X415z37XygAAAAAEAAZP2Q5owMBYQEAAQCiAwFh',
        channelName: 'voiceDemoChannel1',
        userId: '100',
        extraInfo: '',
        success: function(e) {
          console.log('joinCallChannel', e);
        },
        error: function(error) {}
      });
    },
    leaveCallChannel() {
      quick.taketosee.leaveAgoraCallChannel({
        success: function(e) {
          console.log('leaveCallChannel', e);
        },
        error: function(error) {}
      });
    },
    adjustPlayerVolume() {
      quick.taketosee.adjustPlayerVolume({
        volume: 0,
        success: function() {},
        error: function(error) {}
      });
    },
    adjustCallVolume() {
      quick.taketosee.adjustRecordingVolume({
        volume: 0,
        success: function() {},
        error: function(error) {}
      });
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.action-list {
  display: flex;
  flex-direction: column;
}

.action-button {
  margin-top: 20px;
}
</style>
