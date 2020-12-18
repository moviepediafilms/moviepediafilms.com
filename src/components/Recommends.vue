<template>
  <div>
    <movies
      :movies="movies"
      :options="menu_options"
      @remove="on_remove"
      @item-selected="on_movie_click"
      v-if="movies.length > 0"
    ></movies>
    <empty-state
      title="Nothing to show here."
      desc="Recommend the best from our featured films by using the <span class='mdi mdi-bullhorn'></span>
 button"
      image="/img/empty/2.svg"
      v-else
    />
  </div>
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