<template>
    <section>
        <div class="ii-box">
            <p>最高投资金额(万元) <span>（必填）</span></p>
            <input type="number" v-model="data.high_amount">
            <p>最低投资金额(万元) <span>（必填）</span></p>
            <input type="number" v-model="data.low_amount">
        </div>
        <div class="ii-box">
            <p>投资案例</p>
            <textarea placeholder="填写案例名称，多个请用空格隔开" v-model="data.case_demo"></textarea>
        </div>
        <button class="next-btn" @click="save_data">下一步</button>
    </section>
</template>

<script>
    import api from '../../api/api'
    import '../../assets/css/investors/Certification.scss'
    import {mapGetters, mapActions, mapMutations} from 'vuex'
    export default {
        data () {
            return {
                data: {
                    high_amount: '',
                    low_amount: '',
                    case_demo: '',
                }
            }
        },
        created (){
            this.data.high_amount = this.userInfo.user_info.highAmount ? this.userInfo.user_info.highAmount : "";
            this.data.low_amount = this.userInfo.user_info.lowAmount ? this.userInfo.user_info.lowAmount : "";
            this.data.case_demo = this.userInfo.user_info.caseDemo ? this.userInfo.user_info.caseDemo : "";
        },
        computed: mapGetters({
            userInfo: 'userInfo',
            startUpList: 'startUpList'
        }),
        methods: {
            //user/invest_auto_three?high_amount=1000000&low_amount=100000&case_demo=%E6%94%AF%E4%BB%98%E5%AE%9D%20%E6%B7%98%E5%AE%9D%20%E6%A1%88%E4%BE%8B
            save_data(){
                let This = this;
                if (This.data.high_amount == '') {
                    Vue.info('请填写最高投资金额');
                    return
                }
                if (This.data.low_amount == '') {
                    Vue.info('请填写最低投资金额');
                    return
                }
                if (This.data.case_demo == '') {
                    Vue.info('请填写投资案例');
                    return
                }
                api.investment_information(This.data, function (data) {
                    if (data.ret == 0) {
                        Vue.info('保存成功', function () {
                            This.$router.push(`/investors_ok`);
                        });
                    }
                })
            }
        },
        watch: {
            'data.low_amount': function (val) {
                let This = this;
                if (val > this.data.high_amount) {
                    Vue.info("最低投资金额不能大于最高投资金额", function () {
                        This.data.low_amount = '';
                    });
                }
            }
        }
    };
</script>
