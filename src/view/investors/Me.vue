<template>
    <section class="me">
        <div class='mine'>
            <div class='row1'>
                <router-link to="/edit_information">编辑资料</router-link>
            </div>
            <div class='row2'>
                <div class='row-img'>
                    <img :src="data.userInfo.headImg">
                    <i></i>
                </div>
                <div class='row-info'>
                    <div class='row-info-head'><span>{{data.userInfo.name}}</span></div>
                    <div class='row-info-intro'>{{data.userInfo.field}}</div>
                </div>

            </div>
            <div></div>
        </div>

        <div class='mine-menu'>
            <ul>
                <router-link tag="li" :to= "{name: 'invesit_detail', params: {id: data.userInfo.id, isInvest: true}}">
                    <img src="../../assets/images/icon-w.png">我的资料
                </router-link>
                <router-link tag="li" to="/system_info">
                    <img src="../../assets/images/icon-msg.png">系统消息
                </router-link>
            </ul>
        </div>
    </section>
</template>
<script>
    import api from '../../api/api'
    import '../../assets/css/investors/Me.scss'
    export default {
        data () {
            return {
                data: {
                    userInfo: {}
                }
            }
        },
        created () {
            let This = this;
            api.investors_me(function (data) {
                if (data.ret == 0) {
                    This.data = data.data;
                }
            })
        },
        components: {},
        watch: {},
        methods: {

        }
    };
</script>
