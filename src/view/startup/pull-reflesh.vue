<template>
  <div class='home-container'>
    <section>
      <head-nav :menus='menus' v-on:getCondition='getCondition'></head-nav> 
    </section>
    <section class='startup-list'>
      <loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <div v-for='item in startUpList.data' class='context'>
        <div @click='detail' class='info'>
          <!-- <img src="../assets/images/defaulthead.png"> -->
          <div class='img-log'>
            <div class='logo-v'></div>
          </div>
          
          <div class='info2'>
            <p class='p1'><span>{{item.name}}</span>{{item.job}}</p>
            <p>投资案例：{{item.caseDemo}}</p>
            <p>投资领域：{{item.field}}</p>
          </div>
        </div>
        
          <div class='apply_info'>
            <p><i>{{item.seeNum}}</i></p>
            <template v-if='userInfo.isLogon'>
              <div @click='chat'  class='g-botton margins2' >申请沟通</div>
            </template>
            <template v-else>
              <div class='g-botton margins2 button-disable' >申请沟通</div>
            </template >
          </div>
        </div>
      
      </loadmore>
    </section>
    
  </div>
</template>

<script>
// import promise from 'promise'
import { mapGetters, mapActions, mapMutations  } from 'vuex'
import dialogBadge from '../../components/dialog-badge'
import IndexNav from '../../components/index-nav'
import HeadNav from '../../components/head-nav'
import { Loadmore } from 'mint-ui'
export default {
    data () {
      return {
        decline:false,
        checkedData:[],
        type: 1,
        menus: [
          {
            name:'推荐', 
            isOn: false,
            type: 1,
            datas:[
              {name:'推荐', type:0,  isOn:false},
              {name:'最新', type:1, isOn:false},
            ]
          },
          {
            name:'地址', 
            isOn: false,
            type: 2,
            datas:[
              {name:'全国', isOn:false},
              {name:'北京', isOn:false},
              {name:'深圳', isOn:false},
              {name:'上海', isOn:false},
              {name:'广州', isOn:false},
              {name:'杭州', isOn:false},
              {name:'长沙', isOn:false}
            ]
          },
          {
            name:'要求', 
            isOn: false,
            type: 3,
            datas:[
              {name:'限投资总监以上', typ:1, isOn:false}
            ]
          }
        ],
        isClick: false,
        paramCondition : {
          pageNo : 1,
          pageSize : 1,
          // choose : 0
        },
        allLoaded: false
      
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        // console.log(this)
      })
    },
    created () {
      this.get_starup_list(this.paramCondition);
    },
    components: {
      HeadNav,
      Loadmore
    },
    watch: {

    },
    computed: mapGetters({
        userInfo: 'userInfo',
        startUpList: 'startUpList'
    }),
    methods: {
      ...mapActions([
        'get_index_data',
        'get_starup_list',
        'more_get_starup_list'
      ]),
      chat(e) {
        e.target.style='background-color:#c7c7c7;'
      },
      detail() {
        if(!this.userInfo.isLogon) return
          
        this.$router.push({path: '/invesit_detail/'+this.userInfo.type});
      },
      getCondition(condidtion, type) {
        let param = {
          pageNo : 1,
          pageSize : 10,
        }
        // param = this.paramCondition
        console.log(condidtion)
        console.log(type)
          if(type == 1) {
          if(condidtion == '推荐') {
            param.choose = 0;
          } else {
          param.choose = 1;
          }
        } else if (type == 2) {
          param.city = condidtion.toString();
        } else {
          param.investorType= condidtion;
        }
        this.get_starup_list(param);
      },
      loadTop() {
        let self = this

        this.more_get_starup_list(this.paramCondition).then(function(){
          
           self.$refs.loadmore.onTopLoaded();
        });
      },
      loadBottom() {
        let self = this
        // 加载更多数据
        // this.allLoaded = true;// 若数据已全部获取完毕
         // this.more_get_starup_list(this.paramCondition);
         console.log(self.$refs.loadmore)
         // self.$refs.loadmore.onBottomLoaded();
         console.log(this.$el.getBoundingClientRect().bottom)
         // this.$log(this.scrollEventTarget.getBoundingClientRect().bottom)
        
        // this.$refs.loadmore.onBottomLoaded();
      }
  
  }
};
</script>

<style lang='scss' scoped>
.home-container{
  width:100%;
  /*font-size: .6rem;*/
  color:#d5d5d5;
  .startup-list{
    clear: both;
    padding-top: .94rem;
  }
  .fomtip{
      width:100%;bottom:0;
      min-height:100vh;
      background:rgba(0, 0, 0,  0.6)!important;
      filter:Alpha(opacity=60);
      position: absolute;
      top: .94rem;
      .off{
        color:#53cbbd;
      }
  }
  .city{
    background: #ffffff;
    width: 100%;
    padding-left: 1.08rem;
    text-align: left;
    font-size: .28rem;
    height: .94rem;
    line-height: .94rem;
    &.off{
      color:#53cbbd;
    }
  }
  .weui-cell__bd{
    width: 1rem;
  }
  .weui-icon-success{
    color:#d5d5d5;
    &.off{
      color:#53cbbd;
    }
  }
  .weui-cell{
    padding-left: 1rem;
    padding: 0 .30rem 0 1rem;
    p{
      text-align: left;
      height: 1rem;
      line-height: 1rem;
    }
  }
  .weui-cells{
    margin-top: 0;

  }
  .off:before{
    color: #53cbbd;
  }
  .weui-cells_checkbox .weui-check:checked+.weui-icon-checked:before{
    color: #53cbbd;
    content: '\EA06';
  }
  .weui-cells_checkbox .weui-icon-checked:before{
    content: '\EA06';
  }
  .context{
    color:#666666;
    margin: 0 auto;
    width: 95%;
    height: 2.38rem;
    background: #fff;
    margin-top: .2rem;
    border-radius: .12rem;
    clear:both; 
    span{
      font-size: .3rem;
      height: .5rem;
      font-weight:bold;
      display:inline; 
      float:left; 
      margin-right: .2rem
      /*width: 1.2rem;*/
    }
    .info2{
      float: left;
      width: 80%;
      .p1{
        height: .5rem;
        line-height: .5rem;
      }
    }
    .info{
      margin: 0 auto;
      width: 90%;
      height: 1.6rem;
      border-bottom: 1px solid #d5d5d5;
      /*float: left;*/
    }
    p{
      width: 85%;
      /*float: left;*/
      font-size: .24rem;
      text-align: left;
      margin-left: .26rem;
      margin-top: .07rem;
      height: .3rem;
      line-height: .28rem;
      overflow: hidden;
    }
    .img-log{
      border-radius: 50%;
      width: 1.18rem;
      height: 1.18rem;
      line-height: 2rem;
      float: left;
      margin: .16rem 0 0 0;
      background-image: url('../../assets/images/defaulthead.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 1.18rem 1.18rem;
    }
    .logo-v{
      height: .32rem ;
      background-image: url('../../assets/images/vip-v.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: .32rem .32rem;
      width: .32rem;
      /*position: relative;*/
      /*left: 1.38rem;*/
      margin-left: .91rem;
      /*margin-top: 1rem;*/
      z-index: 1;
      margin-left: .81rem;
        margin-top: .8rem;
      
    }
    .apply_info{
      width: 100%;
      float: left;
      height: .7rem;
      /*line-height: .7rem;*/
      padding: .14rem 0 0 0;
      p{
        float: left;
        width: 72%;
        color: #d5d5d5;
        /*padding-left: 1rem;*/
        i{
          padding-left: .2rem;
        }
      }
      p:before{
        content: '';
          /*position: absolute;*/
          z-index: 2;
          width: 6%;
          height: .2rem;
          background: url('../../assets/images/eyes.png') no-repeat left center;
          background-position: center;
          background-size: .36rem;
          display: inline-block;
          margin-left: .1rem
      }
      .margins2{
        float: left;
        width: 1.4rem;
        height: .5rem;
        line-height: .5rem;
        font-size: .24rem;
        margin-top:0;

      }
      .button-disable{
        background-color:#c7c7c7;
      }
    }
    
  }
}
</style>