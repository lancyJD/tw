<template>
    <section>
        <ul class="cert-ul">
            <router-link tag="li" to="/business_card_scanning" :class="status>=1?'active':''"><span>第一步</span>名片扫描</router-link>
            <router-link tag="li" to="/basic_information" :class="status>=2?'active':''"><span>第二步</span>基本信息</router-link>
            <router-link tag="li" to="/investment_information" :class="status>=3?'active':''"><span>第三步</span>投资偏好</router-link>
        </ul>
    </section>
</template>

<script>
    import '../../assets/css/investors/Certification.scss'
    export default {
        data () {
            return {
                status: ''
            }
        },

        created () {
            this.status = this.$route.params.status;
        },
        components: {},
        watch: {},
        methods: {}
    };
</script>
