module.exports = [{
    index: 0,
    path: {
        path: '/foo'
    },
    hint: { type: "count", count: 0 }, //count,dot
    iconClass: 'icon-wechat',
    text: '一元'
}, {
    index: 1,
    path: {
        path: '/bar'
    },

    hint: { type: "count", count: 0 },
    iconClass: 'icon-contact',
    text: '发现'
}, {
    index: 2,
    path: {
        path: '/find'
    },
    hint: { type: "dot", count: 99 },
    iconClass: 'icon-find',
    text: 'xxx'
}, {
    index: 3,
    path: {
        path: '/me'
    },
    hint: { type: null, count: '' },
    iconClass: 'icon-me',
    text: '我'
}]
