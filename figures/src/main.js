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
import NotFound from '@/components/NotFound'

const routes = [
  { path: '/', name: 'List figures', component: list, meta: {title: 'List figures'} },
  { path: '/AddFigures', name: 'Add figures', component: add, meta: {title: 'Add figures'} },
  { path: '/Statistics', name: 'Statistics figures', component: statistics, meta: {title: 'Statistics figures'} },
  { path: '*', name: '404 Not Found', component: NotFound, meta: {title: '404 Not Found'} },
]

const router = new VueRouter({
  mode: 'history',
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
})



new Vue({
  render: h => h(App),
  router
}).$mount('#app')

