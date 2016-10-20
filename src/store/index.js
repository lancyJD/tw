import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from 'actions'
import * as getters from 'getters'
import base from './modules/base'
// import products from './modules/products'
// import createLogger from '../../node_modules/vuex/src/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    base
  },
  strict: debug
})
