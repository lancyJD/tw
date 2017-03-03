<template>
    <section class="edit-info">
        <img :src="data.userInfo.headImg" alt="">
        <ul>
            <li><span>姓名</span><input type="text" v-model="data.userInfo.name" readonly></li>
            <li><span>机构名称</span><input type="text" v-model="data.userInfo.companyName"></li>
            <li>
                <div class="weui-cell weui-cell_select">
                    <div class="weui-cell__hd">
                        <label class="weui-label">职 位</label>
                    </div>
                    <div class="weui-cell__bd">
                        <select class="weui-select" v-model="data.userInfo.job">
                            <option>投资总监</option>
                            <option>投资经理</option>
                            <option>投资合伙人</option>
                        </select>
                    </div>
                </div>
            </li>
            <li><span>Email</span><input type="email" v-model="data.userInfo.email"></li>
            <li>
                <span>所在地点</span>
                <div class="weui-cell weui-cell_select is-select">
                    <div class="weui-cell__bd">
                        <select v-model="province">
                            <option v-for="province in cityData">{{province.name}}</option>
                        </select>
                        <select v-model="city">
                            <option v-for="city in cities">{{city}}</option>
                        </select>
                    </div>
                </div>
            </li>
            <li class="has-row">
                <span>关注领域</span>
                <!--<input type="text" v-model="checkFieldList" @click="show_field" readonly>-->
                <div class="is-field" @click="show_field">
                    <small v-for="item in checkFieldList">{{item}}</small>
                </div>
                <div v-show="isFieldList" class="bg" @click="hied_field"></div>
                <ul v-show="isFieldList" class="field-ul">
                    <li v-for="item in fieldList">
                        <input type="checkbox" :id="'f'+item.id" :value="item.dictName" v-model="checkFieldList" @change="check_field">
                        <label :for="'f'+item.id">{{item.dictName}}</label>
                    </li>
                </ul>
            </li>
            <li><span>最高投资额(万元)</span><input type="text" v-model="data.userInfo.highAmount"></li>
            <li><span>最低投资额(万元)</span><input type="text" v-model="data.userInfo.lowAmount"></li>
            <li class="al">
                <h2>投资案例</h2>
                <textarea placeholder="填写案例名称，多个请用空格隔开" v-model="data.userInfo.caseDemo"></textarea>
            </li>
        </ul>
        <button class="next-btn" @click="update_data">保存</button>
    </section>
</template>

<script>
    import api from '../../api/api'
    import CITY from '../../comm/city.data'
    import '../../assets/css/investors/EditInformation.scss'
    export default {
        data () {
            return {
                data: {
                    name: '',
                    companyName: '',
                    job: '',
                    email: '',
                    field: '',
                    highAmount: '',
                    lowAmount: '',
                    caseDemo: '',
                    userInfo:{}
                },
                province: '',
                city: '',
                cityData: [],
                isFieldList: false,
                fieldList: [],
                checkFieldList: [],//已选领域
            }
        },
        created () {
            let This = this;
            This.cityData = CITY.cityData;
            api.investors_me(function (data) {
                if (data.ret == 0) {
                    This.data = data.data;
                    This.province = data.data.userInfo.province;
                    This.city = data.data.userInfo.city;
                    let FieldList = data.data.userInfo.field;
                    if (FieldList) {
                        This.checkFieldList = FieldList.split("#");
                    } else {
                        This.checkFieldList = [];
                    }
                }
            });

        },
        watch: {
            'data.lowAmount': function (val) {
                let This = this;
                if (val > this.data.highAmount) {
                    Vue.info("最低投资金额不能大于最高投资金额", function () {
                        This.data.lowAmount = '';
                    });
                }
            }
        },
        computed: {
            //省市联动
            cities() {
                let This = this;
                let city = [], selectedProvince = this.$data.province;
                CITY.cityData.forEach(function (d) {
                    if (d.name == selectedProvince) {
                        if (This.city == '') {
                            This.city = d.city[0].name;
                        }
                        for (let c of d.city) {
                            city.push(c.name)
                        }
                    }
                });
                return city;
            }

        },
        methods: {
            show_field(){
                let This = this;
                this.isFieldList = true;
                api.query_data_fields(function (data) {
                    This.fieldList = data.data.records;
                });
            },
            hied_field(){
                this.isFieldList = false;
            },
            update_data(){
                let This = this;
                let field = this.checkFieldList.toString().replace(/,/g, '#');
                let mobileReg = /^1[34578]\d{9}$/;
                let emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
                if (this.data.userInfo.name =='') {
                    Vue.info('姓名必须大于2位');
                    return false;
                }
                if (this.data.userInfo.name.length < 2) {
                    Vue.info('姓名必须大于2位');
                    return false;
                }
                if (!mobileReg.test(this.data.userInfo.mobile)) {
                    Vue.info('请正确输入手机号');
                    return false;
                }
                if (!emailReg.test(this.data.userInfo.email)) {
                    Vue.info('请正确输入邮箱');
                    return false;
                }
                if (this.data.userInfo.companyName.length < 2) {
                    Vue.info('公司名称必须大于2位');
                    return false;
                }
                if (this.data.userInfo.job == '') {
                    Vue.info('请选择职位');
                    return false;
                }
                if (This.province == '' || This.city == '') {
                    Vue.info('请选择常住城市');
                    return
                }
                if (field == '') {
                    Vue.info('请选择关注领域');
                    return
                }
                if (This.data.userInfo.highAmount == '') {
                    Vue.info('请填写最高投资金额');
                    return
                }
                if (This.data.userInfo.lowAmount == '') {
                    Vue.info('请填写最低投资金额');
                    return
                }
                if (This.data.userInfo.caseDemo == '') {
                    Vue.info('请填写投资案例');
                    return
                }
                let data = {
                    userName: this.data.userInfo.name,
                    companyName: this.data.userInfo.companyName,
                    job: this.data.userInfo.job,
                    email: this.data.userInfo.email,
                    province: this.province,
                    city: this.city,
                    field: field,
                    highAmount: this.data.userInfo.highAmount,
                    lowAmount: this.data.userInfo.lowAmount,
                    caseDemo: this.data.userInfo.caseDemo,
                };
                api.update_invest_user(data, function (data) {
                    if (data.ret == 0) {
                        Vue.info(data.msg, function () {
                            This.$router.push('/me');
                        });
                    }
                })
            },
            check_field(e){
                if (this.checkFieldList.length >= 5) {
                    Vue.info('最多只能选5个');
                    e.target.checked = false;
                    this.checkFieldList.pop()
                }
            },
        }
    };
</script>


