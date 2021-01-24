<template>
  <horizontal-items
    :width="width"
    :height="height"
    @onLoadMore="$emit('onLoadMore')"
  >
    <movie
      class="q-mr-sm"
      v-for="(movie, index) in movies"
      :movie="movie"
      :key="index"
      :card-style="{ width: `${width}px` }"
      :show-my-roles="false"
      :show-state="false"
    ></movie>
    <template v-if="loading">
      <movie-skeleton v-for="i in 5" :key="'movie_skeleton_' + i" />
    </template>
  </horizontal-items>
</template>
<script>
import HorizontalItems from "@/components/HorizontalItems";
import Movie from "@/components/movie/Movie";
import MovieSkeleton from "@/components/movie/Skeleton";
import _ from "lodash";
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    movies: {
      type: Array,
      default() {
        return [];
      },
    },
    width: {
      type: Number,
      default: 230,
    },
    height: {
      type: Number,
      default: 110,
    },
  },
  components: { Movie, HorizontalItems, MovieSkeleton },
  data() {
    return {
      //   movies: [],
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
