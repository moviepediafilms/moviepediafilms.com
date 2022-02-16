<template>
  <div>
    <div class="q-pb-sm row">
      <div class="text-lg">{{ contest.name }} Releases</div>
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
import { contest_service } from "@/services";
import HorizontalMovieList from "@/components/home/HorizontalMovieList";
import settings from "@/settings";
export default {
  components: {
    HorizontalMovieList,
  },
  props: {
    contest: {
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
      count: undefined,
      fetch_size: settings.PAGE_SIZE,
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
      if (this.movies.length >= this.count) return;
      this.loading = true;
      contest_service
        .get(
          { limit: this.fetch_size, offset: this.movies.length },
          `${this.contest.id}/movies`
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