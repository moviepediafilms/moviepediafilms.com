<template>
  <div class="row q-col-gutter-none justify-center">
    <curators
      ref="list"
      :users="curators"
      :loading="loading"
      :show_page_indicator="false"
      @click="on_profile_select"
      :pin_self_top="false"
      :viewer="viewer"
      :highlight_top="10"
      v-if="curators.length > 0 || loading"
    />
    <empty-state
      title="Recommend Films & Win Big."
      desc="Start recommending films that our partner celebrities might recommend and get to the top of our leaderboards."
      image="/img/empty/14.svg"
      v-else
    />
  </div>
</template>
<script>
import Curators from "@/components/Curators";
import { contest_service } from "@/services";
import _ from "lodash";
import settings from "@/settings";
export default {
  components: {
    Curators,
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
      curators: [],
      loading: false,
      max_curators: undefined,
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
        .get({}, `${this.contest.id}/my_curator_position`)
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
        this.max_curators == undefined ||
        this.curators.length < this.max_curators
      ) {
        this.loading = true;
        contest_service
          .get(
            { offset: this.curators.length, limit: this.page_size },
            `${this.contest.id}/top-curators`
          )
          .then((data) => {
            this.curators.push(...data.results);
            this.max_curators = data.count;
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