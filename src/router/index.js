import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'
import Home from '../views/TempHome.vue'

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
    //   component: Home
    // },
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/Login.vue')
    },
    {
        path: '/sign-up',
        name: 'signup',
        component: () =>
            import ('../views/Signup.vue')
    },
    {
        path: '/forgot-password',
        name: 'forgot-password',
        component: () =>
            import ('../views/ForgotPassword.vue')
    },
    {
        path: '/movie/:id/:slug/',
        name: 'movie-detail',
        component: () =>
            import ('../views/MovieDetails.vue')
    },
    {
        path: '/list/:id/:slug/',
        name: 'list-detail',
        component: () =>
            import ('../views/ListDetails.vue')
    },
    {
        path: '/my-reviews/',
        name: 'my-reviews',
        component: () =>
            import ('../views/MyReviews.vue')
    },
    {
        path: '/movies/:profile_id',
        name: 'movies-by-profile',
        component: () =>
            import ('../views/MoviesByProfile.vue')
    },
    {
        path: '/partner-judges',
        name: 'partner-judges',
        component: () =>
            import ('../views/PartnerJudges.vue')
    },
    {
        path: '/judge-recommendation/:id',
        name: 'judge-recommendation',
        component: () =>
            import ('../views/JudgeRecommendations.vue')
    },
    {
        path: '/profile/:id',
        name: 'profile',
        component: () =>
            import ('../views/Profile.vue')
    },
    {
        path: '/top-creator',
        name: 'top-creator',
        component: () =>
            import ('../views/TopCreator.vue')
    },
    {
        path: '/top-curator',
        name: 'top-curator',
        component: () =>
            import ('../views/TopCurator.vue')
    },
    {
        path: '/submit',
        name: 'submit',
        component: () =>
            import ('../views/Submit.vue')
    },
    {
        path: '/notification',
        name: 'notification',
        component: () =>
            import ('../views/Notification.vue')
    },
    {
        path: '/filmmaker-of-the-month',
        name: 'filmmaker-of-the-month',
        component: () =>
            import ('../views/FilmmakerOfTheMonth.vue')
    },
    {
        path: '/mdff-top',
        name: 'mdff-top',
        component: () =>
            import ('../views/MDFFTop.vue')
    },
    {
        path: '/audience-leaderboard',
        name: 'audience-leaderboard',
        component: () =>
            import ('../views/AudienceLeaderboard.vue')
    },
    {
        path: '/filmmaker-leaderboard',
        name: 'filmmaker-leaderboard',
        component: () =>
            import ('../views/FilmmakerLeaderboard.vue')
    },
    {
        path: '/movie-by-genre/:genre',
        name: "movies-by-genre",
        component: () =>
            import ('../views/FilteredMovies.vue')
    },
    // static pages below
    {
        path: '/about',
        name: 'about',
        component: () =>
            import ('../views/AboutUs.vue')
    },
    {
        path: '/tos',
        name: 'tos',
        component: () =>
            import ('../views/Tos.vue')
    },
    {
        path: '/refund-policy',
        name: 'refund-policy',
        component: () =>
            import ('../views/Refunds.vue')
    },
    {
        path: '/privacy-policy',
        name: 'privacy-policy',
        component: () =>
            import ('../views/PrivacyPolicy.vue')
    },
    {
        path: '*',
        name: "not-found",
        component: () =>
            import ('../views/404.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})
router.beforeEach((to, from, next) => {
    setTimeout(() => {
        next()
    }, 150)
})
export default router