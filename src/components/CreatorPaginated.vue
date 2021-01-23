<template>
  <div class="justify-center">
    <creators
      ref="list"
      :users="creators"
      :loading="loading"
      :show_page_indicator="false"
      @click="on_profile_select"
      :pin_self_top="false"
      :viewer="viewer"
      :highlight_top="10"
      v-if="creators.length > 0 || loading"
    />
    <empty-state
      title="Create. Submit. Compete."
      desc="Start submitting films and stand a chance to win the Creator of the Month title."
      image="/img/empty/13.svg"
      v-else
    />
  </div>
</template>
<script>
import Creators from "@/components/Creators";
import { contest_service } from "@/services";
import _ from "lodash";
import settings from "@/settings";
export default {
  components: {
    Creators,
  },
  props: {
    highlight_top: {
      type: Number,
      default: 10,
    },
    page_size: {
      type: Number,
      default: settings.PAGE_SIZE,
    },
    contest: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      viewer: {},
      creators: [],
      loading: false,
      max_creators: undefined,
    };
  },
  computed: {
    throttled_scroll_handler() {
      return _.throttle(this.scroll_handler, 300);
    },
  },
  created() {
    window.addEventListener("scroll", this.throttled_scroll_handler);
  },
  destroyed() {
    window.removeEventListener("scroll", this.throttled_scroll_handler);
  },
  mounted() {
    this.new_page_load();
    this.load_viewer_position();
  },
  methods: {
    scroll_handler() {
      if (this.$refs.list) {
        var list = this.$refs.list.$el;
        var dimens = list.getClientRects()[0];
        if (dimens.bottom < window.innerHeight) {
          this.new_page_load();
        }
      }
    },
    load_viewer_position() {
      contest_service
        .get({}, `${this.contest.id}/my_creator_position`)
        .then((data) => {
          this.viewer = Object.assign({}, this.viewer, data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    new_page_load() {
      if (this.loading) return;
      if (
        this.max_creators == undefined ||
        this.creators.length < this.max_creators
      ) {
        this.loading = true;
        contest_service
          .get(
            { offset: this.creators.length, limit: this.page_size },
            `${this.contest.id}/top-creators`
          )
          .then((data) => {
            this.creators.push(...data.results);
            this.max_creators = data.count;
            this.loading = false;
          })
          .catch((error) => {
            console.log(error);
            this.loading = false;
          });
      }
    },
    on_profile_select(profile) {
      this.$emit("click", profile);
    },
  },
};
</script>