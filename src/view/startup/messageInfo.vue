<template>
    <div class='message-ct'>
       <div class='shop-list'>
           <img src="../../assets/images/demo.png">
           <div class='desc first'>
               发顺丰的撒
           </div>
           <div class='desc'>
               作用：fdsafdsafdsafdsa
           </div>
           <div class='desc'>
               <span>￥100</span>
           </div>
           <div class="check-exchange">购买</div>
       </div>
       <div class='shop-list'>
           <img src="../../assets/images/demo.png">
           <div class='desc first'>
               发顺丰的撒
           </div>
           <div class='desc'>
              作用：fdsafdsafdsafdsa
           </div>
           <div class='desc'>
               <span>￥100</span>
           </div>
           <div class="check-exchange">购买</div>
       </div>
    </div>
</template>
<script>
    import HeadNavMenu from '../../components/head-nav-menu.vue'
    import NoData from '../../components/no-data.vue'
    import api from '../../api/api'
    import { Loadmore } from 'mint-ui'
    import { mapGetters, mapActions, mapMutations  } from 'vuex'
    export default {
        data() {
            return {
                type: null,
                datas: {
                    list:[]
                },
                hadChat: false,
                agreeClick: false,
                allLoaded: false,
                param: {
                    pageNo: 1,
                    pageSize: 10
                }
            }
        },
        computed: mapGetters({
            logonType: 'type',
            userInfo: 'userInfo'
        }),
        created(){
           
        },
        components: {
            HeadNavMenu,
            NoData,
            Loadmore
        },
        methods: {
            
        }


    }
</script>
<style lang='scss' scoped>
.message-ct {
    width: 100%;
    /*font-size: .6rem;*/
    /*color: #d5d5d5;*/
    .shop-list{
        width: 98%;
        height: 2.8rem;
        background: #fff;
        margin: .1rem auto;
        border-radius: .12rem;
        img{
            height: 2rem;
            width: 2rem;
            float: left;
            margin: .3rem 0 0 .3rem;
        }
        .desc{
            float: left;
            height: .5rem;
            line-height: .5rem;
            width: 4.5rem;
            padding-left: .1rem;
            &.first{
                margin-top: .2rem;
            }
            span{
              color:#FF2424;
            }
        }
        .check-exchange{
            width: 20%;
            float: right;
            border-radius: .5rem;
            border:1px solid #d5d5d5;
            text-align: center;
            margin-right: .5rem;
            margin-top: .5rem;
        }
    }
}
</style>