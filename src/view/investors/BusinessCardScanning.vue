<template>
    <section>
        <ul class="bcs-ul">
            <li><span>姓  名</span><input type="text" v-model.trim="data.name"></li>
            <!--<li><span>手  机</span><input type="tel" v-model.trim="data.mobile"></li>-->
            <li><span>邮  箱</span><input type="email" v-model.trim="data.email"></li>
            <li><span>公司名称</span><input type="text" v-model.trim="data.company_name"></li>
            <li class="sel">
                <span>职 位</span>
                <select v-model="data.job">
                    <option></option>
                    <option>董事长</option>
                    <option>投资总监</option>
                    <option>投资经理</option>
                    <option>投资合伙人</option>
                </select>
                <i></i>
                <!--<div class="weui-cell weui-cell_select">
                    <div class="weui-cell__hd">
                        <label for="" class="weui-label">职 位</label>
                    </div>
                    <div class="weui-cell__bd">
                        <select class="weui-select" v-model="data.job">
                            <option></option>
                            <option>投资总监</option>
                            <option>投资经理</option>
                            <option>投资合伙人</option>
                        </select>
                    </div>
                </div>-->
            </li>
            <li><span>名片上传</span></li>
            <li>
                <div class="mp-img">
                    <div class="add-img-box">
                        <i @click='imgAdd(1)'>
                            <img :src="data.card_front_url" alt="">
                        </i>
                        <p>正面</p>
                    </div>
                    <div class="add-img-box ar">
                        <i @click='imgAdd(2)'>
                            <img :src="data.card_back_url" alt="">
                        </i>
                        <p>背面</p>
                    </div>
                </div>
            </li>
        </ul>
        <button class="next-btn" @click="save_data">下一步</button>
    </section>
</template>

<script>
    import api from '../../api/api'
    import '../../assets/css/investors/Certification.scss'
    import {mapGetters, mapActions, mapMutations} from 'vuex'
    export default {
        data () {
            return {
                data: {
                    name: '',
//                    mobile: '',
                    email: '',
                    company_name: '',
                    job: '',
                    card_front_url: 'http://pic109.nipic.com/file/20160909/14008425_230416886038_2.jpg',
                    card_back_url: 'http://pic119.nipic.com/file/20170103/22009462_220945623036_2.jpg',
//                    card_front_url: '',
//                    card_back_url: ''
                },
                type: null,
                serverIds: [],
                previewPic: [],
                imgsUrl: [],
                isFinishDownload: false,
                count: 1
            }
        },
        computed: mapGetters({
            userInfo: 'userInfo',
            startUpList: 'startUpList'
        }),
        created () {
            //this.userInfo.user_info
            this.data.name = this.userInfo.user_info.name ? this.userInfo.user_info.name : "";
            this.data.email = this.userInfo.user_info.email ? this.userInfo.user_info.email : "";
            this.data.company_name = this.userInfo.user_info.companyName ? this.userInfo.user_info.companyName : "";
            this.data.job = this.userInfo.user_info.job ? this.userInfo.user_info.job : "";
            this.data.card_front_url = this.userInfo.user_info.cardFrontFilename ? this.userInfo.user_info.cardFrontFilename : "";
            this.data.card_back_url = this.userInfo.user_info.cardBackFilename ? this.userInfo.user_info.cardBackFilename : "";

            api.getWXSign('http://h5.liuzhixingdong.com/', function (result) {
                let data = result.data;
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
        watch: {},
        methods: {
            save_data(){
                let This = this;
//                let mobileReg = /^1[34578]\d{9}$/;
                let emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
                if (this.data.name.length < 2) {
                    Vue.info('姓名必须大于2位');
                    return false;
                }
                /*if (!mobileReg.test(this.data.mobile)) {
                 Vue.info('请正确输入手机号');
                 return false;
                 }*/
                if (!emailReg.test(this.data.email)) {
                    Vue.info('请正确输入邮箱');
                    return false;
                }
                if (this.data.company_name.length < 2) {
                    Vue.info('公司名称必须大于2位');
                    return false;
                }
                if (this.data.job == '') {
                    Vue.info('请选择职位');
                    return false;
                }
                if (this.data.card_front_url == '' || this.data.card_back_url == '') {
                    Vue.info('请上传名片');
                    return false;
                }

                api.business_card_scanning(this.data, function (data) {
                    if (data.ret == 0) {
                        Vue.info("保存成功", function () {
                            This.$router.push(`/basic_information`);
                        });
                    }
                })
            },
            uploadImage: function (localIds) {
                let self = this;

                if (!localIds || localIds.length < 1) {
                    Vue.info('请至少选择一张图片')
                    return;
                }
                let i = 0, _length = localIds.length;

                function upload() {
                    wx.uploadImage({
                        localId: localIds[i],
                        isShowProgressTips: _length,
                        success: function (res) {
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
                        fail: function (res) {
                            // 图片上传失败
                            Vue.info('系统繁忙, 请稍后再试。 【01002】')
                        }
                    });
                }

                // 执行上传函数
                setTimeout(upload, 100);
            },
            imgAdd: function (type) {
                let self = this;
                self.serverIds = []
                self.type = type
                if (self.imgsUrl && self.imgsUrl.length > 1) {
                    Vue.info('最多只能上传1张图片');
                    return
                } else if (self.imgsUrl && self.imgsUrl.length > 0) {
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
                            if (localIds && localIds.length > 0) {
                                for (var i = 0; i < localIds.length; i++) {
                                    self.previewPic.push(localIds[i])
                                }
                                self.uploadImage(localIds);
                            }
                        }
                    });
                });
            },
            previewImg: function (index) {
                let self = this;
                wx.previewImage({
                    current: self.imgsUrl[index], // 当前显示图片的http链接
                    urls: self.imgsUrl// 需要预览的图片http链接列表
                });
            },
            delPic: function (index) {
                this.previewPic.splice(index);
                this.imgsUrl.splice(index);
            },
            downLoadImage: function (serverIds) {
                let self = this;
                self.isFinishDownload = true;
                let str = self.serverIds.toString();
                api.downLoadImg(str, function (result) {
                    self.imgsUrl = result.data;
                    console.log(self.type)
                    if (self.type == 1) {
                        self.data.card_front_url = result[0];
                    } else {
                        self.data.card_back_url = result[0];
                    }
//                    self.data.image = self.imgsUrl.toString();
                    self.isFinishDownload = false
                })
            }
        }
    };
</script>


