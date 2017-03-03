<template>
	<div class='message-head'>
		<ul>
			<template  v-for="(item, $index) in menus" >
				<li @click='selectMenu(item, $index)' :class="[item.isOn ? 'active' :'', $index == 2 ? 'last' :'']">{{item.name}}</li>
			</template>
		</ul>
	</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
	export default {
		data() {
			return {
				type:null
			}
		},
		props:{
	  		menus:{
		  		type:Array,
		  		required:true
	  		}
  		},
		methods: {
			selectMenu(item, $index) {
	   			this.menus.filter(function(item, index){
				  		if(index == $index) {
				  			item.isOn = true;
				  		} else {
				  			item.isOn = false;
				  		}
				  		return item
				});
	        	this.$emit('gettype', item.type);
			}
		}
	
	}
</script>
<style lang='scss' scoped>
	.message-head{
		width:100%;
		position: fixed;
		/*font-size: .6rem;*/
		color:#d5d5d5;
	  	ul{
		  	width: 100%;
		  	font-size:14px;
			color:#d5d5d5;
			letter-spacing:0px;
			text-align:center;
			height: .94rem;
			line-height: .94rem;
			background: #fff;
		  	li{
		  		width:33.06%;
		  		float: left;
		  		height: .38rem;
		  		line-height: .38rem;
		  		border-right: 1px solid #d5d5d5;
		  		display:inline;
		  		margin-top: .32rem
		  	}
		  	.last{
		  		border-right: 0;
		  	}
		  	.active{
		  		color:#53cbbd;
		  	}
	  	}


	}
</style>