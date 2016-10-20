<template>
	<section>
      	<div class='bar'>
	        <div v-for="item in index_nav"   class="nactive">
	           <router-link class='link' :to="item.path">{{item.text}}</router-link>
             <div class='font_bottom'>{{item.text}}</div>
	        </div>
	       <!--  <div class="nactive">
	        	<router-link to="/bar">22</router-link>
	        </div>
	        <div class="nactive">
	        	<router-link to="/foo">33</router-link>
	        </div>
	        <div class="nactive">
	        	<router-link to="/foo">44</router-link>
	        </div> -->
      	</div>

    <!-- <nav>
        <dl v-for="item in index_nav" v-link="item.path" >
            <dt class="iconfont" :class="item.iconClass">
                <i v-if="item.hint.count" v-text="item.hint | get_prompt " :class="'_news-'+item.hint.type"></i>
            </dt>
            <dd v-text="item.text"></dd>
        </dl>
    </nav>
    </section> -->
</template>

<script>

// import { indexNav } from 'getters'
// import { get_index_nav, set_menu_active} from 'actions'
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