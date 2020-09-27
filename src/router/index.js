import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'
import Home from '../views/Home.vue'

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
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/sign-up',
    name: 'signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/movie/:id',
    name: 'movie-detail',
    component: () => import('../views/MovieDetails.vue')
  },
  {
    path: '/partner-judges',
    name: 'partner-judges',
    component: () => import('../views/PartnerJudges.vue')
  },
  {
    path: '/judge-recommendation/:id',
    name: 'judge-recommendation',
    component: () => import('../views/JudgeRecommendations.vue')
  },
  {
    path: '/profile/:id',
    name: 'profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/top-creator',
    name: 'top-creator',
    component: () => import('../views/TopCreator.vue')
  },
  {
    path: '/submit',
    name: 'submit',
    component: () => import('../views/Submit.vue')
  },
  {
    path: '/notification',
    name: 'notification',
    component: () => import('../views/Notification.vue')
  },
  {
    path: '/filmmaker-of-the-month',
    name: 'filmmaker-of-the-month',
    component: () => import('../views/FilmmakerOfTheMonth.vue')
  },
  {
    path: '/mdff-top',
    name: 'mdff-top',
    component: () => import('../views/MDFFTop.vue')
  },
  {
    path: '/leaderboard',
    name: 'leaderboard',
    component: () => import('../views/Leaderboard.vue')
  },

  // static pages below
  {
    path: '/tos',
    name: 'tos',
    component: () => import('../views/Tos.vue')
  },
  {
    path: '/refund-policy',
    name: 'refund-policy',
    component: () => import('../views/Refunds.vue')
  },
  {
    path: '/privacy-policy',
    name: 'privacy-policy',
    component: () => import('../views/PrivacyPolicy.vue')
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
