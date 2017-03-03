import * as types from '../mutation-types'

let state = {
    index_data: {},
    hot_banner_list: {},
    isNeedNav: true,
    obj: {
        message: null,
        todo: []
    },
    conditionDate: {
        tuijian: [],
        cities: [],
        yaoqiu: []
    },
    startUpList:{
        data:{
            list:[]
        }
        
    },
    b:[1,3,4]
}

const mutations = {
    //获取首页数据
    [types.UPDATE_MSG](state, message) {
        state.obj.message = message
    },
    [types.ADD_TODO](state, todo) {
        state.obj.todo = todo
    },
    [types.IS_NEED_NAV](state, isNeedNav) {
        // console.log(isNeedNav)
        state.isNeedNav = isNeedNav
    },
    [types.USER_INFO](state, userInfo) {
        // state.userInfo = userInfo
        window.sessionStorage.setItem(types.USER_INFO, JSON.stringify(userInfo));
    },
    [types.HEAD_CONDITION](state, conditionDate) {
        state.conditionDate = conditionDate
    },
    [types.STAR_UP_LIST](state, startUpList) {
        state.startUpList = startUpList
    },
    [types.MORE_STAR_UP_LIST](state, startUpList) {
        if(state.startUpList.data) {
            state.startUpList.data.list = state.startUpList.data.list.concat(startUpList.data.list)
        } else {
             state.startUpList = startUpList
        }
    }



}


export default {
    state,
    mutations
}
