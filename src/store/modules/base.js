import * as types from '../mutation-types'

let state = {
    backPath: '',
    index_nav: JSON.parse(window.sessionStorage.getItem(types.INDEX_NAV)),
    menu_active: { text: "", index: 0 },
    userInfo: JSON.parse(window.sessionStorage.getItem(types.USER_INFO)) || {},
    type: JSON.parse(window.sessionStorage.getItem(types.SET_TYPE)) || 1,
}
const mutations = {
    [types.SET_MENU](state, index_nav) {
        state.index_nav  = index_nav
        window.sessionStorage.setItem(types.INDEX_NAV, JSON.stringify([{
        index: 0,
        path: {
            path: '/home'
        },
        hint: { type: "count", count: 0 }, //count,dot
        iconClass: 'investor',
        activeClass: 'investor-active',
        text: '首页',
        isActive: true
    }, {
        index: 1,
        path: {
            path: '/message_info/1'
        },
        hint: { type: "count", count: 0},
        iconClass: 'message',
        activeClass: 'message-active',
        text: '商城',
        isActive: false
    }, {
        index: 2,
        path: {
            path: '/mine'
        },
        hint: { type: "dot", count: 0 },
        iconClass: 'me',
        activeClass: 'me-active',
        text: '代理',
        isActive: false
    }]));
    },
    [types.SET_MENU_ACTIVE](state, _index) {
        let index = state.index_nav
        for (var i = state.index_nav.length - 1; i >= 0; i--) {
            if(state.index_nav[i].index==_index){
                state.index_nav[i].isActive = true
            } else {
                state.index_nav[i].isActive = false
            }
        }
        window.sessionStorage.setItem(types.INDEX_NAV, JSON.stringify(state.index_nav));
        //底部导航激活
        // state.menu_active = state.index_nav[_index]
    },
    [types.BACK_PATH](state, _path) {
        //设置返回按钮跳转路径,router.afterEach设置
        state.backPath = { path: _path };
    },
    [types.SET_CHAT_COUNT](state, count) {
        state.index_nav[0].hint.count = count;
    },
    [types.USER_INFO](state, userInfo){
        state.userInfo = userInfo
        window.sessionStorage.setItem(types.USER_INFO, JSON.stringify(userInfo));
    },
    [types.SET_TYPE](state, type){
        state.type = type
        window.sessionStorage.setItem(types.SET_TYPE, JSON.stringify(type));
       
    },
}

export default {
    state,
    mutations
}
