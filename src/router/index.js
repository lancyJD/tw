import Vue from 'vue'
import VueRouter from 'vue-router'

import Bar from '../components/Bar.vue'
import Foo from '../components/Foo.vue'
import Home from '../view/home'

Vue.use(VueRouter)


const routes = [
  	{ path: '/foo', component: Foo },
  	{ path: '/bar', component: Bar },
  	{ path: '/home', component: Home }
]

const router = new VueRouter({
	base: __dirname,
  	routes // （缩写）相当于 routes: routes
})

export default router