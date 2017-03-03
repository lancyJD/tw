import api from '../api/api'
import * as types from './mutation-types'

//index-nav
export const get_index_nav = ({ commit }, type) => {
    let index_nav = require('../mock/index-nav')
    let index_nav_tmp = index_nav.investor
    commit('SET_MENU', index_nav_tmp)
}


export const set_menu_active = ({ commit }, nav) => {
    commit('SET_MENU_ACTIVE', nav)
}

export const get_index_data = ({commit}) => {
	api.geIndextData(function(data){
		commit(types.GET_INDEX_DATA, data);
	})
}
export const get_starup_list = ({commit}, params) =>{
    api.getStartUp(params, function(data) {
        commit(types.STAR_UP_LIST, data)
    })
}

export const more_get_starup_list = ({commit}, params) =>{
    api.getStartUp(params, function(data) {
        commit(types.MORE_STAR_UP_LIST, data)
    })
}


// //向外导出统一的action方法
function makeAction (type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args)
}

