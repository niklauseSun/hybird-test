<template>
  <div id="app">
    <div>测试</div>
    <div class="action-list">
      <div class="action-button" @click="alertAction">
        <span>alert</span>
      </div>
      <div class="action-button" @click="toastAction">
        <span>toast</span>
      </div>
      <div class="action-button" @click="scanAction">
        <span>scan</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
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
      console.log('quick.util.selectImage', quick.util);
      quick.util.scan({
        success: function(result) {
          console.log('result', result);
        },
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
