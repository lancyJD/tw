<template>
	<div class='nav-container'>
        <nav>
            <template v-for="item in index_nav">
                
                    <a @click='go(item)'>
                        <dt  class="iconfont" :class="[item.isActive ? item.activeClass :  item.iconClass]">
                            <i v-if="item.hint.count" v-text="item.hint.count | get_prompt " :class="'_news-'+item.hint.type"></i> 
                        </dt>
                        <dd :class="[item.isActive ? 'no-logon' :  '']" v-text="item.text"></dd>
                    <a>
               <!--  </template>
                <template v-else>
                    <a>
                        <dt  @click='tip' class="iconfont" :class="[item.isActive ? item.activeClass :  item.iconClass]">
                            <i v-if="item.hint.count" v-text="item.hint.count | get_prompt " :class="'_news-'+item.hint.type"></i> 
                        </dt>
                        <dd :class="[item.isActive ? 'no-logon' :  '']" v-text="item.text"></dd>
                    </a>
                </template> -->
           </template> 
            
        </nav>
  </div>
</template>

<script>
import '../assets/css/iconfont.css'
import { mapGetters, mapActions,mapMutations } from 'vuex'
export default {
    data () {
        return {
          isActive: true,
          // index_nav:[]
        };
    },
    filters: {
          get_prompt(hint) {
              return hint.count
          }
    },
    watch:{
        path:function(val){
            console.log(val)
            for (var i = this.index_nav.length - 1; i >= 0; i--) {
                if(this.path == this.index_nav[i].path.path){
                    console.log('>>>>>>>>>>>>>>>')
                    this.set_menu_active(this.index_nav[i].index)
                }
            }
        }
    },
    computed: mapGetters({
        index_nav: 'indexNav',
        userInfo: 'userInfo',
        type: 'type',
        path: 'path'
    }),
    methods: {
        ...mapActions([
            'set_menu_active'
        ]),
        go(item) {
            this.set_menu_active(item.index);
            this.$router.push({path: item.path.path});
        },
        tip() {
            let self = this
            Vue.info('信息', '请填写项目资料，若已完成请等待审核，联系方式：0731-89707428');
        }
    }
 
};
</script>

<style lang='scss'  scoped>
@import '../assets/css/bass.scss';
nav {
    @include flex-box;
    width: 100%;
    overflow: hidden;
    height: 50px;
    padding-top: 8px;
    background: #ffffff;
    font-size: 12px;
}

nav a {
    user-select: none;
    -webkit-user-select: none;
    flex-grow: 1;
    text-align: center;
    line-height: 1;
    width: 33.3%;
    float: left;
}

nav a.router-link-active a,
nav a.router-link-active dt,
nav a.router-link-active dd {
    color: #53cbbd;
}
.no-logon{
    color: #53cbbd;
}

nav dt {
    position: relative;
    width: 28px;
    height: 28px;
    margin: 0 auto;
    font-size: 28px;
    color: #797979;
    margin-bottom: 2px;
}

nav dd {
    color: #929292;
    transform-origin: 50% 0;
    transform: scale(0.9);
    font-size: .24rem
}

nav ._news-dot {
    right: -2px;
    top: -3px;
    width: 11px;
    height: 11px;
}

 ._news-count {
    position: absolute;
    font-style: initial;
    font-family: PingFang SC, Hiragino Sans GB, Arial, Microsoft YaHei, Helvetica;
    right: -9px;
    top: -5px;
    z-index: 2;
    padding: 0 4px;
    width: auto;
    min-width: 18px;
    height: 18px;
    line-height: 18px;
    border-radius: 9px;
    color: #ffffff;
    text-align: center;
    font-size: 14px;
    background-color: #f43531;
}



/*消息气泡*/

._news-count {
    position: absolute;
    font-style: initial;
    font-family: PingFang SC, Hiragino Sans GB, Arial, Microsoft YaHei, Helvetica;
    right: -9px;
    top: -5px;
    z-index: 2;
    padding: 0 4px;
    width: auto;
    min-width: .2rem;
    height: .36rem;
    line-height: .36rem;
    border-radius: .18rem;
    color: #ffffff;
    text-align: center;
    font-size: .24rem;
    background-color: #f43531;
}

.app-footer ._news-count {
    left: 100%;
    margin-left: -10px;
    right: initial;
}

._news-dot {
    position: absolute;
    right: -3px;
    top: -3px;
    width: 10px;
    height: 10px;
    z-index: 2;
    border-radius: 50%;
    color: #ffffff;
    text-align: center;
    background-color: red;
    background-color: #f43531;
    font-size: 0;
}

.investor{
    background-image: url('../assets/images/investor-none.png');
}
.investor-active{
     background-image: url('../assets/images/investor-active.png');
}
.message{
    background-image: url('../assets/images/message-none.png');
}
.message-active{
    background-image: url('../assets/images/message-active.png');
}
.me{
    background-image: url('../assets/images/me-none.png');
}
.me-active{
    background-image: url('../assets/images/me-active.png');
}

.project{
    background-image: url('../assets/images/project.png');
}
.project-active{
    background-image: url('../assets/images/project-active.png');
}
</style>