import Vue from 'vue'
import VueResource from 'vue-resource'

// Javascript
Vue.use(VueResource)

// HTTP相关
Vue.http.options.emulateJSON = true
Vue.http.options.crossOrigin = true

 // Vue.http.options.root = 'http://test.heatup.cn/api'

import wilddog from 'wilddog'

var config = {
  syncURL: "https://lusa.wilddogio.com" //输入节点 URL
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref('/data');


// Vue.http.interceptors.push({
//   request (request) {
//     // 这里对请求体进行处理
//     return request
//   },
//   response (response) {
//     // 这里可以对响应的结果进行处理
//     return response
//   }
// })
export default {

  //获取首页数据
  geIndextData(cb) {
     ref.on("value", function(snapshot) {
     	console.log(snapshot.val())
	    cb(snapshot.val());
	});

  },
  
}
