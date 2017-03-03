<template>
    <section class="in-ok">
        <img src="../../assets/images/investors-ok.png" alt="">
        <p class="in-ok-p">认证资料已提交</p>
        <p class="in-ok-p1">将在2个工作日内完成审核</p>
        <button class="investors-ok-btn" @click="toNext">随便看看</button>
    </section>
</template>

<script>
    import '../../assets/css/investors/Certification.scss'
    export default {
        data () {
            return {}
        },
        created () {

        },
        components: {},
        watch: {},
        computed: {},
        methods: {
            toNext(){
                this.$router.push(`/project_list`)
            }
        }
    };
</script>
