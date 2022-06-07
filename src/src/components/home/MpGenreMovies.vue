<template>
  <div>
    <div class="q-pb-sm row">
      <div class="text-lg">{{ mpGenre.name }}</div>
    </div>
    <horizontal-movie-list
      :movies="movies"
      :height="height"
      :width="width"
      :loading="loading"
      @onLoadMore="fetch_movies"
    />
  </div>
</template>
<script>
import HorizontalMovieList from "@/components/home/HorizontalMovieList";
import { mp_genre_service } from "@/services";
import settings from "@/settings";
export default {
  components: {
    HorizontalMovieList,
  },
  props: {
    mpGenre: {
      type: Object,
    },
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
      mp_genre_service
        .get(
          {
            limit: this.fetch_size,
            offset: this.movies.length,
          },
          `${this.mpGenre.id}/movies`
        )
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