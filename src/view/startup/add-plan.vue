<template>
	<div class='add-plan'>
		<div class='title'><input type="text" v-model='param.title' placeholder="主题" name=""></div>
		<div class='title m1'><textarea  v-model='param.content'></textarea> </div>
		<div class='title m2'>
			<ul>
				<li v-for='(item, index) in previewPic'><img :src="item"><i @click='delPic(index)' class='del-img'></i></li>
				<!-- <li ><img src="../../assets/images/addimg.png"><i class='del-img'></i></li>
				<li ><img src="../../assets/images/addimg.png"><i class='del-img'></i></li> -->
				<li class='addimgbg' @click='imgAdd'><img class='addimg' src="../../assets/images/addimg.png"></li>
				<li class='addimg-desc'>
					<p>最多可添加3张图片</p>
					<p>单张限制大小1M</p>
				</li>
			</ul>
		</div>
		<div @click='submit' class='g-botton submit'>立即提交</div>
		<p class='tip'>每天进度更新需要1个工作日审核</p>
		

	<div id="loadingToast" class="weui_loading_toast" v-show='isFinishDownload'>
        <div class="weui_mask_transparent"></div>
        <div class="weui_toast">
            <div class="weui_loading">
                <!-- :) -->
                <div class="weui_loading_leaf weui_loading_leaf_0"></div>
                <div class="weui_loading_leaf weui_loading_leaf_1"></div>
                <div class="weui_loading_leaf weui_loading_leaf_2"></div>
                <div class="weui_loading_leaf weui_loading_leaf_3"></div>
                <div class="weui_loading_leaf weui_loading_leaf_4"></div>
                <div class="weui_loading_leaf weui_loading_leaf_5"></div>
                <div class="weui_loading_leaf weui_loading_leaf_6"></div>
                <div class="weui_loading_leaf weui_loading_leaf_7"></div>
                <div class="weui_loading_leaf weui_loading_leaf_8"></div>
                <div class="weui_loading_leaf weui_loading_leaf_9"></div>
                <div class="weui_loading_leaf weui_loading_leaf_10"></div>
                <div class="weui_loading_leaf weui_loading_leaf_11"></div>
            </div>
            <p class="weui_toast_content">上传中</p>
        </div>
    </div>
</div>

</template>

<script>
 import api from '../../api/api'
export default {
	data(){
		return{
			param:{
				title:"",
				content: "",
				image:null
			},
			serverIds: [],
            previewPic: [],
            imgsUrl: [],
            isFinishDownload: false,
            count: 3,
		}
	},
	mounted: function () {
	  	this.$nextTick(function () {
	   		api.getWXSign('http://h5.liuzhixingdong.com/', function(result){
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
	  	})
	},
	methods:{
		submit() {
			if(!!!this.param.title){
				Vue.info('请填写主题！');
				return 
			} else if(!!!this.param.content) {
				Vue.info('请填写进度！');
				return 
			}
			let self = this
			api.addProjectSchdule(this.param, function(data){
				// Vue.info('提交成功！');
				if (data && data.ret == -1) {
					Vue.info('提交失败');
				} else {
					Vue.info('提交成功', function(){
						self.$router.push({path: '/PSchdule'});
					})
				}
			})
		},
		uploadImage:function (localIds) {
            let self = this
            if(!localIds || localIds.length  < 1) {
                Vue.info('请至少选择一张图片')
                return;
            } 
            let i = 0, _length = localIds.length;
            
            function upload() {
              
                wx.uploadImage({
                    localId : localIds[i],
                    isShowProgressTips: _length, 
                    success : function(res) {
                        i++;
                      
                        // alert("upload res:" + JSON.stringify(res));
                        self.serverIds.push(res.serverId);
                        if (i < _length) {
                            // 多张循环上传
                            upload();
                        }

                        if (i == _length) {
                            // 从微信服务器下载图片到企业服务器
                            self.downLoadImage(self.serverIds);
                        }
                    },
                    fail : function(res) {
                        // alert(JSON.stringify(res));
                        // 图片上传失败
                        Vue.info('系统繁忙, 请稍后再试。 【01002】')
                    }
                });
            }
            // 执行上传函数
            setTimeout(upload, 100);
        },
        imgAdd:function() {
            let self = this
            if(self.imgsUrl && self.imgsUrl.length > 9) {
                Vue.info('最多只能上传9张图片')
                return
            } else if(self.imgsUrl && self.imgsUrl.length > 0){
                self.count = self.count - self.imgsUrl.length
            }
            wx.ready(function () {
                wx.chooseImage({
                    count: self.count, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        var localIds = res.localIds; 
                        if(localIds && localIds.length > 0) {
                            for(var i = 0 ; i < localIds.length; i++) {
                                self.previewPic.push(localIds[i])
                            }
                            self.uploadImage(localIds);
                        }
                    }
                });
            });
        },
        previewImg:function(index){
            let self = this
            wx.previewImage({
                current: self.imgsUrl[index], // 当前显示图片的http链接
                urls: self.imgsUrl// 需要预览的图片http链接列表
            });
        },
        delPic:function(index) {
        	index += 1
            this.previewPic.splice(index);
            this.imgsUrl.splice(index);
        },
        downLoadImage: function (serverIds) {
            let self = this
            self.isFinishDownload = true
            let str = self.serverIds.toString()
            api.downLoadImg(str, function(result) {
                self.imgsUrl = result
                self.param.image = self.imgsUrl.toString();
                self.isFinishDownload = false
            })
        },
	}
}
</script>

<style lang='scss' scoped>

.add-plan{
	
	width: 100%;
	height: 100vh;
	input::-ms-input-placeholder{
		text-align: center;
		
	}
	input::-ms-input-placeholder{
		text-align: center;

	}
	input::-webkit-input-placeholder{
		text-align: center;
	}
	textarea,input{
		color:#868686;
		font-size: .36rem;
		width: 5.6rem;
		height: .74rem;
		background-color: #e4e4e4;
		border: 0;
	}
	textarea{
		height: 2.55rem;
	}
	
	.title{
		margin: 0 auto;
		/*width: 80%;*/
		text-align: center;
		margin-top: .54rem;
		ul{
			width: 70%;
			height:2rem;
			display: block; 
			
			margin-left: .94rem;
		}
		.del-img{
			background-image: url('../../assets/images/delete.png');
			background-size: 100% 100%;
			height: .4rem;
			width: .4rem;
			left: .88rem;
			position: absolute;

		}
		li{
			float:left;
			text-align:center;
			position: relative;
			p{
				font-size:.36rem;
				color:#66cdcc;
				letter-spacing:0px;
				text-align:left;
				-webkit-transform: scale(0.75);  
			}
		}
		img{
			height: 1.2rem;
			width: 1.2rem;
			margin-left: 2px;
		}
		&.m1{
			margin-top: .12rem;
		}
		&.m2{
			margin-top: .12rem;
		}
		.addimg{
			/*clear: both;*/
			margin:.35rem 0 0 0;
			height: .5rem;
			width: .5rem;
		}
		.addimgbg{
			height: 1.2rem;
			width: 1.2rem;
			margin-left: 2px;
			background-image: url('../../assets/images/addimgbg.png'); 
		}
		.addimg-desc{
		    /*margin-top: .5rem;*/
		    text-align: left !important;
		}
	}
	.submit{
		top: 9.5rem;
		left: 16.5%;
		position: absolute;
	}
	.tip{
		top: 11rem;
		width: 100%;
		position: absolute;
		font-size:12px;
		color:#b5b5b5;
		letter-spacing:0px;
		text-align:center;
	}
}
</style>
