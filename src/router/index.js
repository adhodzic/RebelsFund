import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/login',
    name:'login',
    component: () => import(/* webpackChunkName: "tv-shows" */ '../views/Login.vue')
<<<<<<< HEAD
  },
  {
    path:'/profile',
    name:'profile',
    component: () => import(/* webpackChunkName: "tv-shows" */ '../views/Profile.vue')
=======
>>>>>>> origin/login-v1.0
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
