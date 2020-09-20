import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'
import Home from '../views/Home.vue'
import DetailCategory from '../views/DetailCategory.vue'
import PartnerJudges from '../views/PartnerJudges.vue'


Vue.use(VueRouter)
Vue.use(VueMeta)

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  // },
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/tos',
    name: 'tos',
    component: Home
  },
  {
    path: '/refund-policy',
    name: 'refund-policy',
    component: Home
  },
  {
    path: '/privacy-policy',
    name: 'privacy-policy',
    component: Home
  },
  {
    path: '/detail-category',
    name: 'detail-category',
    component: DetailCategory
  },
  {
    path: '/partner-judges',
    name: 'partner-judges',
    component: PartnerJudges
  },

]

const router = new VueRouter({
  routes
})

export default router
