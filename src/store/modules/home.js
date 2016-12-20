import * as types from '../mutation-types'

let state = {
	index_data: {},
	hot_banner_list: {},
	obj:{
		message: null,
		todo: []
	}
}

const mutations = {
	//获取首页数据
	[types.GET_INDEX_DATA](state, index_data) {
        state.index_data = index_data.hot_banner_list;
    },
  	[types.UPDATE_MSG] (state, message) {
    	state.obj.message = message
  	},
  	[types.ADD_TODO](state, todo) {
  		state.obj.todo.push( {title:todo})
  	}


}


export default {
    state,
    mutations
}