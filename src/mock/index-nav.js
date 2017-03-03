module.exports = {
    investor:[{
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
        text: '联系我们',
        isActive: false
    }, {
        index: 2,
        path: {
            path: '/mine'
        },
        hint: { type: "dot", count: 0 },
        iconClass: 'me',
        activeClass: 'me-active',
        text: '我的',
        isActive: false
    }]

}
