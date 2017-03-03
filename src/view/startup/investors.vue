<template>
	<div class='investor-info'>
		<section v-for='item in data.list'>
			<div class='mine'>
				<div class='row2'>
					<div @click='detail(item.id)' class='row-img'>
						<img src="../../assets/images/defaulthead.png">
						<i></i>
					</div>
					<div class='row-info'>
						<div class='row-invest-head'>
							<span>{{item.name}}</span>
							<div  class='g-botton margins1' :class="{'pass': item.exchangeStatus==1, 'deline': item.exchangeStatus==2}">
								{{item.exchangeStatus | status}}
							</div>
						</div>
						<div class='row-invest-intro'>
							<p>投资案例：{{item.caseDemo}}</p>
							<p>投资领域：{{item.field}}</p>
						</div>
					</div>
				</div>
				<div></div>
			</div>
			
		</section>
		<div v-show='data.list && data.list.length < 1'>
            <no-data></no-data>
        </div>
	</div>
</template>
<script>
import api from '../../api/api'
import NoData from '../../components/no-data.vue'
export default {
	data() {
		return {
			status: 2,
			data : {
				list:[]
			}
		}
	},
	filters:{
		status(val) {
			if(val == 0) {
				return '申请沟通'
			} else if(val == 1) {
				return '沟通中…'
			} else if (val == 2) {
				return '拒绝沟通'
			} else {
				return '等待回复'
			}
		}
	},
	components: {
	    NoData
	},
	created() {
		let self = this
		let param = {pageNo: 0, pageSize:20}
		api.seeInvestor(param, function(data){
			self.data = data.data
		})
	},
	methods:{
		detail(userId) {
	  		this.$router.push({name: 'invesit_detail', params: { id: userId }});
	  	},
	}

}
</script>
<style lang='scss' scoped>
.investor-info{
	.mine{
		/*height: 1.66rem;*/
		width: 95%;
		margin: 0 auto;
		background-color: #fff;
		margin-top: .24rem;
		border-radius: .04rem;
		/*height: 2rem;*/
		.row2{
			display: inline-block;
			width: 100%;
			/*display: inline-block;*/
			.row-img{
				float: left;
				height: 1.36rem;
				width: 21%;
			}
			.row-info{
				float: left;
				width: 74%;
				/*margin-top: .16rem;*/
			}
			.row-invest-head{
				height: .7rem;
				line-height: .7rem;
				/*display: inline-block;*/
			}
			.row-invest-intro{
				display: inline-block;
				/*flex:left;*/
				height: .7rem;
				/*display: flex;*/
			    font-size: .24rem;
			    p{
			    	width: 100%;
			    	color: #666666;
			    }
			}
			i{
				height: .32rem ;
				width: .32rem;
				background-image: url('../../assets/images/vip-v.png');
				background-repeat: no-repeat;
				background-position: center;
				background-size: .32rem .32rem;
				position: absolute;
				top: 1rem;
				left: 1.2rem;
			}
			img{
				height: 1.18rem;
				width: 1.18rem;
				border-radius: 50%;
				margin: .16rem .26rem 0 .18rem;
			}
		}
	}
}
</style>