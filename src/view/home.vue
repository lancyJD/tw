<template>
	<div class='home-container'>

		<swiper :options="swiperOption">
	      <swiper-slide v-for='item in indexData'>
	      	<img :src="item.imageUrl" />
	      </swiper-slide>
	      <div class="swiper-pagination" slot="pagination"></div>
	    </swiper>
	    <section>
	    	<div class='master-video'>
	    		<div class='title'>
	    			<span class='video-left'>教练视频</span>
	    			<span class='video-rigth'>更多</span>
	    		</div>
	    	</div>
	    </section>

	</div>
</template>

<script>
import { swiper, swiperSlide, swiperPlugins } from 'vue-awesome-swiper'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
    	swiperOption: {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoplay: 2000
        }
      }
  },
  computed: mapGetters({
    indexData: 'indexData'
  }),
  methods: mapActions([
    // 'get_index_data'
  ]),
  created () {
    this.$store.dispatch('get_index_data')
  },
   components: {
    swiper,
    swiperSlide,
    swiperPlugins
  }
};
</script>

<style lang='less' scoped>
.home-container{
	width:100%;
	.swiper-container{
	 	width: 100%;
    	height: auto;
    	img{
    		width: 100%;
    		height: auto;
    	}
	}
	.master-video{
		height: 2rem;
		font-size: .2rem;
		.title{
			height: 1rem;
			background-color: #fff;
			text-align: left;
			.video-rigth{
				text-align: right;
			}
		}
	}
}
</style>