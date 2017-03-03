<template>
	<div class='project-schdule'>
		<div class='project-schdule-head'></div>

		<div v-if="list.length <= 0" class='project-context-nores'>
			<img src="../../assets/images/no-res.png">
			<p>项目进度还没填写！</p>
			 <router-link :to="{ name: 'AddPlan'}"><div class='g-botton'>立刻填写进度</div></router-link>
		</div>
		<div v-if="list.length > 0" class="page-loadmore-wrapper"  ref="wrapper" >
		<div style='height:.2rem'></div>
		<router-link :to="{ name: 'AddPlan'}"><div class='g-botton mginbottom'>立刻填写进度</div></router-link>
			 <loadmore  :bottom-method="loadBottom" :topDropText='topLoadingText' :bottom-all-loaded="allLoaded" :auto-fill='false' ref="loadmore">
				<section class='section-context'>
					<div v-for='(item, $index) in list' class='project-context' :class="{ 'margins': $index == 0}">
						<div  class='cells-box' >
							<div clss='cells-date'>
								<span>{{item.createTime | getDay }}</span><small>{{item.createTime | getMonth}}月</small>
							</div>
							<a class='g-botton' v-show='userInfo.user_info.userAuth == 1' v-bind:class="[item.checked == 2 ? 'checkout-status' : '']">{{item.checked | status}}</a>
						</div>
						<div class='cells-date-title'>
								{{item.title}}
						</div>
						<div  class='cells-date-right'>
							<div v-show='item.content' class='cells-date-right-desc'>
								{{item.content}}
							</div>
							
							<ul v-show='item.images && item.images.length > 0'>
									<li v-for="(img, $index) in item.images" ><img @click='previewImg(item.images, $index)'  :src="img"></li>
									<!-- <li><img src="../../assets/images/demo.png"></li>
									<li><img src="../../assets/images/demo.png"></li>
									
									<li><img src="../../assets/images/demo.png"></li>
									<li><img src="../../assets/images/demo.png"></li> -->
							</ul>
						</div>	
					</div>
				<section >
			</loadmore>
				<div v-if='data.projectInfo.projectAuth == 1 && data.projectInfo.current_status' class='bottom-tip'>
					<p>请每周至少提交一次项目进度</p>
					<p>(一周最多三次)</p>
				</div>
		</div>

	</div>
</template>
<script> 
import api from '../../api/api'
import { Loadmore } from 'mint-ui'
import { mapGetters, mapActions, mapMutations  } from 'vuex'
export default {
	data() {
		return {
			data:{
				isHaveImg:false,
				list: [],
				isHaveDesc:false,
				checkStatus: false,
				projectInfo:{}
			},
			list: [],
			isHaveImg:true,
			haveContent: false,
			haveImg: false,
			param:{
				pageNo: 1,
				pageSize: 10
			},
			bottomDistance:70,
			allLoaded:false
		}
	},
	components: {
	    Loadmore
	},
	beforerouteleave (to, from, next) {
  		// document.getElementById('app').style='background:#f6f6f6'
	},
	mounted: function () {
		this.$nextTick(function () {
		  // document.getElementById('app').style='padding-bottom: 0;height:100vh;'
		  document.getElementById('app-content').style='padding-bottom: 0'
		})
	},
	filters:{
		status(val) {
			if(val == 0) {
				return '待审核'
			} else if(val == 1) {
				return '已审核'
			} else if (val == 2) {
				return '未通过'
			} else {
				return '待审核'
			}
		}
	},
	computed: mapGetters({
        userInfo: 'userInfo'
    }),
	created(){
		let self = this
		api.projectSchduleList(this.param, function(data){
			self.list = data.data.list
			self.data = data.data
			if(data.data.pageNum == data.data.pageNo) {
				self.allLoaded = true;
			}
			for (var i = self.data.list.length - 1; i >= 0; i--) {
				if(!!!self.list[i].image)
					continue
				self.list[i].images = self.list[i].image.split(',');
			}
			
			
		})
		api.getWXSign('http://h5.liuzhixingdong.com/index.html', function(result){
   			let data = result.data
   			wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.appId, // 必填，公众号的唯一标识
                timestamp: data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                signature: data.signature,// 必填，签名，见附录1
                jsApiList: [
                    'chooseImage',
                    'uploadImage',
                    'previewImage'
                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            })
   		})
	},
	methods:{
		loadBottom() {
	        let self = this
	     	// self.$refs.loadmore.onBottomLoaded();
        	self.param.pageNo = Number(self.param.pageNo) + 1
        	api.projectSchduleList(this.param, function(data) {
        		self.list = self.list.concat(data.data.list);
				self.data = data.data
				self.$refs.loadmore.onBottomLoaded();
        		if(self.param.pageNo == data.data.pageNum) {
		        	self.allLoaded =  true;
		        }
        		for (var i = self.list.length - 1; i >= 0; i--) {
        			if(!!!self.list[i].image)
        				continue
					self.list[i].images = self.list[i].image.split(',');
				}
        		
   	 		});
      	},
      	previewImg:function(item, index){
            let self = this
            wx.previewImage({
                current: item[index], // 当前显示图片的http链接
                urls: item// 需要预览的图片http链接列表
            });
        },
	}
}
</script>
<style lang='scss' scoped>
.project-schdule{
	height: 100% !important;
	color: #666666;
	position: absolute;
	top: 0;
	background: #fff;
	.page-loadmore-wrapper{
		background-color: #fff;
	}
	
	.bottom-tip{
		width: 100%;
		height: 1rem;
		position: fixed;
		bottom: 0;
		text-align: center;
		background: #fff;
	}
	.project-schdule-head{
		width: 100%;
		height: 2.8rem;
		/*max-height: 100vh;*/
		background-image: url('../../assets/images/schedule-head.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center;
	}
	.section-context{
		width: 100%;
		height: 100%;
		padding-bottom: 1rem;
	    text-align: center;
	    background: #fff;
	}
	.project-context-nores{
		/*height: 100vh;*/
		/*display: inline-block;*/

		img{
			width: 2.24rem;
			height: 1.68rem;
			margin: 1.52rem 0 0 2.64rem;
		}
		p{
			font-size:.3rem;
			color:#555555;
			letter-spacing:0px;
			text-align:center;
			margin: .4rem 0 1.34rem 0rem;
		}
	}
	.mginbottom{
		/*bottom:.2rem;*/
		/*left: 15%;*/
		/*margin-top: .2rem;*/
		position: relative;
	}
	.project-context{
		display: inline-block;
		
		width: 90%;
		height: auto;
		background: #fff;
		&.margins{
			padding-top: .5rem;
		}
		&.have-content{
			height: 2.5rem;
		}
		&.have-img{
			/*height: 8rem;*/
		}
		.cells-date-title{
			float: left;
			/*height: .8rem;*/
			padding-top: .13rem;
				/*line-height: .7rem;*/
		}
		.cells-box{
			display: inline-block;
			height: auto;
			width: 1.1rem;
			float: left;
			margin-right: .2rem;
			
			span{
				font-size: .4rem;
				padding-right: .1rem;
			}
			a{
				border:1px solid #666666;
				width: .9rem;
				height: .26rem;
				line-height: .26rem;
				font-size: .18rem;
				background: #fff;
				color: #666666;
				float: left;
				margin-left: .15rem;
			}
			.checkout-status {
				color: #66cdcc;
				border:1px solid #66cdcc;
			}
		}
		.cells-date{
			text-align: right;
			/*float: left;*/
		}
		.cells-date-right{
			width: 80%;
			float: left;
			height: auto;
			text-align: left;
			.cells-date-title{
				height: .8rem;
				padding-top: .13rem;
				/*line-height: .7rem;*/
			}
			.cells-date-right-desc{
				display: inline-block;
				font-size:.24rem;
				color:#9a9a9a;
				letter-spacing:0px;
				text-align:left;
			}
			li{
				float: left;
				margin-right: 1px;
				display: inline-block;
			}
			img{
				float: left;
				width: 1.74rem;
				height: 1.74rem;
			}
		}
	}
}
</style>