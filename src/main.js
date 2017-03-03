import Vue from 'vue'

import { sync } from 'vuex-router-sync'
import router from './router'
import store from './store'
import * as filters from './filters'
import App from './App'
import './assets/css/weui.scss'
import './assets/css/bass.scss'
import Msg from './comm/message'
import Vue2Filters from 'vue2-filters'
// import { Loadmore } from 'mint-ui';

// Vue.component(Loadmore.name, Loadmore);
Vue.use(Vue2Filters);

sync(store, router)

//注册filter
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(require('vue-awesome-swiper'));

Vue.use(Msg);


let evn = process.env.NODE_ENV
let appid = '';//HelloLemon檬运动  正式环境
console.log("当前的环境变量为：" + evn)
if(evn === 'production') {
    // document.write('<script src=//cdn.jsdelivr.net/eruda/1.0.5/eruda.min.js></scr' + 'ipt>');
    // document.write('<script> eruda.init();</scr' + 'ipt>');
} else if(evn === 'uat') {
    // document.write('<script src=//cdn.jsdelivr.net/eruda/1.0.5/eruda.min.js></scr' + 'ipt>');
    // document.write('<script> eruda.init();</scr' + 'ipt>');
} else {
    // document.write('<script src=//cdn.jsdelivr.net/eruda/1.0.5/eruda.min.js></scr' + 'ipt>');
    // document.write('<script> eruda.init();</scr' + 'ipt>');
    console.log("当前环境为开发环境")
}
const app = new Vue({
  router,
  store,
  Msg,
  ...App 
}).$mount('#app')
window.Vue = Vue