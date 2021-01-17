<template>
  <div>
    <div class="q-pb-sm row">
      <div class="text-lg">Celebrity Curators</div>
    </div>
    <q-scroll-area
      @scroll="on_scroll_decounced"
      :thumb-style="thumbStyle"
      horizontal
      visible
      :style="`height: ${height}px`"
      class="q-mb-md"
    >
      <div class="q-pr-md row no-wrap">
        <q-img
          class="q-mr-xs"
          v-for="(celeb, index) in celebrities"
          :key="index"
          :width="`${width}px`"
          :src="celeb.image || '/default_avatar.png'"
        />
      </div>
    </q-scroll-area>
  </div>
</template>
<script>
import { profile_service } from "@/services";
import _ from "lodash";
export default {
  props: {
    height: {
      type: Number,
      default: 130,
    },
    width: {
      type: Number,
      default: 180,
    },
  },
  data() {
    return {
      count: undefined,
      fetch_size: 10,
      loading: false,
      celebrities: [],
      thumbStyle: {
        right: "2px",
        borderRadius: "1px",
        backgroundColor: "#f7cd23",
        opacity: 0.75,
        height: "2px",
      },
    };
  },
  computed: {
    on_scroll_decounced() {
      return _.debounce(this.on_scroll, 300);
    },
  },
  mounted() {
    this.fetch_celebrities();
  },
  methods: {
    on_scroll(info) {
      if (info.horizontalPercent < 0.8) return;
      console.log(info);
      this.fetch_celebrities();
    },
    fetch_celebrities() {
      if (this.loading) return;
      if (this.celebrities.length >= this.count) return;
      this.loading = true;
      profile_service
        .get({
          is_celeb: true,
          limit: this.fetch_size,
          offset: this.celebrities.length,
        })
        .then((data) => {
          this.celebrities.push(...data.results);
          this.loading = false;
          this.count = data.count;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
  },
};
</script>