<template>
    <section class="system-msg">
        <ul>
            <li v-for="item in msg_list" :class="last_time<item.createTime?'on':''">
                <h2>{{item.title}}</h2>
                <p>{{item.content}}</p>
            </li>
        </ul>
        <div v-show='hasList'>
            <no-data></no-data>
        </div>
        <div v-show="isLoading" class="loading"></div>
        <p id="end_msg" :class="['end-msg',{'on':showEnd}]">已经到底</p>
    </section>
</template>
<script>
    import '../../assets/css/investors/InvestMessageInfo.scss'
    import NoData from '../../components/no-data.vue'
    import api from '../../api/api'
    export default {
        data() {
            return {
                data: {
                    pageNo: 1,
                    pageSize: 20
                },
                last_time: '',
                msg_list: [],
                pages: '',
                has_data: false,
                hasList: false,
                isScroll: true,
                isLoading: false,
                showEnd: false,
            }
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
            This.scroll_more({
                lastDonId: 'end_msg',
                call_back: function () {
                    This.data.pageNo += 1;
                    let res = {
                        pageNo: This.data.pageNo,
                        pageSize: This.data.pageSize,
                    };
                    api.user_msg(res, function (data) {
                        if (This.data.pageNo <= This.pages) {
                            This.isScroll = true;
                            This.msg_list = (This.msg_list).concat(data.data.list);
                        } else {
                            This.showEnd = true;
                        }
                        This.isLoading = false;
                    });
                }
            })
        },
        components: {NoData},
        methods: {
            //下拉加载更多
            scroll_more(obj){
                let This = this;
                Vue.nextTick(function () {
                    document.addEventListener('scroll', winScroll, false);
                    let lastDomId = document.getElementById(obj.lastDonId);

                    function winScroll() {
                        if ((lastDomId.offsetTop - window.screen.height) - document.body.scrollTop < 30) {
                            if (This.isScroll) {
                                obj.call_back();
                                This.isScroll = false;
                            }
                        }
                    }
                })

            }
        }
    }
</script>

