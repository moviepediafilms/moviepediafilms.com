<template>
  <movie-list
    :movies="movies"
    :options="menu_options"
    @remove="on_remove"
    @item-selected="on_movie_click"
  ></movie-list>
</template>
<script>
import MovieList from "@/components/MovieList";
import { PROFILE_REMOVE_WATCHLIST } from "@/store/actions";
export default {
  components: {
    MovieList,
  },
  props: {
    movies: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      menu_options: [{ name: "Remove", icon: "mdi-trash-can", emit: "remove" }],
    };
  },
  methods: {
    on_remove(movie) {
      this.$store.dispatch(PROFILE_REMOVE_WATCHLIST, movie);
    },
    on_movie_click(movie) {
      this.$router.push({
        name: "movie-detail",
        params: { id: movie.id, slug: this.slugify(movie.title) },
      });
    },
  },
};
</script>