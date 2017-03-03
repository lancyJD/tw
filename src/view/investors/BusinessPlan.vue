<template>
    <section>
        <div class="business-plan">
            <ul>
                <li v-for="item in bp_list">
                    <time>{{item.createTime | moment('YYYY-MM-DD')}} <span>{{item.createTime | moment('HH:MM')}}</span></time>
                    <a :href="item.bpUrl">{{item.bpFilename}}</a>
                </li>
            </ul>
            <div v-show='hasList'>
                <no-data></no-data>
            </div>
            <div v-show="isLoading" class="loading"></div>
            <p id="end_msg" :class="['end-msg',{'on':showEnd}]">已经到底</p>
        </div>
    </section>
</template>

<script>
    import NoData from '../../components/no-data.vue'
    import api from '../../api/api'
    import '../../assets/css/investors/Project.scss'
    export default {
        data () {
            return {
                pageNo: 1,
                pageSize: 10,
                pageNum: '',
                bp_list: [],
                hasList: false,
                isScroll: true,
                isLoading: false,
                showEnd: false,
            }
        },
        mounted: function () {
            this.$nextTick(function () {
              // document.getElementById('app').style='padding-bottom: 0;height:100vh;'
              document.getElementById('app-content').style='padding-bottom: 0'
            })
        },
        created () {
            let This = this;
            let projectId = {
                projectId: This.$route.params.id,
                pageNo: This.pageNo,
                pageSize: This.pageSize
            };
            api.project_bp_list(projectId, function (data) {
                This.bp_list = data.data.list;
                This.pageNum = data.data.pageNum;
            });
            This.scroll_more({
                lastDonId: 'end_msg',
                call_back: function () {
                    This.pageNo += 1;
                    let res = {
                        projectId: This.$route.params.id,
                        pageNo: This.pageNo,
                        pageSize: This.pageSize,
                    };
                    api.project_bp_list(res, function (data) {
                        if (This.pageNo <= This.pageNum) {
                            This.isScroll = true;
                            This.bp_list = (This.bp_list).concat(data.data.list);
                        } else {
                            This.showEnd = true;
                        }
                        This.isLoading = false;
                    });
                }
            })
        },
        components: {NoData},
        watch: {},
        computed: {},
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
    };
</script>


