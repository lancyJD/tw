import Vue from 'vue'
import VueResource from 'vue-resource'

// Javascript
Vue.use(VueResource)

// HTTP相关
Vue.http.options.emulateJSON = true
Vue.http.options.crossOrigin = true

Vue.http.options.root = 'http://test.heatup.cn/api'

export default {

  //获取首页数据
  	geIndextData(cb) {
		// ref.on("value", function(snapshot) {
		// 	console.log(snapshot.val())
		// 	cb(snapshot.val());
		// });
  	},
  	addTodo(todo, cb) {
  		// var key = ref.key();
    	//  ref.push({"todo":todo,"id":new Date().getTime()})
	   //  .then(function(){
	   //      console.info('set data success.')
	   //  })
	   //  .catch(function(err){
	   //      console.info('set data failed', err.code, err);
	   //  });
    }
  
}
