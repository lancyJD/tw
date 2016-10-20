import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import router from './router'
import store from './store'
import App from './App'


sync(store, router)
/* eslint-disable no-new */
const app = new Vue({
  router,
  store,
  ...App // Object spread copying everything from App.vue
}).$mount('#app')