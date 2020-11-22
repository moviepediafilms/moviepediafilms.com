<template>
  <base-layout>
    <div class="q-ma-md text-center">
      <h3 class="text-primary text-weight-light q-mb-xs">Top Creators</h3>

      <div class="row q-mt-sm q-col-gutter-md justify-center">
        <leaderboard
          ref="leaderboard"
          :users="creators"
          :loading="loading"
          :show_page_indicator="false"
          @click="on_profile_select"
          :pin_self_top="false"
          :highlight_top="10"
        />
      </div>
    </div>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/Base";
import Leaderboard from "@/components/Leaderboard";
import { top_creator_service } from "@/services";
import _ from "lodash";
export default {
  name: "top-creator-page",
  components: {
    BaseLayout,
    Leaderboard,
  },
  metaInfo: {
    title: "Top Creators",
  },
  data() {
    return {
      page_size: 20,
      loading: false,
      creators: [],
      sorted_creators: [],
    };
  },
  mounted() {
    this.new_page_load();
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
  methods: {
    scroll_handler() {
      var list = this.$refs.leaderboard.$el;
      var dimens = list.getClientRects()[0];
      if (dimens.bottom < window.innerHeight) {
        this.new_page_load();
      }
    },
    new_page_load() {
      top_creator_service
        .get({ offset: this.creators.length, limit: this.page_size })
        .then((data) => {
          this.creators.push(...data.results);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    on_profile_select(creator) {
      this.$router.push({ name: "profile", params: { id: creator.id } });
    },
  },
};
</script>
<style lang="scss" scoped>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-enter-active {
  transition: all 0.3s ease;
}
.slide-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-enter, .slide-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(30px);
  opacity: 0;
}
</style>