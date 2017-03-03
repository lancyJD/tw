<template>
    <section>
        <div class="top-box">
           <!--  <div class="check-exchange" v-if="data.projectInfo.ueStatus==0">申请沟通</div>
            <div class="check-exchange n" v-else-if="data.projectInfo.ueStatus==1">已同意</div>
            <div class="check-exchange n" v-else-if="data.projectInfo.ueStatus==2">不同意</div>
            <div class="check-exchange n" v-else-if="data.projectInfo.ueStatus==3">未处理</div> -->
            <div class="img">
                <img :src="data.projectInfo.projectLogo" alt="">
                <!-- <span v-if="fouceType">未关注</span>
                <span v-else>已关注</span> -->
            </div>
            <h2>{{data.projectInfo.projectName}}</h2>
            <p>{{data.projectInfo.projectTip}}</p>
            <p>
                <span>{{data.projectInfo.hopeAmount}}万人民币</span>
                <span>股权稀释{{data.projectInfo.stock}}%</span>
                <span>{{data.projectInfo.userInfo.city}}</span>
            </p>
            <p>
                <small v-for="f in field">{{f}}</small>
            </p>
        </div>
        <div class="pd-box">
            <h2>项目简介</h2>
            <p>{{data.projectInfo.projectBrief}}</p>
            <div class="div">
                <h2>APP名称 <span>{{data.projectInfo.app}}</span></h2>
                <h2>微信公众号 <span>{{data.projectInfo.weinxinPublicAccount}}</span></h2>
            </div>
        </div>
        <div class="pd-box tt" @click="to_business_plan">
            <h1>商业计划书</h1>
            <i></i>
        </div>
        <div class="pd-box tt" @click="to_project_schedule">
            <h1>项目进度</h1>
            <i></i>
        </div>
        <div class="pd-box">
            <h2 class="h2">团队情况</h2>
            <div class="pro-box">
                <div :class="['box-title',{'on':box_con1}]" @click="check_box_con(1)"><span>项目负责人</span> {{data.projectInfo.userInfo.job}}</div>
                <div :class="['box-con',{'on':box_con1}]">
                    <p><span>姓名：{{data.projectInfo.userInfo.name}}</span><span>性别：{{data.projectInfo.userInfo.sex}}</span></p>
                    <p><span>学历：{{data.projectInfo.userInfo.education}}</span><span>年龄：{{data.projectInfo.userInfo.age}}</span></p>
                    <p><span>专业：{{data.projectInfo.userInfo.major}}</span><span>婚姻：{{data.projectInfo.userInfo.marry}}</span></p>
                    <p>时间：{{data.projectInfo.regDate | moment('YYYY-MM-DD')}}</p>
                    <p>公司／项目：{{data.projectInfo.companyName}}</p>
                    <p>职位：{{data.projectInfo.userInfo.job}}</p>
                </div>
            </div>
            <div class="pro-box">
                <div :class="['box-title',{'on':box_con2}]" @click="check_box_con(2)"><span>团队其他成员</span></div>
                <div :class="['box-con',{'on':box_con2}]">
                    <p>{{data.projectInfo.teamBrief}}</p>
                </div>
            </div>
            <div class="pro-box">
                <div :class="['box-title',{'on':box_con3}]" @click="check_box_con(3)">公司简介</div>
                <div :class="['box-con',{'on':box_con3}]">
                    <div class="top"><span>公司名称</span>{{data.projectInfo.companyName}}</div>
                    <div class="top"><span>注册时间</span>{{data.projectInfo.regDate | moment('YYYY-MM-DD')}}</div>
                    <div class="top"><span>公司网址</span>{{data.projectInfo.url}}</div>
                </div>
            </div>
            <!--<ul>
                <li class="active">
                    <div class="title"><span>{{data.projectInfo.userInfo.name}}</span>{{data.projectInfo.userInfo.job}}
                    </div>
                    <div class="zw">
                        <div class="row" v-for="item in data.work_history">
                            <span class="s1">{{item.beginDate | moment('YYYY-MM')}}~{{item.endDate | moment('YYYY-MM')}}</span>
                            <span class="s1">{{item.company}}</span>
                            <span class="s2">{{item.job}}</span>
                        </div>
                    </div>
                </li>
            </ul>-->
        </div>
        <!--<div class="pd-box tt">
            <h1>BP资料</h1>
            <a :href="data.bpFile.bpUrl">{{data.bpFile.bpFilename}}</a>
        </div>-->

        <div class="pd-box tt" @click="to_self_common">
            <h1>项目自评</h1>
            <span>查看</span>
        </div>

       <!--  <div class="pro-btn">
            <button type="button" class="active mr" v-if="fouceType" @click="add_relation_project(1)">关注</button>
            <button type="button" class="mr" v-else>已关注</button>
            <button type="button" class="active" @click="apply_exchange(data)">申请沟通</button>
        </div> -->
    </section>
</template>

<script>
    import api from '../../api/api'
    import '../../assets/css/investors/Project.scss'
    export default {
        data () {
            return {
                data: {
                    projectInfo: {
                        userInfo: {}
                    },
                    project_detail: {
                        records: []
                    },
                    bpFile: {},
                    records: {},
                    work_history: []
                },
                field: [],
                common1: '',
                common2: '',
                common3: '',
                common4: '',
                common5: '',
                common6: '',
                common7: '',
                fouceType: false,
                box_con1: false,
                box_con2: false,
                box_con3: false
            }
        },

        created () {
            let This = this;
            let projectId = {projectId: This.$route.params.id};
            api.invest_project_info(projectId, function (data) {
                This.data = data.data;
                let field = data.data.projectInfo.field;
                let proId = data.data.projectInfo.id;
                This.field = field.split('#');
                if (data.data.projectInfo.fouceType == 0) {
                    This.fouceType = true
                }
                This.common1 = data.data.projectInfo.projectSelfCommon1;
                This.common2 = data.data.projectInfo.projectSelfCommon2;
                This.common3 = data.data.projectInfo.projectSelfCommon3;
                This.common4 = data.data.projectInfo.projectSelfCommon4;
                This.common5 = data.data.projectInfo.projectSelfCommon5;
                This.common6 = data.data.projectInfo.projectSelfCommon6;
                This.common7 = data.data.projectInfo.projectSelfCommon7;

                This.$nextTick(function () {
                    let params = {type: 0, projectId: proId};
                    Vue.http.get('/htvc-api/relation/add_relation_project', {params: params}).then(function () {
                    }, function (error) {
                        Vue.info(error)
                    })
                })
            });

        },
        components: {},
        watch: {},
        computed: {},
        methods: {
            check_box_con(type){
                if (type == "1") {
                    this.box_con1 = !this.box_con1
                }
                if (type == "2") {
                    this.box_con2 = !this.box_con2
                }
                if (type == "3") {
                    this.box_con3 = !this.box_con3
                }
            },
            to_self_common(){
                this.$router.push(`/project_self_common/${this.common1}/${this.common2}/${this.common3}/${this.common4}/${this.common5}/${this.common6}/${this.common7}`)
            },
            to_project_schedule(){
                this.$router.push(`/project_schedule/${this.$route.params.id}`)
            },
            to_business_plan(){
                this.$router.push(`/business_plan/${this.$route.params.id}`)
            },
            //关注
            add_relation_project(type){
                let This = this;
                let params = {
                    projectId: This.$route.params.id,
                    type: type
                };
                Vue.http.get('/htvc-api/relation/add_relation_project', {params: params}).then(function (data) {
                    if (data.data.ret == 0) {
                        Vue.info('关注成功', function () {
                            window.location.reload();
                        });
                    }
                }, function (error) {
                    Vue.info(error)
                })
            },
            //投资人向创业者申请沟通
            apply_exchange(data){
                let whoId = null;
                if (data.projectInfo && data.projectInfo.userInfo.id) {
                    whoId = data.projectInfo.userInfo.id
                } else {
                    return;
                }
                let params = {
                    whoId: whoId
                };
                Vue.http.get('/htvc-api/exchange/apply_exchange', {params: params}).then(function (data) {
                    if (data.data.ret == 0) {
                        Vue.info('已向创业者申请沟通', function () {
                            window.location.reload();
                        });
                    }
                }, function (error) {
                    Vue.info(error);
                })
            }
        }
    };
</script>


