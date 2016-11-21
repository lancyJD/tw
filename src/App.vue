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
  .view{
      
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


}
</style>
