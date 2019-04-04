import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import list from '@/pages/List'
import add from '@/pages/Add'
import statistics from '@/pages/Statistics'

const routes = [
  { path: '/', name: 'list', component: list },
  { path: '/add', name: 'add', component: add },
  { path: '/statistics', name: 'statistics', component: statistics },
]

const router = new VueRouter({
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
})


new Vue({
  render: h => h(App),
  router
}).$mount('#app')

