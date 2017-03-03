<template>
    <section class="invest-msg">
        <ul class="top-nav">
            <li v-for="(li,index) in topNav" :class="index==top_nav_index?'on':''" @click.stop="check_top_nav(index)">{{li}}</li>
        </ul>
        <ul class="msg-ul">
            <li v-for="item in msg_list">
                <router-link :to="'project_details/'+ item.id">
                    <img :src="item.projectLogo" alt="logo">
                    <div>
                        <h2>{{item.projectName}} <span>({{item.userInfo.city}})</span></h2>
                        <p>{{item.projectTip}}</p>
                        <div>
                            <small v-for="f in item.field.split(',')">{{f}}</small>
                        </div>
                    </div>
                </router-link>
                <button type="button" class="y" v-if="top_nav_index==0&&item.ueStatus==0" @click="apply_exchange(item.userInfo.id)">申请沟通</button>
                <button type="button" class="y x" v-if="top_nav_index==0&&item.ueStatus==1||top_nav_index==2&&item.ueStatus==1">已同意</button>
                <button type="button" class="y x" v-if="top_nav_index==0&&item.ueStatus==2||top_nav_index==2&&item.ueStatus==2">不同意</button>
                <button type="button" class="y x" v-if="top_nav_index==0&&item.ueStatus==3">等待处理</button>
                <button type="button" class="y x" v-if="top_nav_index==1">{{ueStatus(item.ueStatus)}}</button>
                <button type="button" class="y" v-if="top_nav_index==2&&item.ueStatus==3" @click="post_exchange_result(item.userInfo.id,1)">{{item.exchangeStatus}}同意</button>
                <button type="button" class="n" v-if="top_nav_index==2&&item.ueStatus==3" @click="post_exchange_result(item.userInfo.id,2)">{{item.exchangeStatus}}不同意</button>
            </li>
        </ul>
        <div v-show='hasList'>
            <no-data></no-data>
        </div>
        <div v-show="isLoading" class="loading"></div>
        <p id="end_msg" :class="['end-msg',{'on':showEnd}]">已经到底</p>
    </section>
</template>
<script>
    import '../../assets/css/investors/InvestMessageInfo.scss'
    import NoData from '../../components/no-data.vue'
    import api from '../../api/api'
    export default {
        data() {
            return {
                data: {
                    pageIndex: 1,
                    pageSize: 10
                },
                topNav: ['关注的项目', '等待沟通', '需要沟通'],
                top_nav_index: 0,
                msg_list: [],
                pages: '',
                has_data: false,
                hasList: false,
                isScroll: true,
                isLoading: false,
                showEnd: false,
            }
        },
        created(){
            this.invest_focus();
        },
        components: {NoData},
        methods: {
            // 提交是否同意沟通的请求:  /exchange/post_exchange_result?whoId=xxx&status=1  //status 1: 同意，2:不同意  whoId＝userid
            // 关注的项目：/project/invest_focus_list?pageIndex=1&pageSize=10
            // 等待沟通：/project/invest_wait_list?projectId=1&pageIndex=1&pageSize=10
            // 需要沟通：/project/invest_must_list?projectId=1&pageIndex=1&pageSize=10
            check_top_nav(e){
                let This = this;
                This.top_nav_index = e;
                This.data.pageIndex = 1;
                This.isScroll = true;
                This.showEnd = false;
                if (e == 0) {
                    This.invest_focus();
                } else if (e == 1) {
                    This.invest_wait_list()
                } else if (e == 2) {
                    This.invest_must_list()
                }
            },
            invest_focus(){
                let This = this;
                This.msg_list = [];
                api.invest_focus_list(This.data, function (data) {
                    if (data.ret == 0) {
                        if(data.data){
                            This.msg_list = data.data.records;
                            This.pages = data.data.pages;
                        }
                    }
                });
                This.scroll_more({
                    lastDonId: 'end_msg',
                    call_back: function () {
                        This.data.pageIndex += 1;
                        let res = {
                            pageIndex: This.data.pageIndex,
                            pageSize: This.data.pageSize,
                        };
                        api.invest_focus_list(res, function (data) {
                            if (data.ret == 0) {
                                This.scroll_more_data(data);
                            }
                        });
                    }
                })
            },
            //等待沟通
            invest_wait_list(){
                let This = this;
                This.msg_list = [];
                api.invest_wait_list(This.data, function (data) {
                    if (data.ret == 0) {
                        if(data.data){
                            This.msg_list = data.data.records;
                            This.pages = data.data.pages;
                        }
                    }
                });
                This.scroll_more({
                    lastDonId: 'end_msg',
                    call_back: function () {
                        This.data.pageIndex += 1;
                        let res = {
                            pageIndex: This.data.pageIndex,
                            pageSize: This.data.pageSize,
                        };
                        api.invest_wait_list(res, function (data) {
                            if (data.ret == 0) {
                                This.scroll_more_data(data);
                            }
                        });
                    }
                })
            },
            //需要沟通
            invest_must_list(){
                let This = this;
                This.msg_list = [];
                api.invest_must_list(This.data, function (data) {
                    if (data.ret == 0) {
                        if(data.data){
                            This.msg_list = data.data.project_list;
                            This.pages = data.data.pages;
                        }
                    }
                });
                This.scroll_more({
                    lastDonId: 'end_msg',
                    call_back: function () {
                        This.data.pageIndex += 1;
                        let res = {
                            pageIndex: This.data.pageIndex,
                            pageSize: This.data.pageSize,
                        };
                        api.invest_must_list(res, function (data) {
                            if (data.ret == 0) {
                                This.scroll_more_data(data);
                            }
                        });
                    }
                })
            },
            //投资人向创业者申请沟通
            apply_exchange(whoId){
                let This = this;
                let params = {
                    whoId: whoId
                };
                Vue.http.get('/htvc-api/exchange/apply_exchange', {params: params}).then(function (data) {
                    if (data.data.ret == 0) {
                        Vue.info('已向创业者申请沟通', function () {
                            This.invest_focus();
                        });
                    }
                }, function (error) {
                    Vue.info(error);
                })
            },

            //提交是否同意沟通的请求
            post_exchange_result(whoId, status){
                let This = this;
                let params = {
                    whoId: whoId,
                    status: status
                };
                if (status == 2 && confirm('确认不同意沟通？')) {
                    Vue.http.get('/htvc-api/exchange/post_exchange_result', {params: params}).then(function (data) {
                        if (data.data.ret == 0) {
                            This.invest_must_list();
                        }
                    }, function (error) {
                        Vue.info(error)
                    })
                } else if (status == 1) {
                    Vue.http.get('/htvc-api/exchange/post_exchange_result', {params: params}).then(function (data) {
                        if (data.data.ret == 0) {
                            Vue.info('已同意沟通', function () {
                                This.invest_must_list();
                            });
                        }
                    }, function (error) {
                        Vue.info(error)
                    })
                }

            },
            ueStatus(status){
                switch (status) {
                    case '0' :
                        return "未申请";
                    case '1' :
                        return "已同意";
                    case '2' :
                        return "不同意";
                    case '3' :
                        return "未处理";
                    default :
                        return "未知";
                }
            },
            //下拉加载更多
            scroll_more(obj){
                let This = this;
                Vue.nextTick(function () {
                    document.addEventListener('scroll', winScroll, false);
                    let lastDomId = document.getElementById(obj.lastDonId);

                    function winScroll() {
                        if ((lastDomId.offsetTop - window.screen.height) - document.body.scrollTop < 30) {
                            if (This.isScroll) {
                                obj.call_back();
                                This.isScroll = false;
                            }
                        }
                    }
                })
            },
            //加载更多后统一使用的方法
            scroll_more_data(data){
                let This = this;
                if (This.data.pageIndex <= This.pages) {
                    This.isScroll = true;
                    This.msg_list = (This.msg_list).concat(data.data.records);
                } else {
                    This.showEnd = true;
                }
                This.isLoading = false;
            }
        }
    }
</script>

