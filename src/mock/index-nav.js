module.exports = [{
    index: 0,
    path: {
        path: '/home'
    },
    hint: { type: "count", count: 0 }, //count,dot
    iconClass: 'icon-wechat',
    text: '微信'
}, {
    index: 1,
    path: {
        path: '/bar'
    },

    hint: { type: "count", count: 0 },
    iconClass: 'icon-contact',
    text: '通讯录'
}, {
    index: 2,
    path: {
        path: '/foo'
    },
    hint: { type: "dot", count: 99 },
    iconClass: 'icon-find',
    text: '发现'
}, {
    index: 3,
    path: {
        path: '/me'
    },
    hint: { type: null, count: '' },
    iconClass: 'icon-me',
    text: '我'
}]
