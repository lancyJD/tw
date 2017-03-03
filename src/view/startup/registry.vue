<template>
    <div class='c-registry'>
        <section>
            <div class='head'>
                <img src="../../assets/images/defaulthead.png">
            </div>
        </section>
        <section>
            <div class='input-info'>
                <div class='icon phone'></div>
                <input class='input' type='number' v-model="mobile" placeholder="请输入手机号码">
            </div>
            <div class='input-info'>
                <div class='icon code'></div>
                <input class='phone-code' type='number' v-model="code" placeholder="请输入验证码">
                <div @click='getToken' class='g-botton get-code' :class="[{'bg get-code-font': isGet}, showText?'cxhq12':'']">{{text}}</div>
            </div>
            <div @click='logon' class='g-botton margins'>登录</div>
            <!-- <router-link :to="{ name: 'registry', params: { type: 1 }}">
            </router-link> -->

            <div @click='helpSelf' class='g-botton marginsL'>随便看看</div>
        </section>
    </div>

</template>

<script>
    import '../../assets/css/startup/registry.scss'
    import api from '../../api/api'
    import {mapGetters, mapActions, mapMutations} from 'vuex'
    export default {

//        name: 'registry',
        data () {
            return {
                type: null,//登录类型  1：创业  2：投资
                isGet: false,
                isDisable: true,
                cuntdown: 60,
                mobile: '',
                code: '',
                text: '获取',
                path: null,
                showText: false

            };
        },
        beforeRouteEnter (to, from, next) {
            next(function (vm) {
                let type = vm.type = to.params.type;
                if (vm.type == 1) {
                    vm.path = '/home'
                } else {
                    vm.path = '/project_list'
                }
                vm.get_index_nav(type);
                vm.$store.commit('SET_TYPE', type);
            })
        },
        mounted: function () {
            this.$nextTick(function () {

            })
        },
        created() {

        },
        methods: {
            ...mapActions([
                'get_index_nav',
                'set_user_info'
            ]),
            helpSelf() {//随便看看
                let self = this
                let userInfo = {}
                userInfo.type = self.type
                userInfo.isLogon = false
                self.$store.commit('USER_INFO', userInfo)

                self.$router.push({path: self.path, params: {type: self.type}});


            },
            logon() {
                let self = this;
                if (!this.checkForm()) {
                    return;
                }
                let param = {userType: self.type, mobile: self.mobile, checkCode: self.code};

                api.logon(param, function (data) {

                    if (data.ret != -1) {
                        self.type = data.data.type
                        window.localStorage.setItem("phone_no", self.mobile)
                        self.setUserInfo(data.data);
                        if (data.data.status == 0 && data.data.type == 1) {
                            self.$router.push({path: '/tip', params: {type: self.type}});
                        } else if(data.data.status == 1 && data.data.type == 1){
                           
                            self.get_index_nav(self.type);
                        	self.$router.push({path: self.path, params: {type: self.type}});
                        } else if(data.data.type == 2){
                            self.path = data.data.type == 2 ? '/project_list' : '/home'
                            if(data.data.status < 3){
                                self.$router.push(`/certification/${data.data.status}`);
                            }else {
                            	self.get_index_nav(self.type);
                                self.$router.push({path: self.path, params: {type: self.type}});
                            }
                        } else {
                            self.get_index_nav(self.type);
                            self.$router.push({path: self.path, params: {type: self.type}});
                        }
                    }
                })
            },
            checkForm(type){

                let r = /^(^1\d{10})$|^((^0\d{3}|^0\d{2})(-)(\d{7,8})|(^0\d{3}|^0\d{2})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/
                if (!!!this.mobile) {
                    Vue.info('请填写手机号码');
                    return false
                }
                if (!(/^1[123456789]\d{9}$/.test(this.mobile))) {
                    Vue.info('请填写正确的手机号码');
                    return false
                }
                if (type) {
                    if (!(/^\d{4}$/.test(this.code))) {
                        Vue.info('请输入4位数字验证码')
                        return false
                    }
                }
                return true
            },
            getToken: function (e) {
                if (!this.checkForm()) {
                    return;
                }
                var self = this;
                if (!self.isDisable) {
                    return
                }
                api.getCode(self.mobile, function (data) {
                    if (data.ret != -1) {
                        self.cuntdown = data.data.nextSendSecond
                        self.isGet = !self.isGet
                        self.isDisable = false;
                        self.getCode(e);
                    }

                });
            },
            getCode: function (e) {
                var self = this
                self.text = (self.cuntdown) + 's';
                if (self.cuntdown <= 0) {
                    self.text = '重新获取';
                    self.isGet = !self.isGet
                    this.isDisable = true;
                    this.showText = true;
                    // e.target.style = 'font-size:.24rem'
                    return;
                }
                self.cuntdown--;
                setTimeout(function () {
                    self.getCode(e)
                }, 1000);
            },
            setUserInfo(item){
              let self = this
              let userInfo = {};
              userInfo.type = self.type;
              userInfo.isLogon = true;
              userInfo.user_info = item.user_info
              self.$store.commit('USER_INFO', userInfo);
            },
        }
    };
</script>

<style lang='scss' scoped>
.get-code-font{
	font-size:.36rem
}
.cxhq12{
    font-size:.24rem !important;
}
</style>