<template>
  <div ref="list">
    <div class="row wrap justify-start content-start">
      <div
        class="col-3 q-pa-xs"
        style="overflow: auto; display: inline-block"
        v-for="(movie, index) in movies"
        :key="index"
      >
        <movie
          :movie="movie"
          :show-my-roles="false"
          :show-state="false"
        ></movie>
      </div>
    </div>
  </div>
</template>
<script>
import Movie from "@/components/movie/Movie";
import _ from "lodash";
import { movie_service } from "@/services";
import settings from "@/settings";
export default {
  components: { Movie },
  props: {
    searchText: {
      type: String,
    },
    langs: {
      type: Array,
      default() {
        return [];
      },
    },
    genres: {
      type: Array,
      default() {
        return [];
      },
    },
    time: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      loading: false,
      count: undefined,
      fetch_size: settings.PAGE_SIZE,
      movies: [],
    };
  },
  computed: {
    throttled_scroll_handler() {
      return _.throttle(this.scroll_handler, 300);
    },
    filter_lang_text() {
      return this.langs.join(",");
    },
    filter_genre_text() {
      return this.genres.join(",");
    },
    throttled_search() {
      return _.debounce(this.search_and_filter, 400);
    },
  },
  watch: {
    searchText() {
      this.throttled_search();
    },
    filter_genre_text() {
      this.throttled_search();
    },
    filter_lang_text() {
      this.throttled_search();
    },
  },
  mounted() {
    this.search_and_filter();
  },
  methods: {
    search_and_filter() {
      this.movies.splice(0, this.movies.length);
      this.count = undefined;
      this.fetch_movies();
    },
    scroll_handler() {
      if (this.$refs.list) {
        var list = this.$refs.list;
        var dimens = list.getClientRects()[0];
        if (dimens.bottom < window.innerHeight) {
          this.fetch_movies();
        }
      }
    },
    fetch_movies() {
      if (this.loading) return;
      if (this.movies.length >= this.count) return;
      this.loading = true;
      var params = {
        genres__name__in: this.filter_genre_text,
        lang__name__in: this.filter_lang_text,
        search: this.searchText,
        limit: this.fetch_size,
        offset: this.movies.length,
      };
      movie_service
        .get(params)
        .then((data) => {
          this.movies.push(...data.results);
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
  },
};
</script>