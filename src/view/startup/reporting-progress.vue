<template>
	<div class='project-reporting'>
		<div class='project-reporting-head'></div>
		<p>当前进度</p>
		<div class='g-botton hs'>{{data.currentStatus}}</div>
		<div @click='resubmit' v-show="data.currentStatus == '淘汰'" class='g-botton rereport'>重新提交</div>
		<div class='report-hr'></div>
		<!-- <div class='status-bg'>
			<div class='report line1'>
				<ul>
					<li class='first'>申报</li>
					<li>初审</li>
					<li>复审</li>
					<li>会审</li>
				</ul>
			</div>
			<div class='report '>
				<ul class='line2'>
					<li>公示</li>
					<li class='hongse'>淘汰</li>
				</ul>
			</div>
			
			<div class='report line3'>
				<ul >
					<li class='first'>路演</li>
					<li>孵化</li>
					<li>入孵</li>
					<li>签约</li>
				</ul>
			</div>
			<div class='report line4'>	
				<ul>
					<li class='first'>出孵</li>
					<li class='huise'>恢复</li>
					<li class='huise'>暂缓</li>
				</ul>
			</div>
		</div> -->
	</div>
</template>
<script> 
import api from '../../api/api'
export default {
	data() {
		return {
			data:{}
		}
	},
	components:{
		
	},
	mounted: function () {
		this.$nextTick(function () {
		  	document.getElementById('app').style='padding-bottom: 0'
		  	document.getElementById('app-content').style='padding-bottom: 0'
		})
	},
	created() {
		let self = this
		api.projectSchdule(function(data){
			self.data = data.data
		})
	},
	methods:{
		resubmit() {
			api.resubmit(function(data) {
				if(data.ret != -1)
					Vue.info('提交成功');
			})
		}
	}
	

}
</script>
<style lang='scss' scoped>
@import "../../assets/css/_Mixins.scss";
#app .app-content{
		padding-bottom: 0rem;
	}
.project-reporting{
	/*height: 100vh;
	max-height: 100vh;*/
	height: 13rem;
	background: #fff;
	color: #666666;
	
	.huise{
		background-color: #b5b5b5;
	}
	.hongse{
		background-color: #ff0000;
	}
	.project-reporting-head{
		width: 100%;
		height: 2.8rem;
		max-height: 100vh;
		background-image: url('../../assets/images/schedule-head.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center;
	}
	p{

		font-size:.36rem;
		color:#919191;
		letter-spacing:0px;
		text-align:center;
		margin-top: .6rem;
	}
	.hs{
		margin-top: .42rem;
		background:#d8d8d8;
		border-radius:.12rem;
		width:5.6rem;
		height:1.2rem;
		line-height: 1.2rem;
		font-size:.4rem;
		color: #000000;
		letter-spacing:0px;
		text-align:center;
	}
	.rereport{
		margin-top: .5rem;
		width:5.6rem;
	}
	.report-hr{
		margin: .48rem 0 .5rem 0;
	}
	.report-hr:after{
 		
 		content: " ";
	    position: relative;
	    left: .3rem;
	    /*top: -0.4rem;*/
	    /*right: 0;*/
	    width: 90%;
	    height: 1px;
	    border-top: 1px solid #D9D9D9;
	    color: #D9D9D9 ;
	    -webkit-transform-origin: 0 0;
	    transform-origin: 0 0;
	    -webkit-transform: scaleY(0.5);
	    transform: scaleY(0.5);
	    display: inline-block;
	}
	ul{
		width: 5.7rem;
		margin: 0 auto;
		li{
			width: 1.2rem;
			height: .6rem;
			line-height: .6rem;
			background: #53cbbd;
			font-size: .24;
			color:#fff;
			border-radius: .12rem;
			text-align: center;
			float: left;
			margin-left: .28rem;
		}
		.first{
			margin-left: 0;
		}
	}
	.report{
		width: 5.7rem;
		margin:0 auto;
		height: .9rem;
		.line2{
			/*float: right;*/
			li{
				float: right;
			}
		}
	}
	.status-bg{
		background-image: url('../../assets/images/xg-bg-img1.png');
		background-repeat: no-repeat;
		background-size: 60% 78%;
    	background-position: 48% 37%;
	}
}
</style>