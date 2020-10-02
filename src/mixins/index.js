import Vue from 'vue'

Vue.mixin({
    data() {
        return {
            google_api_key: 'AIzaSyD87LPfe433tiT7CDR_wdKnFIl4mc1sq24',
        }
    },
    computed: {
        user_profile() {
            return this.$store.state.user.profile;
        },
        is_authenticated() {
            return this.$store.getters.isAuthenticated;
        },
    },
    methods: {
        first_of(arr) {
            if (arr && arr.length > 0)
                return arr[0]
        },
        scroll_top() {
            window.scrollTo(0, 0);
        }
    }
})