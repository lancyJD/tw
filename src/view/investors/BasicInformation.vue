<template>
    <section class="page-ff">
        <div class="info-img" @click='imgAdd'>
            <img v-show="head_img_url" :src="head_img_url" alt="img">
            <p v-show="!head_img_url">上传照片</p>

        </div>
         <p style='text-align: center; color: #53cbbd; font-size: .24rem;'>请上传真实头像，上传头像不可修改</p>
        <ul class="bi-ul">
            <li>
                <div class="weui-cell weui-cell_select">
                    <div class="weui-cell__hd">
                        <label class="weui-label">常住城市</label>
                        <p>（必填）</p>
                    </div>
                    <div class="weui-cell__bd">
                        <select v-model="selectedProvince">
                            <option v-for="province in cityData">{{province.name}}</option>
                        </select>
                        <div class="sx">
                            <span></span>
                            <small></small>
                        </div>
                        <select v-model="selectedCity">
                            <option v-for="city in cities">{{city}}</option>
                        </select>
                        <div class="sx">
                            <span></span>
                            <small></small>
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="bi-title">个人介绍 <p>（选填）</p></div>
                <textarea placeholder="200个字以内" v-model="self_info"></textarea>
            </li>
            <li class="gz">
                <div class="bi-title">关注领域 <span>（必选）</span>
                    <small>最多选5个</small>
                </div>
                <div v-show="isFieldList" class="bg" @click="hied_field"></div>
                <ul v-show="isFieldList" class="field-ul">
                    <li v-for="item in fieldList">
                        <input type="checkbox" :id="'f'+item.id" :value="item.dictName" v-model="checkFieldList" @change="check_field">
                        <label :for="'f'+item.id">{{item.dictName}}</label>
                    </li>
                </ul>
            </li>
            <li>
                <div class="check-box" @click="show_field">
                    <div class="check-btn" v-for="item in checkFieldList">{{item}}</div>
                </div>
                <!--<swiper :options="swiperOption" ref="mySwiperA">
                    <swiper-slide>
                        <label class="bi-btn" @change="check_field" v-for="item in limitBy(fieldList, 9)" :for="item.id">{{item.dictName}}<input
                                type="checkbox" :id="item.id" :value="item.dictName" v-model="checkFieldList"></label>
                    </swiper-slide>
                    <swiper-slide v-if="fieldList.length>9">
                        <label class="bi-btn" @change="check_field" v-for="item in limitBy(fieldList, 9,9)" :for="item.id">{{item.dictName}}<input
                                type="checkbox" :id="item.id" :value="item.dictName" v-model="checkFieldList"></label>
                    </swiper-slide>
                    <swiper-slide v-if="fieldList.length>18">
                        <label class="bi-btn" @change="check_field" v-for="item in limitBy(fieldList, 9,18)" :for="item.id">{{item.dictName}}<input
                                type="checkbox" :id="item.id" :value="item.dictName" v-model="checkFieldList"></label>
                    </swiper-slide>
                    <swiper-slide v-if="fieldList.length>27">
                        <label class="bi-btn" @change="check_field" v-for="item in limitBy(fieldList, 9,27)" :for="item.id">{{item.dictName}}<input
                                type="checkbox" :id="item.id" :value="item.dictName" v-model="checkFieldList"></label>
                    </swiper-slide>
                    <swiper-slide v-if="fieldList.length>36">
                        <label class="bi-btn" @change="check_field" v-for="item in limitBy(fieldList, 9,36)" :for="item.id">{{item.dictName}}<input
                                type="checkbox" :id="item.id" :value="item.dictName" v-model="checkFieldList"></label>
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>-->
            </li>
        </ul>
        <button class="next-btn" @click="save_data">下一步</button>
    </section>
</template>

<script>
    import api from '../../api/api'
    import CITY from '../../comm/city.data'
    import '../../assets/css/investors/Certification.scss'
    import {mapGetters, mapActions, mapMutations} from 'vuex'
    export default {
        data () {
            return {
                head_img_url: 'http://i.zeze.com/attachment/forum/201605/06/214815xnd5dz5t58fndt85.jpg',
//                head_img_url: '',
                cityData: [],
                selectedProvince: '',
                selectedCity: '',
                self_info: '',
                swiperOption: {
                    loop: true,
                    spaceBetween: 10,
                    allowSwipeToNext: true,
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    autoplayDisableOnInteraction: false,
                },
                fieldList: [],
                checkFieldList: [], //已经选中的领域
                serverIds: [],
                previewPic: [],
                imgsUrl: [],
                isFinishDownload: false,
                count: 1,
                isFieldList: false,
            }
        },
        created () {
            let This = this;
            This.cityData = CITY.cityData;
            This.head_img_url = this.userInfo.user_info.headImg ? this.userInfo.user_info.headImg : "";
            This.selectedProvince = this.userInfo.user_info.province ? this.userInfo.user_info.province : "";
            This.selectedCity = this.userInfo.user_info.city ? this.userInfo.user_info.city : "";
            This.self_info = this.userInfo.user_info.selfInfo ? this.userInfo.user_info.selfInfo : "";
            This.checkFieldList = this.userInfo.user_info.field ? this.userInfo.user_info.field.split("#") : [];

            //关注领域
            /*api.query_data_fields(function (data) {
             This.fieldList = data.data.records;
             if ((This.fieldList).length < 10) {
             This.swiperOption.allowSwipeToNext = false;
             This.swiperOption.pagination = '';
             }
             });*/
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
//        computed: mapGetters({
//            userInfo: 'userInfo',
//            startUpList: 'startUpList'
//        }),
        computed: {
            ...mapGetters({
                userInfo: 'userInfo',
                startUpList: 'startUpList'
            }),
            //省市联动
            cities() {
                let This = this;
                let city = [], selectedProvince = this.$data.selectedProvince;
                CITY.cityData.forEach(function (d) {
                    if (d.name == selectedProvince) {
                        This.selectedCity = d.city[0].name;
                        for (let c of d.city) {
                            city.push(c.name)
                        }
                    }
                });
                return city;
            },


        },
        methods: {
            show_field(){
                let This = this;
                this.isFieldList = true;
                api.query_data_fields(function (data) {
                    This.fieldList = data.data.records;
                });
            },
            hied_field(){
                this.isFieldList = false;
            },
            check_field(e){
                if (this.checkFieldList.length >= 6) {
                    Vue.info('最多只能选5个');
                    e.target.checked = false;
                    this.checkFieldList.pop()
                }
            },
            tipInfo(){
                Vue.dialog('提示', '请上传真实头像，上传头像不可修改',null,  this.imgAdd)
            },
            //保存数据
            save_data(){
                let This = this;
                let field = this.checkFieldList.toString().replace(/,/g, '#');
                if (This.head_img_url == '') {
                    Vue.info('请上传头像');
                    return
                }
                if (This.selectedProvince == '' || This.selectedCity == '') {
                    Vue.info('请选择常住城市');
                    return
                }
                if (This.checkFieldList == '') {
                    Vue.info('请选择关注领域');
                    return
                }
                let data = {
                    head_img_url: This.head_img_url,
                    province: this.selectedProvince,
                    city: this.selectedCity,
                    self_info: this.self_info,
                    field: field
                };
                api.basic_information(data, function (data) {
                    if (data.ret == 0) {
                        Vue.info('保存成功', function () {
                            This.$router.push('/investment_information');
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
            imgAdd: function () {
                let self = this
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
                let self = this
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
                let self = this
                self.isFinishDownload = true
                let str = self.serverIds.toString()
                api.downLoadImg(str, function (result) {
                    console.log(result)
                    self.imgsUrl = result;
                    self.head_img_url = result.toString();
//                    self.data.image = self.imgsUrl.toString();
                    self.isFinishDownload = false
                })
            },
        }
    };
</script>

