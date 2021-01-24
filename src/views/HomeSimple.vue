<template>
  <base-layout>
    <div class="q-ma-md">
      <div class="text-h2 text-center">Movies</div>
      <div class="row q-col-gutter-md q-mt-xs">
        <div class="col-4 col-sm-3" v-for="movie in movies" :key="movie.id">
          <movie :movie="movie" :show-my-roles="false"></movie>
        </div>
      </div>
    </div>
  </base-layout>
</template>

<script>
import Movie from "@/components/movie/Movie";
import BaseLayout from "@/layouts/Base";
import { movie_service } from "@/services";
import _ from "lodash";
export default {
  name: "simple-home-page",
  components: {
    BaseLayout,
    Movie,
  },
  metaInfo: {
    title: "Home",
  },
  data() {
    return {
      fetch_size: 20,
      movies: [],
      all_movie_count: undefined,
    };
  },
  created() {
    window.addEventListener("scroll", this.throttled_scroll_handler);
  },
  destroyed() {
    window.removeEventListener("scroll", this.throttled_scroll_handler);
  },
  computed: {
    throttled_scroll_handler() {
      return _.throttle(this.scroll_handler, 300);
    },
  },
  mounted() {
    this.fetch_movies();
  },
  methods: {
    scroll_handler() {
      if (this.$refs.list) {
        var list = this.$refs.list.$el;
        var dimens = list.getClientRects()[0];
        if (dimens.bottom < window.innerHeight) {
          this.fetch_movies();
        }
      }
    },
    fetch_movies() {
      if (this.loading) return;
      if (this.movies.length >= this.all_movie_count) return;

      this.loading = true;
      var params = {
        offset: this.movies.length || 0,
        limit: this.fetch_size,
      };
      movie_service
        .get(params)
        .then((data) => {
          this.movies.push(...data.results);
          this.loading = false;
          this.all_movie_count = data.count;
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 300px;
  :hover {
    background-color: blue;
  }
}
</style>