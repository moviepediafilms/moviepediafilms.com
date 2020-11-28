import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import Vue from 'vue'
Vue.use({
    install(Vue) {
        gsap.registerPlugin(ScrollTrigger)
        Vue.prototype.$gsap = gsap
    }
})