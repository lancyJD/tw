<template>
	<div class='home-container'>
		
		<section>
			<div class='item-list'>
				<div @click='goPay(1)' class='title'>
					VX红包扫雷踩尾>>>
				</div>
				<div @click='goPay(2)' class='title'>
					VX红包秒挂>>>
				</div>
				<div @click='goPay(3)' class='title'>
					六合内幕>>>
				</div>
				<div @click='goPay(4)' class='title'>
					QQ强开视频>>>
				</div>
				<div @click='goPay(4)' class='title'>
					皮皮麻将全图>>>
				</div>
				<div @click='goPay(5)' class='title'>
					红色地带>>>
				</div>
				<div @click='goPay(5)' class='title'>
					AVnight>>>
				</div>
				<div @click='goPay(6)' class='title'>
					更多>>>
				</div>
			</div>
		</section>
	 	
	 	
	</div>
</template>

<script>
import { mapGetters, mapActions, mapMutations  } from 'vuex'
import IndexNav from '../components/index-nav'
export default {
  	data () {
    	return {
	    	
    	}
  	},
  	mounted: function () {
	},

  	created () {
  		
  	},
	
  	methods: {
      	goPay(id) {
      		this.$router.push({name:'invesitDetail'})
      	}
	}
};
</script>

<style lang='scss' scoped>
.home-container{
	width:100%;
	/*font-size: .6rem;*/
	/*padding-bottom: 18%;*/
	min-height: 100vh;
	.startup-list{
		clear: both;
		padding-top: .34rem;
		padding-bottom: 18%;
	}
	.item-list{
		height: 1rem;
		width: 100%;
		
		margin: 0 auto;
		text-align: center;
		line-height: 1rem;
		.title{
			margin-top: .02rem;
			font-size: .42rem;
			color: #ff2424;
			background: #fff;
		}
		p{

		}
	}
	
	

}
</style>