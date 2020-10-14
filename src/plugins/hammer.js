import Vue from 'vue'
import Hammer from 'hammerjs'
Vue.directive("swipe", {
    bind: function(el, binding) {
        if (typeof binding.value === "function") {
            const mc = new Hammer(el);
            mc.get("swipe").set({ direction: Hammer.DIRECTION_RIGHT | Hammer.DIRECTION_LEFT });
            mc.on("swipe", binding.value);
        }
    }
});