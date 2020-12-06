<template>
  <movies
    :movies="movies"
    :options="menu_options"
    @remove="on_remove"
    @item-selected="on_movie_click"
  ></movies>
</template>
<script>
import Movies from "@/components/Movies";
import { PROFILE_REMOVE_RECOMMEND } from "@/store/actions";
export default {
  components: {
    Movies,
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
      this.$store.dispatch(PROFILE_REMOVE_RECOMMEND, movie);
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