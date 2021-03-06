import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

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
    name:'Profile',
    component: () => import(/* webpackChunkName: "tv-shows" */ '../views/Profile.vue')
  },
  {
    path: '/:id',
    props: true,
    name: 'Fund-Details',
    component: () => import(/* webpackChunkName: "post-detail" */ '../views/FundDetails.vue')
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
