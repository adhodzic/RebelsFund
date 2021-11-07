import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path:'/login',
    name:'Login',
    component: () => import(/* webpackChunkName: "tv-shows" */ '../views/Login.vue'),
  },
  {
    path:'/profile',
    name:'profile',
    component: () => import(/* webpackChunkName: "tv-shows" */ '../views/Profile.vue')
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
