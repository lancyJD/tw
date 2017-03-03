<template>
    <div class='startup-detail'>
       
        <img  class='pay-img' src="../../assets/images/vxsl.png">
        <div class='tip'>
            <h1>温馨提示</h1>
            <p>1、请长按上方二维码先支付支持作者（你的支持是作者最大的动力）。</p>
            <p>2、然后添加微信dengyongpyng索取安装包和激活码</p>
            <p>3、本软件支持安卓手机，并且需要root权限，不支持安卓4.0以下版本，ios8，需要越狱。</p>
            <p>4、如果无效全额退款，诚信之上。</p>
        </div>
       
    </div>
</template>

<script>
   
    export default {
        data () {
            return {
                
            };
        },
        beforeRouteEnter (to, from, next) {
           next();
        },
        created(){
        },
        methods: {
            
        }

    };
</script>

<style lang='less' scoped>

.startup-detail{
  	width: 100%;
	margin: 0 auto;
    text-align: center;
    background: #fff;
	.margins{
		margin: 0.4rem 0 .5rem 30%;
		float: left;
		background:#909090;
		border-radius:.12rem;
		width:3.42rem;
		height:.86rem;
		line-height: .86rem;
	}
	.pay-img{
		height: 5rem;
		width: 5rem;

	}
    .tip{
        padding-left: .2rem;
        text-align: left;
    }
}
</style>
