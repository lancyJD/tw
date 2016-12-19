import * as types from '../mutation-types'

let state = {
	index_data: {},
	hot_banner_list: {}
}

const mutations = {
	//获取首页数据
	[types.GET_INDEX_DATA](state, index_data) {
        state.index_data = index_data.hot_banner_list;
    },
}


export default {
    state,
    mutations
}