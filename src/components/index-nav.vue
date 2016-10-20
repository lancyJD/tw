<template>
	<section>
      	<div class='bar'>
	        <div  class="nactive">
	          <router-link to="/foo">11</router-link>
	        </div>
	        <div class="nactive">
	        	<router-link to="/bar">22</router-link>
	        </div>
	        <div class="nactive">
	        	<router-link to="/foo">33</router-link>
	        </div>
	        <div class="nactive">
	        	<router-link to="/foo">44</router-link>
	        </div>
      	</div>
    </section>
</template>

<script>
export default {

  name: 'component_name',

  data () {
    return {

    };
  }
};
</script>

<style lang="less" scoped>
</style>