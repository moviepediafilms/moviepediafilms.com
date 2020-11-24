<template>
  <div class="row q-col-gutter-none justify-center">
    <curators
      ref="list"
      :users="curators"
      :loading="loading"
      :show_page_indicator="false"
      @click="on_profile_select"
      :pin_self_top="false"
      :highlight_top="10"
      v-if="curators.length > 0"
    />
    <div class="text-grey-7" v-else>
      <q-icon name="mdi-emoticon-wink" size="80px" class="q-mb-md" />
      <div class="text-h4">Opportunity for you !</div>
      <div class="text-caption q-mt-sm">
        Grab the first position by recommending movies that celebrities on our
        platform might recommend
      </div>
    </div>
  </div>
</template>
<script>
import Curators from "@/components/Curators";
import { contest_service } from "@/services";
import _ from "lodash";
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
      default: 20,
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
    console.log("created paginated curator");
    window.addEventListener("scroll", this.throttled_scroll_handler);
  },
  destroyed() {
    window.removeEventListener("scroll", this.throttled_scroll_handler);
  },
  mounted() {
    this.new_page_load();
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
            console.log(data);
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