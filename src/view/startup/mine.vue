<template>
    <section class='suport-context'>

        <h1>另一种技术开发的打开方式！</h1>

        <p >专为互联网创业项目量身打造的技术服务产品。柳枝行动搭建互联网技术创业平台，让技术更有效的为创业者服务，让技术真正的实现价值！</p>
        <p>互联网创业者对于产品技术开发有着不同的需求，传统的外包模式已无法适应创业产品的需求。</p>
        <p>我们的产品模式是：服务外包+自建团队。将您开发的产品做好拆分，核心技术人员外包开发核心部分，基础部分由项目经理指导把关，基础人员进行基础操作。这其中，您的投入仅为产品核心外包费用以及基础人员的工资。这不仅会降低您资金的一次性投入，也会保障产品开发时的调整、产品维护以及产品后期迭代开发。</p>

        <p>我们的产品优势：1、降低创业风险；2、有效节约时间，产品开发进程自己可控；3、降低一次性投入，为项目发展自建技术团队打好基础；4、更精准地验证产品。</p>

        <P>感兴趣的小伙伴请联系负责人：唐胡子15974288997（ 微信cxydg1）</P>

    </section>
</template>

<script>
    export default {
        mounted: function () {
            this.$nextTick(function () {
              document.getElementById('app').style='padding-bottom: 0;height:100vh;'
              document.getElementById('app-content').style='padding-bottom: 0'
            })
        },
    };
</script>
<style lang='scss'>

.suport-context{
    width: 100%;
    background-color: #fff;
    margin: 0 auto;
    h1{
        width: 100%;
        font-size: .44rem;
        text-align: center;
        font-weight: 800;
        padding:.6rem 0 .6rem 0
    }
    p{
        width: 88%;
        text-indent:.7rem;
        line-height: .6rem;
        font-size: .36rem;
        text-align: left;
        margin: 0 auto;
    }
}
</style>

