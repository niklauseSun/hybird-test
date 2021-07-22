import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

var quick = require('./external/quick.min');

window.quick = quick;
require('./external/quick.native.min');
require('./external/quick.h5.min');

Vue.prototype.quick = quick;

console.log('quick', quick);

quick.error(function(error) {
  alert(JSON.stringify(error));
});

quick.config({
  // 可以传入需要注册的拓展组件-如果原生有支持的话，也可以不传
});

quick.ready(function(e) {
  // TODO: 处理验证成功后的事情，例如调用api
});

new Vue({
  render: (h) => h(App)
}).$mount('#app');
