import Vue from 'vue'

Vue.mixin({
    data() {
        return {
            google_api_key: 'AIzaSyD87LPfe433tiT7CDR_wdKnFIl4mc1sq24',
            website_title: "Moviepedia Films"
        }
    },
    computed: {
        user_profile() {
            // {}
            return this.$store.getters.getProfile;
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
        },
        decode_error_message(error) {
            if (!error)
                return "Unknown error occured!"
            if (error.response && error.response.data && error.response.data.detail)
                return error.response.data.detail;
            if (error.response && error.response.data && error.response.data.non_field_errors)
                return error.response.data.non_field_errors[0];
            console.log(error.toJSON())
            var message = error.toJSON().message;
            if (message === "Network Error")
                message = "Unable to reach server!"
            if (message === "Request failed with status code 500")
                message = "We failed to process that request!"
            return message
        }
    }
})