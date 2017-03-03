<template>
	<div class='BP-detail'>
		<section>
		 <loadmore  :bottom-method="loadBottom" :topDropText='topLoadingText' :bottom-all-loaded="allLoaded" :auto-fill='false' ref="loadmore">
				<template v-for="item in msg_list">
					<div class='project-pdf'>
						<p class='name'><i v-show='item.createTime && last_time > item.createTime'></i><span>{{item.title}}</span></p>
						<p class='pdfname'>{{item.content}}</p>
					</div>
				</template>
			</loadmore>
			
		</section>
		<div style='height:100%' v-show='hasList'>
            <no-data></no-data>
        </div>
	</div>
</template>

<script>
    import NoData from '../../components/no-data.vue'
    import api from '../../api/api'
    import { Loadmore } from 'mint-ui'
export default {
  	data () {
	    return {
	    	data: {
                pageNo: 1,
                pageSize: 10
            },
	    	msg_list: [],
	    	last_time: null,
	    	pages: null,
	    	hasList: false
	    };
  	},
  	created(){
	  	let This = this;
	            
	    api.user_msg(This.data, function (data) {
	        if (data.data.list.length > 0) {
	            This.msg_list = data.data.list;
	        } else {
	            This.hasList = true
	        }
	        This.last_time = data.data.last_time;
	        This.pages = data.data.pages;
	    });
  	},
  	components: {
        Loadmore,
        NoData,
    },
	methods: {
	  	loadBottom() {
            let self = this
          
            self.data.pageNo = Number(self.data.pageNo) + 1
            api.user_msg(self.data, function (data) {
		       	self.msg_list = self.msg_list.concat(data.data.list);
		        self.pages = data.data.pages;
		        //禁止继续下拉
		        if(data.pageCount == data.pageNo) {
                	self.allLoaded =  true;
            	}
    		});
            self.$refs.loadmore.onTopLoaded();
        }
	}
    
};
</script>

<style lang='scss' scoped>
@import '../../assets/css/bass.scss';
.BP-detail{
  	width: 100%;
  	height: 100%;
	.project-pdf{
		margin: 0 auto;
		width: 95%;
		background-color: #fff;
		height: auto;
		
		border-radius: .12rem;
		margin-top: .22rem;
		p{
			word-break:break-all;
			overflow: hidden;
			i{
				position: absolute;
			    font-style: initial;
			    font-family: PingFang SC, Hiragino Sans GB, Arial, Microsoft YaHei, Helvetica;
			    z-index: 2;
			    /*padding: 0 4px;*/
			    width: auto;
			    min-width: .22rem;
			    height: .22rem;
			    /*line-height: .36rem;*/
			    -webkit-border-radius: .18rem;
			    border-radius: .18rem;
			    color: #ffffff;
			    text-align: center;
			    font-size: .12rem;
			    background-color: #f43531;
			    margin: .25rem 0 0 0.3rem;
			}
		}
		p.name{
			height: .6rem;
			line-height: .72rem;
			font-size:.3rem;
			color:#3c3e3e;
			letter-spacing:0px;
			span{
				margin-left:.8rem;
			}
		}
		p.pdfname{
			font-size:.24rem;
			/*text-align: right;*/
			color:#a2a2a2;
			margin-left:.78rem;
			width: 85%;
			padding-bottom: .2rem;
		}
	}
}
</style>
