import Vue from 'vue'
import slugify from '@/extras/slug'
import decode_error_message from "@/extras/error"
import { mapGetters, mapState } from "vuex";
import moment from "moment";
import EmptyState from "@/components/EmptyState"
Vue.mixin({
    components: {
        EmptyState,
    },
    data() {
        return {
            rs: '₹',
            google_api_key: 'AIzaSyD87LPfe433tiT7CDR_wdKnFIl4mc1sq24',
            website_title: "Moviepedia Films",
            media_base: process.env.VUE_APP_MEDIA_BASE || '',
            base_url: process.env.VUE_APP_BASE_URL || ''
        }
    },
    computed: {
        ...mapState("profile", {
            my_profile: (state) => state.profile
        }),
        ...mapGetters("auth", [
            "is_authenticated"
        ]),
        am_i_director() {
            return this.my_profile.roles && this.my_profile.roles.filter(role => role.name === "Director").length == 1
        }

    },
    methods: {
        in_rupees(amount) {
            return (amount / 100.0).toFixed(2)
        },
        on_celeb_img_error(img) {
            console.log(`error loading image ${img.target.src}`)
            if (!img.target.src.endsWith("default_poster.jpg"))
                img.target.src = "/default_poster.jpg";
        },
        on_user_img_error(img) {
            console.log(`error loading image ${img.target.src}`)
            if (!img.target.src.endsWith("default_avatar_m.png"))
                img.target.src = "/default_avatar_m.png";
        },
        on_movie_img_error(img) {
            console.log(`error loading image ${img.target.src}`)
            if (!img.target.src.endsWith("default_poster.jpg"))
                img.target.src = "/default_poster.jpg";
        },
        slugify(content) {
            return slugify(content)
        },
        is_token_error(error) {
            return error && error.response && error.response.status == 401 && error.response.data.detail == "Invalid token."
        },
        is_filmmaker(profile) {
            // checking the cached roles
            return profile.roles && profile.roles.filter(role => role.name === "Director").length == 1
        },
        first_of(arr) {
            if (arr && arr.length > 0)
                return arr[0]
        },
        scroll_top() {
            window.scrollTo(0, 0);
        },
        date_to_txt(datetime) {
            return moment(datetime).fromNow()
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