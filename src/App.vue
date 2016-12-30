<template>
  <div id="app">
    
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <section  v-show="appload">
      <transition name="fade" mode="out-in">
        <router-view keep-alive class='view'></router-view>
      </transition>

      <footer class="app-footer _line-fine">
          <div class="_effect " :class="{'_effect--50':decline}">
              <index-nav></index-nav>
          </div>
      </footer>   
    </section>
    <section class="mobile-tips"  v-show="isnotMobile">
        <div class="mobile-tips-inner">
            <div class="mobile-model"> <img src="./assets/images/mobile.png" alt=""></div>
            <p><br>为保证最佳用户体验,<br></p>
            <p class="_align-left">1.请用chrome移动设备调试模式(F12)下打开</p>
            <p class="_align-left">2.手机浏览器访问</p>
            <br>
            <button class="weui_btn weui_btn_mini weui_btn_primary" @click='isnotMobile = false'>关闭</button>
        </div>
    </section>
    <section :class="{'welcome':welcome, 'jianyinanicss':box}" id='box' translate="welcome"  v-show="welcome" >
       <swiper :options="swiperOption">
       
        <swiper-slide>
            <img src="./assets/images/sb2.jpg">
            <div @click='hiddenBtn' class='button1'>开启SB生活</div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </section>
  </div>
</template>

<script>
import IndexNav from './components/index-nav'
import { swiper, swiperSlide, swiperPlugins } from 'vue-awesome-swiper'
import './assets/css/bass.css'
export default {
  data(){
    return {
      pagination: '.swiper-pagination',
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      coverflow: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows : true
      },
      appload: false,
      isnotMobile: false,
      welcome: true,
      box:false
    }
  },
  name: 'app',
  
  created() {
    let isMobile = function() {
      let userAgentInfo = navigator.userAgent;
      let agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
      let flag = false;
      for (let v = 0; v < agents.length; v++) {
          if (userAgentInfo.indexOf(agents[v]) > 0) { flag = true; break; }
      };
      return flag;
    }();
    if(!isMobile){
        this.isnotMobile = true;
    }
    this.appload = true;
   
  },
  methods:{
    hiddenBtn(e) {
      let self = this

      setTimeout(function() {
        self.box = true;
      setTimeout(function (){
        $('#box').remove()
      },1000);
    }, 1000);
    }
  },
  components: {
      swiper,
      swiperSlide,
      swiperPlugins,
       IndexNav
  }
}
</script>

<style lang='less'>

#app {
     font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
  .view{
      margin:  0 auto;
      position:  relative;
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

    .jianyinanicss{
        animation: jianyin 1.5s 1;
        -webkit-animation: jianyin 1.5s 1;
        animation-fill-mode: forwards;
        -webkit-animation-fill-mode: forwards;
    }
  .swiper-inner {
    width: 100%;
    height: 4rem;
    padding-top: 5rem;
    padding-bottom: 5rem;
  }
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100%;
    z-index: 1000;
    left: 0;
    top: 0;
    img{
      width: 100%;
      height: 100%;
    }
    .button1{
      position: absolute;
      top: 80%;
      left: 30%;
      height: .8rem;
      line-height: .8rem;
      border-radius: .6rem;
      width: 3rem;
      font-size: .5rem;
      color: #49ad0d;
      border: 1px solid #49ad0d;
    
    }
  }
  .swiper-container{
    height: 100%;
  }

  .welcome {
    width: 100%;
    height: 100%;
    z-index: 1000;
    position: fixed;
    left: 0;
    top: 0;
    transition: .25s all linear;
    /*background: url(./assets/images/launchimage.png) no-repeat center center;*/
    background-size: cover;
  }


  .fade-enter-active, .fade-leave-active {
    transition:  all .3s ease
  }

  .fade-enter, .fade-leave-active{
    opacity: 0
  }

  .back-transition { 
    transition: transform .5s ease;
  }
  .back-enter{
    transform: translate(100%,0);
  }
  .back-leave {
    transform: translate(-100%,0);
  }


  .app-footer {
      bottom: 0;
      left: 0;
      width: 100%;
      position: absolute;
      z-index: 3;
  }

  .app-footer ._news-count {
    left: 100%;
    margin-left: -10px;
    right: initial;
  }


}
</style>
