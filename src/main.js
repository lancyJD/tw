import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import router from './router'
import store from './store'
import * as filters from './filters'
import App from './App'

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css' // 使用 carbon 主题
import appbar from 'muse-components/appbar'
import avatar from 'muse-components/avatar'
// ..
Vue.component(appbar.name, appbar)
Vue.component(avatar.name, avatar)
Vue.use(MuseUI)


sync(store, router)

//注册filter
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
/* eslint-disable no-new */
const app = new Vue({
  router,
  store,
  ...App // Object spread copying everything from App.vue
}).$mount('#app')