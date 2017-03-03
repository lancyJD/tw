import Vue from 'vue'
import VueResource from 'vue-resource'
import Msg from '../comm/message'
import router from '../router'
// Javascript
Vue.use(VueResource)

// HTTP相关
Vue.http.options.emulateJSON = true
Vue.http.options.crossOrigin = true
// Vue.http.options.root = 'http://touzi.heatup.cn'

Vue.use(Msg);

Vue.http.interceptors.push((request, next) => {
    Vue.toast();

    next((response) => {
        
        if (!response.ok || response.status != 200) {

            Vue.info('服务器异常，请稍后再试');
            if (response.status == 404 || response.status == 504) {
                // router.push('/home')//如果404
            }
            // router.push('/home')//如果异常跳到异常页面
        }
        if (response.data && response.data.ret == -1) {
            // if('当前未登录。' == response.data.msg) {
            //     router.push('/start')
            // }
            Vue.info(response.data.msg);
        }

        Vue.closeToast();
        // console.log(response.data)
        return response
    })
});

export default {
    //下载图片 dowload_img
    downLoadImg(serviceIds, cb) {
        Vue.http.get('/htvc-api/web_chat/dowload_img?serviceIds=' + serviceIds).then((response) => {
            cb(response.data)
        }, (error) => {
            console.log(error)
        })
    },
    //http://localhost:8081/htvc-api/web_chat/weiXinShare?url="http://www.baidu.com"
    getWXSign(url, cb){
        Vue.http.get('/htvc-api/web_chat/weiXinShare?url=' + url).then((response) => {
            cb(response.data)
        }, (error) => {
            console.log(error)
        })
    },
    //验证登录态是否在有效期内
    checkOutLogon(mobile, cb) { 
        Vue.http.get('/htvc-api/user/cookie_login?mobile=' + mobile).then((response) => {
            cb(response.data)
        }, (error) => {
            console.log(error)
        })
    },
    //申请沟通
    applyExchange(param, cb){
        Vue.http.get('/htvc-api/exchange/apply_exchange', {params: param}).then((response) => {
            cb(response.data)
        }, (error) => {
            console.log(error)
        })
    },
    // 项目进度重新申请-
    resubmit(cb){
        Vue.http.get('/htvc-api/project/re_submit').then(function (data) {
            cb(data.data)
        }, function (error) {
            cb(error)
        })
    },
    //创业者获取个人的基础信息/user/get_userinfo
    getStartUpInfo(cb){
        Vue.http.get('/htvc-api/user/get_userinfo').then(function (data) {
            console.log(data.data)
            cb(data.data)
        }, function (error) {
            cb(error)
        })
    },
    //创业者详情
    startUpOrInvestorDetail(param, cb){
        Vue.http.get('/htvc-api/user/query_userinfo', {params: param}).then(function (data) {
            cb(data.data)
        }, function (error) {
            cb(error)
        })
    },
    // htvc-api/exchange/see_investor 创业者查看关注了他的投资人之间的沟通列表
    seeInvestor(param, cb){
        Vue.http.get('/htvc-api/investors/see_investor', param).then((response) => {
            cb(response.data)
        }, (error) => {
            console.log(error)
        })
    },

    //看过或者添加/relation/add_relation?type=0&whoId=xx //type:0: 看过。 1: 关注   whoId:关注或看过的人的userid
    addRelation(param, cb){
        Vue.http.post('/htvc-api/relation/add_relation', param).then((response) => {
            cb(response.data)
        }, (error) => {
            console.log(error)
        })
    },
    // 系统消息
    systeInfo(cb) { 
        Vue.http.get('/htvc-api/message/user_msg').then((response) => {
            cb(response.data)
        }, (error) => {
            console.log(error)
        })
    },
    //添加项目进度
    addProjectSchdule(param, cb) {
        Vue.http.post('/htvc-api/project/add_detail', param).then((response) => {
            cb(response.data)
        }, (error) => {
            console.log(error)
        })
    },
    // 项目申报进度列表user/logintesthaha?mobile=13688809220
    projectSchduleList(param, cb) {
        Vue.http.get('/htvc-api/project/detail_list', {params: param}).then((response) => {
            cb(response.data)
        }, (error) => {
            console.log(error)
        })

    },
    needChatList(param, cb) {
        Vue.http.get('/htvc-api/exchange/query_exchange_list', {params: param}).then((response) => {
            cb(response.data)
        }, (error) => {
            console.log(error)
        })

    },
    // 项目申报进度状态获取user/logintesthaha?mobile=13688809220
    projectSchdule(cb) {
        Vue.http.get('/htvc-api/project/project_info').then((response) => {
            cb(response.data)
          }, (error) => {
            console.log(error)
          })
         
        },
        //需要沟通是否同意
    isAgreeChat(param, cb){
        Vue.http.get('/htvc-api/exchange/post_exchange_result', {params: param}).then((response) => {
            cb(response.data)
        }, (error) => {
            console.log(error)
        })
    },
        //需要沟通的列表
    needChatList(param, cb){
        Vue.http.get('/htvc-api/exchange/query_exchange_list', {params: param}).then((response) => {
            cb(response.data)
          }, (error) => {
            console.log(error)
        })
    },
    //获取关注人数
    getCheckOut(param, cb) {
        Vue.http.get('/htvc-api/relation/get', {params: param}).then((response) => {
            cb(response.data)
        }, (error) => {
            console.log(error)
        })
    },
    //获取创业者
    getStartUp(param, cb) {
        Vue.http.get('/htvc-api/investors/sort_user', {params: param}).then((response) => {
            cb(response.data)
        }, (error) => {
            console.log(error)
        })
    },
    //发送验证码
    getCode(mobile, cb) {
        Vue.http.get('/htvc-api/checkcode/send?mobile=' + mobile).then((response) => {
           cb(response.data);
        }, (error) => {
            console.log(error)
        })
    },
    //登录
    logon(params, cb) {
        Vue.http.get('/htvc-api/user/login', {params: params}).then(function (data) {
            console.log(data.data)
            cb(data.data)
        }, function (error) {
            console.log(error)
            cb(error)
        })
    },
    //投资人 -- 我的
    investors_me(cb){
        Vue.http.get('/htvc-api/user/invest_user_info').then(function (data) {
            cb(data.data)
        }, function (error) {
            cb(error)
        })
    },
    //第一步 名片扫描
    business_card_scanning(params, cb){
        Vue.http.post('/htvc-api/user/invest_auto_one', params).then(function (data) {
            cb(data.data)
        }, function (error) {
            cb(error)
        })
    },
    //第二步 基本信息
    basic_information(params, cb){
        Vue.http.post('/htvc-api/user/invest_auto_two', params).then(function (data) {
            cb(data.data)
        }, function (error) {
            cb(error)
        })
    },
    //第三步 投资信息
    investment_information(params, cb){
        Vue.http.post('/htvc-api/user/invest_auto_three', params).then(function (data) {
            cb(data.data)
        }, function (error) {
            cb(error)
        })
    },
    //投资人信息修改
    update_invest_user(params, cb){
        Vue.http.post('/htvc-api/user/update_invest_user', params).then(function (data) {
            cb(data.data)
        }, function (error) {
            cb(error)
        })
    },
    //城市列表
    city_list(cb){
        Vue.http.get('/htvc-api/user/city_list').then(function (data) {
            cb(data.data)
        }, function (error) {
            cb(error)
        })
    },
    //第二步 基本信息--关注领域
    query_data_fields(cb){
        Vue.http.get('/htvc-api/data_dict/query_data_fields?type=field').then(function (data) {
            cb(data.data)
        }, function (error) {
            cb(error)
        })
    },
    //项目列表
    project_invest_list(params, cb){
        Vue.http.post('/htvc-api/project/invest_list', params).then(function (data) {
            cb(data.data)
        }, function (error) {
            cb(error)
        })
    },
    //项目详情
    invest_project_info(params, cb){
        Vue.http.get('/htvc-api/project/invest_project_info', {params: params}).then(function (data) {
            cb(data.data)
        }, function (error) {
            cb(error)
        })
    },
    //商业计划书
    project_bp_list(params, cb){
        Vue.http.get('/htvc-api/project/project_bp_list', {params: params}).then(function (data) {
            cb(data.data)
        }, function (error) {
            cb(error)
        })
    },
    //投资人-关注的项目
    invest_focus_list(params, cb){
        Vue.http.get('/htvc-api/project/invest_focus_list', {params: params}).then(function (data) {
            cb(data.data)
        }, function (error) {
            cb(error)
        })
    },
    //投资人-等待沟通
    invest_wait_list(params, cb){
        Vue.http.get('/htvc-api/project/invest_wait_list', {params: params}).then(function (data) {
            cb(data.data)
        }, function (error) {
            cb(error)
        })
    },
    //投资人-需要沟通
    invest_must_list(params, cb){
        Vue.http.get('/htvc-api/project/invest_must_list', {params: params}).then(function (data) {
            cb(data.data)
        }, function (error) {
            cb(error)
        })
    },
    //投资人-需要沟通
    user_msg(params, cb){
        Vue.http.get('/htvc-api/message/user_msg', {params: params}).then(function (data) {
            cb(data.data)
        }, function (error) {
            cb(error)
        })
    }


}
