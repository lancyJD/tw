<template>
	<div class='nav-container'>
        <nav>
            <router-link v-for="item in index_nav" :to="item.path.path" @click="set_menu_active($index)">
                <dt class="iconfont" :class="item.iconClass">
                    <i v-if="item.hint.count" v-text="item.hint.count | get_prompt " :class="'_news-'+item.hint.type"></i> 
                </dt>
                <dd v-text="item.text"></dd>
            </router-link>
        </nav>
  </div>
</template>

<script>
import '../assets/css/iconfont.css'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      isActive: true
    };
  },
  filters: {
      get_prompt(hint) {
        alert(hint);
          return hint.count
      }

  },
  computed: mapGetters({
    index_nav: 'indexNav'
  }),
  methods: {
    ...mapActions([
      'addToCart',
      'set_menu_active'
    ])
  },
  created () {
    this.$store.dispatch('get_index_nav')
  }
};
</script>

<style lang='less'  scoped>
nav {
    display: flex;
    width: 100%;
    overflow: hidden;
    height: 50px;
    padding-top: 8px;
    background: #f9f9f9;
    font-size: 12px;
}

nav a {
    user-select: none;
    -webkit-user-select: none;
    flex-grow: 1;
    text-align: center;
    line-height: 1;
}

nav a.router-link-active a,
nav a.router-link-active dt {
    color: #0bb908;
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
    min-width: 18px;
    height: 18px;
    line-height: 18px;
    border-radius: 9px;
    color: #ffffff;
    text-align: center;
    font-size: 14px;
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

</style>