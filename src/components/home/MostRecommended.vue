<template>
  <div>
    <div class="q-pb-sm row">
      <div class="text-lg">Most Recommended Movies</div>
    </div>
    <horizontal-movie-list
      :movies="movies"
      :height="height"
      :loading="loading"
      :width="width"
      @onLoadMore="fetch_movies"
    />
  </div>
</template>
<script>
import HorizontalMovieList from "@/components/home/HorizontalMovieList";
import { movie_service } from "@/services";
import settings from "@/settings";
export default {
  components: {
    HorizontalMovieList,
  },
  props: {
    height: {
      type: Number,
      default: 230,
    },
    width: {
      type: Number,
      default: 110,
    },
  },
  data() {
    return {
      fetch_size: settings.PAGE_SIZE,
      count: undefined,
      loading: false,
      movies: [],
    };
  },
  mounted() {
    this.fetch_movies();
  },
  methods: {
    fetch_movies() {
      if (this.loading) return;
      if (this.movies.length == this.count) return;

      this.loading = true;
      movie_service
        .get({
          ordering: "-recommend_count",
          limit: this.fetch_size,
          offset: this.movies.length,
        })
        .then((data) => {
          this.movies.push(...data.results);
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