<template>
  <q-scroll-area
    @scroll="on_scroll_decounced"
    :thumb-style="thumbStyle"
    horizontal
    visible
    :style="`height: ${height + 10}px`"
    class="q-mb-md"
  >
    <div class="q-pr-md row no-wrap">
      <slot></slot>
    </div>
  </q-scroll-area>
</template>
<script>
import _ from "lodash";
export default {
  props: {
    height: {
      type: Number,
      default: 110,
    },
  },

  data() {
    return {
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
  methods: {
    on_scroll(info) {
      if (info.horizontalPercent < 0.8) return;
      this.$emit("onLoadMore");
    },
  },
};
</script>
<style lang="scss" scoped>
.movie {
  width: 100%;
  max-width: 300px;
  :hover {
    background-color: blue;
  }
}
</style>
