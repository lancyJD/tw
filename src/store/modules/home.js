import * as types from '../mutation-types'

let state = {
	index_data: {}
}

const mutations = {
	//获取首页数据
	[types.GET_INDEX_DATA](state, index_data) {
        state.index_data = index_data;
    },
}


export default {
    state,
    mutations
}