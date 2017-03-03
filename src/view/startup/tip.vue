<template>
	<div class='tip-content'>
		<p>网址</p>
		<input type="text" v-model='url' readonly name="">
		<p @click='copy'  class='url_tip'>请<span>项目负责人</span>前往电脑端填写项目申报资料。</p>
		<div @click='helpSelf' class='g-botton margins5 button-huise'>随便看看</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
	export default{
		data() {
			return{
				url:'http://pc.liuzhixingdong.com'
			}
		},
		computed: mapGetters({
	        type: 'type'
    	}),
		methods:{
			copy(e){
				let self = this
				if(!!!e.clipboardData || !!!e.clipboardData.setData){
					Vue.info('电脑端输入网址填写申报资料，请由项目负责人填报。')
					return 
				}
				console.log(e)
				var save = function(e){
			        e.clipboardData.setData('text/plain', self.url);
			        e.preventDefault();
			    }
			    document.addEventListener('copy', save);
			    document.execCommand('copy');
			    document.removeEventListener('copy',save);
				Vue.info('复制成功')
			},
			helpSelf() {//随便看看
		    	let self = this
		    	let userInfo = {}
				userInfo.type = self.type
				userInfo.isLogon = false
		    	self.$store.commit('USER_INFO', userInfo)
		    	let path =  null
		    	if(this.type == 1) {
		    		path ='/home'
		    	} else {
		    		path ='/project_list'
		    	}
		    	self.$router.push({path: path, params: { type: self.type }});
	    	}
		}
	}
</script>
<style lang='scss'>
	.tip-content{
		margin: 0 auto;
		text-align: center;
		.url_tip{
			margin: 0 auto;
			text-align: center;
			font-size: .3rem;
			width: 90%;
			margin-top: .2rem;
			span{
				font-size: .38rem;
				font-weight: 800;
			}
		}
		p{
			width: 100%;
			font-size:18px;
			color:#6f6f6f;
			letter-spacing:0px;
			text-align:center;
			margin-top: 1.26rem;
		}
		input {
			background:#d8d8d8;
			border-radius:3px;
			width:90%;
			height:1.2rem;
			border: 0;
			text-align: center;
			font-size: .45rem;
			color:#ff0000;
			margin-top: .34rem;
		}
		.button-url{
			background:#53cbbd;
			border-radius:.12rem;
			height:.86rem;
			line-height: .86rem;
			margin-top: .7rem;
			width:90%;
		}
		.button-huise{
			/*background:#d8d8d8;*/
			border-radius:.12rem;
			height:.86rem;
			line-height: .86rem;
			margin-top: 2.48rem;
			width:90%;
			color :#fff;
		}
	}
</style>