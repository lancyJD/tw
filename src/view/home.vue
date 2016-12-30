<template>
	<div class='home-container'>
	  	<search></search>    
	  	<section><div>大家好我就是台风。</div></section>
	</div>
</template>

<script>
import { swiper, swiperSlide, swiperPlugins } from 'vue-awesome-swiper'
import { mapGetters, mapActions, mapMutations  } from 'vuex'
import search from '../components/search'
export default {
  data () {
    return {
    	swiperOption: {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoplay: 2000
        },
        keyWord: null,
        isHaveStr: false,
        isFocus: false,
        searchVal: "",
        hasVal: false
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
    swiperPlugins,
    search
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
		},
		s_input() {
			console.log('>>>>>>>');
            if (this.searchVal !== '') {
                this.hasVal = true;
            } else {
                this.hasVal = false;
            }
        },
        s_focus() {
        	console.log('>>>2>>>>');
            this.isFocus = true;
        },
        s_blur() {
        	console.log('>>3>>>>>');
            this.isFocus = false;
        },
        reset_val() {
        	console.log('>>>>4>>>');
            this.searchVal = ''
        }
	}
};
</script>

<style lang='less' scoped>
.home-container{
	width:100%;
	font-size: .2rem;
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