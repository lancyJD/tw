<template>

    	<div class="weui-search-bar" :class="isFocus ? 'weui_search_focusing':''" id="searchBar">
	        <form class="weui-search-bar__form">
	            <div class="weui-search-bar__box">
	                <i class="weui-icon-search"></i>
	                <input type="search" @input="input" @focus="s_focus" @blur="blur" v-model="searchVal" class="weui-search-bar__input" id="searchInput" placeholder="搜索" required="">
	                <a href="javascript:" class="weui-icon-clear" @touchend="reset" v-show="hasVal" id="searchClear"></a>
	            </div>
	            <label :for="searchInput" class="weui-search-bar__label" id="searchText" style="transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);">
	                <i class="weui-icon-search"></i>
	                <span>搜索</span>
	            </label>
	        </form>
	        <a href="javascript:" class="weui-search-bar__cancel-btn" id="searchCancel">取消</a>
    	</div>

</template>

<script type="text/javascript">
	export default {
		data(){
			return {
				isFocus: true,
				searchVal: null,
				hasVal: false
			}
		},
		methods: {
			s_focus () {
				this.isFocus = true
			},
			blur() {
				this.isFocus = true
			},
			reset() {

			},
			input() {

			}

		}
	}
</script>