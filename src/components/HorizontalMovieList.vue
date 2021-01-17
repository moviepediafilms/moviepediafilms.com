<template>
  <q-scroll-area
    :thumb-style="thumbStyle"
    horizontal
    visible
    :style="`height: ${height + 10}px`"
    class="q-mb-md"
  >
    <div class="q-pr-md row no-wrap">
      <movie
        class="q-mr-sm"
        v-for="(movie, index) in movies"
        :movie="movie"
        :key="index"
        :card-style="{ width: `${width}px` }"
        :show-my-roles="false"
      ></movie>
    </div>
  </q-scroll-area>
</template>
<script>
import Movie from "@/components/movie/Movie";
export default {
  props: {
    movies: {
      type: Array,
      default() {
        return [];
      },
    },
    width: {
      type: Number,
      default: 100,
    },
    height: {
      type: Number,
      default: 150,
    },
  },
  components: { Movie },
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
