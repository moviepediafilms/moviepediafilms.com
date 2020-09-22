import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'
import Home from '../views/Home.vue'
import MovieDetails from '../views/MovieDetails.vue'
import PartnerJudges from '../views/PartnerJudges.vue'
import JudgeRecommendations from '../views/JudgeRecommendations.vue'
import Profile from '../views/Profile.vue'
import Refunds from '../views/Refunds.vue'



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
    component: () => import(/* webpackChunkName: "home" */ '../views/Tos.vue')
  },
  {
    path: '/refund-policy',
    name: 'refund-policy',
    component: Refunds
  },
  {
    path: '/privacy-policy',
    name: 'privacy-policy',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "home" */ '../views/PrivacyPolicy.vue')
  },
  {
    path: '/movie/:id',
    name: 'movie-detail',
    component: MovieDetails
  },
  {
    path: '/partner-judges',
    name: 'partner-judges',
    component: PartnerJudges
  },
  {
    path: '/judge-recommendation/:id',
    name: 'judge-recommendation',
    component: JudgeRecommendations
  },
  {

    path: '/profile',
    name: 'profile',
    component: Profile
  },
]

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
