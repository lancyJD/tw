<template>
  <div id="app">
    
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <transition name="fade" mode="out-in">
      <router-view class='view'></router-view>
    </transition>


    <IndexNav></IndexNav>
  </div>
</template>

<script>
import IndexNav from './components/index-nav'

export default {
  name: 'app',
  components: {
    IndexNav
  }
}
</script>

<style lang='less'>


#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  .bar{
    float: left;
    height: 30px;
    line-height: 30px;
    width: 100%;
    bottom: 0;
    position: absolute;
    .nactive{
      float: left;
      width: 25%;
      line-height: 30px;
      height: 30px
    }
  }
  .view{
      max-width:  800px;
      margin:  0 auto;
      position:  relative;
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
/* 
@media (max-width 860px)
  .header .inner
    padding 15px 30px

@media (max-width 600px)
  body
    font-size 14px
  .header
    .inner
      padding 15px
    a
      margin-right 1em
    .github
      display none */

}
</style>
