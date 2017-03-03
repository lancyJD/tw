<template>
	<div>
		<section>
			<div class='mine'>
				<div class='row1'>
				<!-- /invesit_detail/ -->
					
				</div>
				<div @click='goProjectInfo' class='row2'>
					<div class='row-img'>
					<!-- || ../../assets/images/defaultHead.png -->
						<img v-show='data.userInfo.headImg' :src="data.userInfo.headImg">
						<img v-show='!!!data.userInfo.headImg' src="../../assets/images/defaulthead.png">
						<i v-show='data.userInfo.userAuth == 1'></i>
					</div>
					<!-- <div class='row-info'>
						<div class='row-info-head' :class="{'isVip': data.userInfo.userAuth == 0}"><span>{{data.projectInfo.projectName}}</span></div>
						<div class='row-info-intro'>{{data.projectInfo.projectTip}}</div>
					</div> -->
					
				</div>
				
			</div>
			
		</section>
		<section>
			<div class='mine-menu'>
				<ul>
					<router-link tag="li" :to="{ path: '/reporting'}">
						<img src="../../assets/images/apply-schedule.png"><span>我的订单</span>
					</router-link>

					<router-link tag="li" :to="{ path: 'pschdule'}">
						<img src="../../assets/images/project-schdule.png"><span>预定六合资料</span>
					</router-link>

					<!-- <router-link tag="li" :to="{ path: '/investors'}">
						<img src="../../assets/images/investor.png"><span>投资人</span>
					</router-link> -->

					<!-- <router-link tag="li" :to="{ path: '/itsuport'}">
						<img src="../../assets/images/it_service.png"><span>技术服务</span>
					</router-link>
					<router-link tag="li" :to="{ path: '/system_info'}">
						<img src="../../assets/images/message-mine.png"><span>消息</span>
					</router-link> -->
				</ul>
			</div>
		</section>
	</div>
</template>
<script>
	import api from '../../api/api'
	import {mapGetters, mapActions, mapMutations} from 'vuex'
    export default {
        data () {
            return {
                data: {
                	projectInfo:{},
                	userInfo:{}
                }
            }
        },
        created () {
           
        },
       mounted: function () {
			this.$nextTick(function () {
			  document.getElementById('app').style='background:#f6f6f6'
			})
		},
		computed: mapGetters({
	        type: 'type'
	    }),
        components: {},
        watch: {},
        methods: {
        	//查看详情
            check_project_details(id){
               
            },
        	goProjectInfo(){
        		this.$router.push({path: '/project_info/'+ this.data.projectInfo.id});
        	},
        	goProjectInfo2(){
        		Vue.info('如需修改资料，请登录以下网址操作：</br>http://pc.liuzhixingdong.com');
        	},
        	goInvesteDetail() {
        		this.$router.push({path: '/invesit_detail/' + this.type});
        	}
        }
    };
</script>
<style lang='scss' scoped>

	.mine{
		height: 2.06rem;
		width: 95%;
		margin: 0 auto;
		background-color: #fff;
		margin-top: .24rem;
		border-radius: .04rem;
		.row1{
			height: .3rem;
			width: 96%;
			a{
				font-size:14px;
				color:#c7c7c7;
				letter-spacing:0px;
				text-align:center;
				float:right;
				height: .7rem;
				line-height: .7rem;
			}
		}
		.row2{
			.row-img{
				margin: 0 auto;
				height: 1.36rem;
				width: 21%;
				border-radius: 50%
			}
			.row-info{
				float: left;
				width: 74%;

			}
			.isVip{
				background-image: none !important;
			}
			.row-info-head{
				background-image: url('../../assets/images/vip-log.png');
				background-repeat: no-repeat;
				background-position: right;
				background-size: 25% 95%;

			}
			.row-info-intro{
				height: .7rem;
				display: flex;
				margin: 0 auto;
				overflow:hidden; 
				text-overflow: hidden;
				font-size: .24rem;
			    word-break:break-all;
			    display:-webkit-box;
			    -webkit-line-clamp:2;
			    -webkit-box-orient:vertical;
			    overflow:hidden;
			    font-size: .24rem;
			    color:#53cbbd;
			}
			i{
				height: .32rem ;
				background-image: url('../../assets/images/vip-v.png');
				background-repeat: no-repeat;
				background-position: center;
				background-size: .32rem .32rem;
				width: .32rem;
				position: absolute;
				top: 1.3rem;
				left: 1.1rem;
			}
			img{
				height: 1.36rem;
				width: 1.36rem;
				border-radius: 50%;
				margin-left: .34rem;
			}
		}

		
	}
	.mine-menu{
		width: 95%;
		background-color: #fff;
		height: auto;
		margin: 0 auto;
		margin-top: .2rem;
		border-radius: .12rem;
		ul{

			img{
				float: left;
				height: .34rem;
				width: .32rem;
				margin: .3rem .18rem 0 .3rem;
			}
			li{
				height: 1rem;
				/*line-height: 1rem;*/
				width: 95%;
				background-image: url('../../assets/images/right-log.png');
				background-repeat: no-repeat;
				background-position: 99% 50%;
				background-size: 3% 40%;
				clear:both;
				/*display: inline-block;*/
				span{
					height: 1rem;
					line-height: 1rem;
				}
			}
			li:after{
				content: " ";
			    position: absolute;
			    margin: 0 auto;
			    left: .4rem;
			    /*top: -.58rem;*/
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
		}
		
	}
</style>