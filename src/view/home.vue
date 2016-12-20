<template>
	<div class='home-container'>

	<!-- 	<swiper :options="swiperOption">
	      <swiper-slide v-for='item in indexData'>
	      	<img :src="item.imageUrl" />
	      </swiper-slide>
	      <div class="swiper-pagination" slot="pagination"></div>
	    </swiper>
	    <section>
	    	<div class='master-video'>
	    		<ul class='title'>
	    			<li class='video-left'>教练视频</li>
	    			<li class='video-rigth'>更多>></li>
	    		</ul>
	    	</div>
	    </section> -->
	   <!--  <section>
	    	<div class='section'>
	    		<input class='search' placeholder="请输入关键字搜索" @focus='inFocus' :value="message" @input="updateMessage">
	    	</div>
	    	<div class='seachHistory' v-show='isHaveStr'>
	    		{{message}}
	    	</div>
	    </section> -->
	    <section>
	    	<div>
	    		<input class='search add' placeholder="添加条目" :value="todo" @input="updateTodo"> <div @click='addTodo(todo)' class='todo'>添加</div>
	    	</div>
	    	<div v-for='item in todo' class='seachHistory' v-show='isHaveStr'>
	    		<!-- {{item.}} -->
	    	</div>
	    </section>
	</div>
</template>

<script>
import { swiper, swiperSlide, swiperPlugins } from 'vue-awesome-swiper'
import { mapGetters, mapActions, mapMutations  } from 'vuex'
export default {
  data () {
    return {
    	swiperOption: {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoplay: 2000
        },
        keyWord: null,
        isHaveStr: false
      }
  },
	
  computed: mapGetters({
    indexData: 'indexData',
    message: 'message',
    todoArr: 'todo'
  }),
 
  created () {
    this.$store.dispatch('get_index_data')
  },
   components: {
    swiper,
    swiperSlide,
    swiperPlugins
  },
  methods: {
  		...mapActions([
  			'addTodo'
  		]),
  		updateTodo: function (e) {

  			this.$store.commit('ADD_TODO', e.target.value);
  		},
	  	updateMessage: function (e) {
	    	this.$store.commit('UPDATE_MSG', e.target.value)
	  	} ,
		inFocus:function(event) {
			if (event) event.preventDefault()
			this.isHaveStr = true;
		}
	}
};
</script>

<style lang='less' scoped>
.home-container{
	width:100%;
	font-size: .14rem;
	.swiper-container{
	 	width: 100%;
    	height: auto;
    	img{
    		width: 100%;
    		height: auto;
    	}
	}
	.master-video{
		height: .5rem;
		/*line-height: .5rem;*/
		font-size: .2rem;
		padding: 0 .2rem 0 .2rem;
		li{
			width: 50%;
			float: left;
		}
		.title{
			/*height: 1rem;*/
			background-color: #fff;
			text-align: left;
			.video-rigth{
				text-align: right;
			}

		}
	}
	.search{

		width: 85%;
		height: .5rem;
		font-size: .12rem;
		&.add{
			width:55%;
			float: left;
			margin-left: .5rem;
		}
	}
	.seachHistory{
		height: 1rem;
		width: 85%;
		text-align: left;
		margin-left:.5rem;
		font-size: .2rem;
	}
	.todo{
		height: .6rem;
		line-height: .6rem;
		font-size: .2rem;
		width: 25%;
		float: left;
		border-radius: .6rem;
		background-color: #1ab394;
		color: #fff;
		margin-left: .3rem;
	}
	section{
		margin-top:1rem;
	}
}
</style>