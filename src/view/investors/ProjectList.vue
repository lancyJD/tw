<template>
    <section>
        <!--<head-nav :menus='menus'></head-nav>-->
        <div class="top-header">
            <ul class="top">
                <li v-for="(item,index) in topNav" :class="index==hasOn?'on':''" @click.self="check_top_nav(index)">{{item}}</li>
            </ul>
            <div class="box" v-show="topLiOn_0||topLiOn_1||topLiOn_2" @click.self="hide_box">
                <ul v-show="topLiOn_0">
                    <li v-for="item in recommendList">
                        <input type="radio" :id="item.id" :value="item.value" v-model="checkRecommendList" @change="check_recommend">
                        <label :for="item.id">{{item.name}}</label>
                    </li>
                </ul>
                <ul v-show="topLiOn_1">
                    <li><input type="radio" id="id00" value="全国" v-model="checkCity" @change="check_city"> <label for="id00">全国</label></li>
                    <li v-for="item in cityList">
                        <input type="radio" :id="'id'+item" :value="item" v-model="checkCity" @change="check_city">
                        <label :for="'id'+item">{{item}}</label>
                    </li>
                </ul>
                <ul v-show="topLiOn_2">
                    <li v-for="item in fieldList">
                        <input type="checkbox" :id="'f'+item.id" :value="item.dictName" v-model="checkFieldList" @change="check_field">
                        <label :for="'f'+item.id">{{item.dictName}}</label>
                    </li>
                </ul>
            </div>
        </div>
        <ul class="project-ul">
            <li v-for="item in project_list">
                <div class="a" v-if="isLogon" @click="check_project_details(item.id)">
                    <img :src="item.projectLogo" :alt="item.projectName">
                    <div>
                        <h2>{{item.projectName}}</h2>
                        <p>{{item.projectTip}}</p>
                        <p>
                            <span v-for="f in item.field.split('/')">{{f}}</span>
                        </p>
                        <small class="sm1">{{item.companyName}}</small>
                        <small class="sm2">{{item.hopeAmount}}万</small>
                        <small class="sm3">股权稀释{{item.stock}}%</small>
                    </div>
                </div>
                <div class="a" v-else @click="check_isLogon">
                    <img :src="item.projectLogo" :alt="item.projectName">
                    <div>
                        <h2>{{item.projectName}}</h2>
                        <p>{{item.projectTip}}</p>
                        <p>
                            <span v-for="f in item.field.split('/')">{{f}}</span>
                        </p>
                        <small class="sm1">{{item.companyName}}</small>
                        <small class="sm2">{{item.hopeAmount}}万</small>
                        <small class="sm3">股权稀释{{item.stock}}%</small>
                    </div>
                </div>
                <p class="address">{{item.userInfo.province}}{{item.userInfo.city}}</p>
                <button type="button" v-if="isLogon" @click="check_project_details(item.id)">查看详情</button>
                <button type="button" v-else @click="check_isLogon">查看详情</button>
            </li>
        </ul>
        <div v-if="hasList" class="hasList">暂无数据</div>
        <div v-show="isLoading" class="loading"></div>
        <p id="end_msg" :class="['end-msg',{'on':showEnd}]">已经到底</p>
    </section>
</template>

<script>
    import {mapGetters, mapActions, mapMutations} from 'vuex'
    import api from '../../api/api'
    import '../../assets/css/investors/Project.scss'
    import HeadNav from '../../components/head-nav'
    export default {
        data () {
            return {
                topNav: ['推荐', '城市', '领域'],
                hasOn: 0,
                topLiOn_0: false,
                topLiOn_1: false,
                topLiOn_2: false,
                recommendList: [
                    {name: '推荐', id: 'r1', value: 1},
                    {name: '最新', id: 'r2', value: 2},
                ],
                checkRecommendList: '1',
                cityList: [],
                checkCity: '',//已选地址
                fieldList: [],
                checkFieldList: [],//已选领域
                project_list: [],//项目列表
                pages: '',
                pageSize: 10,
                pageIndex: 1,
                hasList: false,
                isScroll: true,
                isLoading: false,
                showEnd: false,
                isLogon: false, //是否认证
            }
        },

        created () {
            let This = this;
            //关注领域
            api.query_data_fields(function (data) {
                This.fieldList = data.data.records;
            });
            //城市列表
            api.city_list(function (data) {
                This.cityList = data;
            });
            This.project__list(1, '', '');
            if (this.userInfo.user_info == undefined || this.userInfo.user_info == 'undefined') {
                This.isLogon = false;
            } else {
                if (this.userInfo.user_info.investAuth == 0) {
                    This.isLogon = false;
                } else {
                    This.isLogon = true;
                }
            }
        },
        components: {
            HeadNav,
        },
        watch: {},
        computed: mapGetters({
            userInfo: 'userInfo',
            startUpList: 'startUpList'
        }),
        methods: {
            check_isLogon(){
                Vue.info('投资人认证审核中，请耐心等待，谢谢！');
            },
            check_top_nav(index){
                if (index == 0) {
                    this.hasOn = 0;
                    this.topLiOn_0 = true;
                    this.topLiOn_1 = false;
                    this.topLiOn_2 = false;
                } else if (index == 1) {
                    this.hasOn = 1;
                    this.topLiOn_0 = false;
                    this.topLiOn_1 = true;
                    this.topLiOn_2 = false;
                } else {
                    this.hasOn = 2;
                    this.topLiOn_0 = false;
                    this.topLiOn_1 = false;
                    this.topLiOn_2 = true;
                }
            },
            check_field(e){
                this.checkCity = '';
                this.checkRecommendList = '';
                this.pageIndex = 1;
                this.isScroll = true;
                this.showEnd = false;
                this.hasList = false;
                if (this.checkFieldList.length >= 6) {
                    Vue.info('最多只能选5个');
                    e.target.checked = false;
                    this.checkFieldList.pop()
                }
                this.project__list('', '', this.checkFieldList);
            },
            check_city(){
                this.checkRecommendList = '';
                this.checkFieldList = [];
                this.pageIndex = 1;
                this.isScroll = true;
                this.showEnd = false;
                this.hasList = false;
                this.project__list('', this.checkCity, '');
            },
            check_recommend(){
                this.checkCity = '';
                this.checkFieldList = [];
                this.pageIndex = 1;
                this.isScroll = true;
                this.showEnd = false;
                this.hasList = false;
                this.project__list(this.checkRecommendList, '', '');
            },
            hide_box(){
                this.topLiOn_0 = false;
                this.topLiOn_1 = false;
                this.topLiOn_2 = false;
            },
            project__list(recommend, city, fields){
                let This = this;
                let data = {
                    recommend: recommend,
                    city: city,
                    fields: fields,
                    pageIndex: This.pageIndex,
                    pageSize: This.pageSize,
                };
                This.project_list = [];
                api.project_invest_list(data, function (data) {
                    if (data.data.records.length > 0) {
                        This.project_list = data.data.records;
                        This.pages = data.data.pages;
                    } else {
                        This.hasList = true;
                    }
                });

                This.scroll_more({
                    lastDonId: 'end_msg',
                    call_back: function () {
                        This.pageIndex += 1;
                        let res = {
                            recommend: recommend,
                            city: city,
                            fields: fields,
                            pageIndex: This.pageIndex,
                            pageSize: This.pageSize,
                        };
                        api.project_invest_list(res, function (data) {
                            This.scroll_more_data(data);
                        });
                    }
                })

            },
            call_back(recommend, city, fields){
                let This = this;
                This.isLoading = true;
                This.pageIndex += 1;
                let request = {
                    recommend: recommend,
                    city: city,
                    fields: fields,
                    pageIndex: This.pageIndex,
                    pageSize: This.pageSize,
                };
                api.project_invest_list(request, function (data) {
                    This.scroll_more_data(data);
                });
            },
            //查看详情
            check_project_details(id){
                this.$router.push(`/project_details/${id}`);
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
                if (This.pageIndex <= This.pages) {
                    This.isScroll = true;
                    This.project_list = (This.project_list).concat(data.data.records);
                } else {
                    This.showEnd = true;
                }
                This.isLoading = false;
            }
        }
    };
</script>


