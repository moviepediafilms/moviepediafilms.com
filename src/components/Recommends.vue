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
      title="No Recommendations"
      desc="You have not recommended anything yet!"
      icon="mdi-emoticon-sad"
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