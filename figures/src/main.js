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

import CircleComponent from '@/components/Figures/CircleComponent'
import RectangleComponent from '@/components/Figures/RectangleComponent'
import SquareComponent from '@/components/Figures/SquareComponent'
import TriangleComponent from '@/components/Figures/TriangleComponent'

const routes = [
  { path: '/', component: list, meta: {title: 'List figures'} },
  { 
    path: '/AddFigures',
    component: add,
    meta: {title: 'Add figures'},
    children: [
      {
        path: '',
        component: CircleComponent,
        meta: {title: 'Add figures | Circle'}
      },
      {
        path: 'Circle',
        component: CircleComponent,
        meta: {title: 'Add figures | Circle'}
      },
      {
        path: 'Rectangle',
        component: RectangleComponent,
        meta: {title: 'Add figures | Rectangle'}
      },
      {
        path: 'Square',
        component: SquareComponent,
        meta: {title: 'Add figures | Square'}
      },
      {
        path: 'Triangle',
        component: TriangleComponent,
        meta: {title: 'Add figures | Triangle'}
      },
    ]
  },
  { path: '/Statistics', component: statistics, meta: {title: 'Statistics figures'} },
  { path: '*', component: NotFound, meta: {title: '404 Not Found'} },
]

const router = new VueRouter({
  mode: 'history',
  routes: routes,
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
})



new Vue({
  render: h => h(App),
  router
}).$mount('#app')

