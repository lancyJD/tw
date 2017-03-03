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
    <section :class="{'welcome':welcome, 'jianyinanicss':box}" id='box' translate="welcome"  v-show="welcome" >
       <swiper :options="swiperOption">
        <!--  -->
        <swiper-slide>
            <!-- <img src="./assets/images/artboard.png"> -->

            <div @click='hiddenBtn' class='bg-start'>
              <img src="./assets/images/logo.png">
              
            </div>
            <div @click='hiddenBtn' class='g-botton'>创业者</div>  
            <div @click='hiddenBtn' class='g-botton margins1'>投资者</div> 
        </swiper-slide>
        <div class="swiper-pagination margins" slot="pagination"></div>
      </swiper>
    </section>
  </div>
</template>

<script>
import IndexNav from './components/index-nav'
import { swiper, swiperSlide, swiperPlugins } from 'vue-awesome-swiper'
import './assets/css/bass.scss'
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
    // 
   
  },
  methods:{
    hiddenBtn(e) {
      let self = this

      setTimeout(function() {
        self.box = true;
        self.appload = true;
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

<style lang='less' scope>

#app {
     font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
   /* img{
      width: 100%;
      height: 100%;
    }*/
    .bg-start{
      background-image: url('./assets/images/loginstart.png');
      height: 50%;
      width: 100%;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      img{
        width: 2.66rem;
        /*height: 1.33rem;*/
        margin-top: 1rem;
        
      }
    }
    .margins{
      margin-top: 1rem;
    }
    .margins1{
      margin-top: .94rem;
      background-color: #f6f6f6;
      color:#868686;
      border: 1px solid #53cbbd;
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


  .app-footer ._news-count {
    left: 100%;
    margin-left: -10px;
    right: initial;
  }


}
</style>
