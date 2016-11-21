<template>
	<div class='nav-container'>
    <ul class="icon_lists clear">
           
            <router-link  tag="li" to="/home">
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-msnui-hot"></use>
              </svg>
              <div class="name">热门</div>
             </router-link>
            
            <router-link  tag="li" to="/bar">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-20150325094323471easyiconnet"></use>
                </svg>
                <div class="name">檬课</div>
            </router-link>
             <router-link  tag="li" to="/foo">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-wo"></use>
                </svg>
                <div class="name">檬店</div>
            </router-link>
             <router-link  tag="li" to="/foo">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shangdian"></use>
                </svg>
                <div class="name">我的</div>
            </router-link>
    </ul>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {};
  },
  computed: mapGetters({
    index_nav: 'indexNav'
  }),
  methods: mapActions([
    'addToCart'
  ]),
  created () {
    this.$store.dispatch('get_index_nav')
  }
};
</script>

<style lang='less'  scoped>
.icon {
  /* 通过设置 font-size 来改变图标大小 */
  width: .5rem; height: .5rem;
  /* 图标和文字相邻时，垂直对齐 */
  /* 通过设置 color 来改变 SVG 的颜色/fill */
  fill: currentColor;
  /* path 和 stroke 溢出 viewBox 部分在 IE 下会显示
     normalize.css 中也包含这行 */
  overflow: hidden;
}
.nav-container{
  height: 100vh;
}
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
  .font_bottom{
    font-size: 12px;
    bottom: 2px;

  }
  .link{

  }

/* nav dl.v-link-active dl,
nav dl.v-link-active dt {
    color: #0bb908;
} */

</style>