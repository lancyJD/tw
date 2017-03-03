<template>
  <div id="app">
    
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <section id='app-content' class="app-content" >
        <transition name="fade" mode="out-in">
          <router-view class='view'></router-view>
        </transition>
    </section>
    <footer class="app-footer _line-fine" v-show='isNeedNav'>
          <div class="_effect " :class="{'_effect--50': !isNeedNav}">
              <index-nav></index-nav>
          </div>
    </footer>
  </div>
</template>

<script>
import IndexNav from './components/index-nav'
import { swiper, swiperSlide, swiperPlugins } from 'vue-awesome-swiper'

import { mapGetters, mapActions, mapMutations  } from 'vuex'

export default {
  data(){
    return {
      // decline:false
      path: null
    }
  },
  name: 'app',
  created() {
      // this.get_index_nav();
  },
  methods:{
      ...mapActions([
        // 'get_index_nav',
        'set_user_info'
      ])
  },
  computed: mapGetters({
    isNeedNav: 'isNeedNav'
  }),
  components: {
     IndexNav
  }
}
</script>

<style lang='less' scope>

#app {
  font-family:PingFangSC-Regular;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
  background-color: #f6f6f6;
  height: 100%;
  .view{
      margin:  0 auto;
      position:  relative;
      z-index: 1;
  }

    @keyframes jianyin
    {
    from {opacity:1;}
    to {opacity:0;}
    }

    @-webkit-keyframes jianyin /* Safari 和 Chrome */
    {
    from {opacity:1;}
    to {opacity:0;}
    }

.fade-enter-active .fade-leave-active{
  transition: all .2s ease;
}

.fade-enter .fade-leave-active{
  opacity: 0;
}

  .app-content {
    /*padding-bottom: 18%;*/
    /*overflow: hidden;*/
    position: relative;
    /*min-height: 100vh;*/
    height: 100%;
  }

  .app-content ._full_inner {
      z-index: 2;
  }

}
</style>
