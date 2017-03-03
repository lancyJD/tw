<template>
    <div class='message-ct'>
        <section>
            <head-nav-menu :menus='menus' v-on:gettype='gettype'></head-nav-menu>
        </section>
        <section class='startup-list'>
             <loadmore  :bottom-method="loadBottom" :topDropText='topLoadingText' :bottom-all-loaded="allLoaded" :auto-fill='false' ref="loadmore">
                <div  v-for='item in datas.list' @click.stop='detail(item.userId, $event)' class='flex-row-mess'>
                    <img :src="item.headImg">
                    <div class='mess-row1-right'>
                        <div class='mess-row1'>
                            <span>{{item.name}}</span>
                            <div v-show='type==0' class='g-botton margins1' @click.self='chat(item, $event)' :class="{'hadChat': item.status != 4}">申请沟通</div>

                            <div v-show='type==1' class='g-botton margins1' @click.self='chat(item, $event)' :class="{'hadChat': item.status != 4}">申请沟通</div>

                            <div v-show='type==2' class='g-botton margins1'  @click.self='chat(item, $event)' :class="{'hadChat': item.status != 3}">同意</div>
                        </div>
                        <div class='mess-row2'>
                            <span>{{item.companyName}}  |  {{item.job}}</span>
                            <div v-show='type == 2' class='g-botton margins1 pass' 
                            @click.self='agree(item, 2, $event)' :class="{'hadChat': item.status != 3}">不同意</div>
                        </div>
                    </div>
                </div>
            </loadmore>
            <div v-show='datas && datas.list.length < 1'>
                <no-data></no-data>
            </div>
        </section>
    </div>
</template>
<script>
    import HeadNavMenu from '../../components/head-nav-menu.vue'
    import NoData from '../../components/no-data.vue'
    import api from '../../api/api'
    import { Loadmore } from 'mint-ui'
    import { mapGetters, mapActions, mapMutations  } from 'vuex'
    export default {
        data() {
            return {
                menus: [
                    {
                        name: '',
                        isOn: true,
                        type: 0
                    },
                    {
                        name: '',
                        isOn: false,
                        type: 1
                    },
                    {
                        name: '需要沟通',
                        isOn: false,
                        type: 2
                    }
                ],
                type: null,
                datas: {
                    list:[]
                },
                hadChat: false,
                agreeClick: false,
                allLoaded: false,
                param: {
                    pageNo: 1,
                    pageSize: 10
                }
            }
        },
        computed: mapGetters({
            logonType: 'type',
            userInfo: 'userInfo'
        }),
        created(){
            let This = this;
            let type = This.logonType;
            if (type == 1) {
                This.menus[0].name = '谁看过我';
                This.menus[1].name = '谁关注我';
            } else {
                This.menus[0].name = '关注的项目';
                This.menus[1].name = '等待沟通';
            }
            let param ={}
            param.type = 0
            this.type = 0
            this.gettype(0);
        },
        components: {
            HeadNavMenu,
            NoData,
            Loadmore
        },
        methods: {
            gettype(type, isLoadMore){
                this.type = type
                let self = this
                this.param.type = type
                if(this.type == 2) {
                    api.needChatList(this.param, function(data){
                        if(!!!isLoadMore) {
                            self.datas = data.data
                        } else {
                            self.datas.list = self.datas.concat(data.data.list);
                        }
                        if(self.datas.pageCount == self.param.pageNo) {
                            self.allLoaded = true;
                        }
                    })
                } else {
                    api.getCheckOut(this.param, function(data){
                        if(!!!isLoadMore) {
                            self.datas.list = data.data.list
                        } else {
                            self.datas.list = self.datas.concat(data.data.list);
                        }
                        if(data.data.pageCount == data.data.pageNo) {
                            self.allLoaded = true;
                        }
                    });
                }

            },
            detail(userId, e) {
                e.stopPropagation()
                if(!this.userInfo.isLogon) return
                this.$router.push({path: '/invesit_detail/'+ userId});
            },
            chat(item, e) {
                e.stopPropagation()
                let userId = item.userId
                if((this.type == 0 || this.type == 1) && item.status != 4 ) {
                    return
                } else if(this.type == 2 && item.status != 3 ) {
                    return
                }
                if(!this.hadChat) {
                    //如果是需要沟通则是同意沟通
                    if(this.type == 2) {
                        this.agree(item, 1, e)
                    } else {
                        // item.status = 2;
                        //申请沟通
                        let param = {whoId: userId, status:3}
                        api.applyExchange(param, function(data){
                            if(data.ret == 0 ) {
                                e.target.style='background-color:#c7c7c7;'
                                Vue.tip()
                            }
                        });
                    }
                }
            },
            agree(item, status, e) {
                e.stopPropagation()
                let self = this
                let userId = item.userId
                if(item.status != 3) {
                    return
                } 
                item.status = 2;
                // status = status || 2
                let param = {whoId: userId, status:status}
                api.isAgreeChat(param, function(data){
                    e.target.style='background-color:#c7c7c7;'
                }) 
                this.agreeClick = true
            },
            // loadTop() {
            //     let self = this
            //     if(self.startUpList.pageNum == self.startUpList.pageNo) {
            //         this.topPullText =  '没有跟多数据了';
            //         self.$refs.loadmore.onTopLoaded();
            //     } else {
            //         self.param.pageNo += 1
            //         gettype(self.type);
            //     }
            // },
            loadBottom() {
                let self = this
                if(self.datas.pageNum == self.datas.pageNo) {
                    this.allLoaded =  true;
                } else {
                    self.param.pageNo = Number( self.param.pageNo) + 1
                    gettype(self.type, true);
                }
                self.$refs.loadmore.onTopLoaded();
            }
        }


    }
</script>
<style lang='scss' scoped>
.message-ct {
        width: 100%;
        /*font-size: .6rem;*/
        color: #d5d5d5;
    .startup-list{
        clear: both;
        padding-top: .94rem;
        padding-bottom: 18%;
    }
    .hadChat{
        background-color:#c7c7c7;
    }
    .flex-row-mess {
        width: 95%;
        margin: 0 auto;
        margin-top: .12rem;
        background-color: #fff;
        border-radius: .12rem;
        height: 1.46rem;
        font-size: .24rem;
        color: #666;
    img {
        float: left;
        margin: .16rem 0 0 .18rem;
        width: 1.18rem;
        height: 1.18rem;
        border-radius: 50%;
    }
    .mess-row1-right {
        float: left;
        width: 77%;
        margin-left: .26rem;
    span {
        font-size: .30rem;
    }
    }
    .mess-row1 {
        float: left;
        width: 95%;
        height: .7rem;
        line-height: .8rem;
    }
    .mess-row2 {
        float: left;
        width: 95%;
        height: .7rem;
        line-height: .5rem;
    span {
        font-size: .24rem;
    }
    }
    .margins1 {
        font-size: .24rem;
        float: right;
        width: 1.4rem;
        height: .5rem;
        line-height: .5rem;
        border-radius: .12rem;
        margin-top: .12rem;
    &
    .pass {
        background-color: #cba653;
        color: #fff;
    }
    }
    }

    }
</style>