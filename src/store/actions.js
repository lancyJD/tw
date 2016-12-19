import api from '../api/api'
import * as types from './mutation-types'

//index-nav
export const get_index_nav = ({ commit }) => {
    let index_nav = require('../mock/index-nav')
    commit('SET_MENU', index_nav)
}
export const set_menu_active = ({ commit }, _index) => {
    commit('SET_MENU_ACTIVE', _index)
}

export const get_index_data = ({commit}) => {
	console.log("<<<<<<<<<<<<<<<<<<")
	api.geIndextData(function(data){
		commit(types.GET_INDEX_DATA, data);
	})
}

//向外导出统一的action方法
function makeAction (type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args)
}