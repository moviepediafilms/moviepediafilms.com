import Vue from 'vue'
import slugify from '@/extras/slug'
import decode_error_message from "@/extras/error"
import { mapGetters, mapState } from "vuex";
Vue.mixin({
    data() {
        return {
            google_api_key: 'AIzaSyD87LPfe433tiT7CDR_wdKnFIl4mc1sq24',
            website_title: "Moviepedia Films"
        }
    },
    computed: {
        ...mapState("profile", {
            my_profile: (state) => state.profile
        }),
        ...mapGetters("auth", [
            "is_authenticated"
        ]),
        is_director() {
            return this.my_profile.roles && this.my_profile.roles.filter(role => role.name !== "Director").length == 1
        }
    },
    methods: {
        slugify(content) {
            return slugify(content)
        },
        is_token_error(error) {
            return error && error.response && error.response.status == 401 && error.response.data.detail == "Invalid token."
        },
        first_of(arr) {
            if (arr && arr.length > 0)
                return arr[0]
        },
        scroll_top() {
            window.scrollTo(0, 0);
        },
        decode_error_message: decode_error_message,
        check_fields_for_error(source, dest, fields) {
            var has_errors = false;
            if (!fields) return has_errors;
            fields.forEach((field) => {
                if (source[field]) {
                    has_errors = true;
                    dest[field] = source[field][0];
                }
            });
            return has_errors
        }
    }
})