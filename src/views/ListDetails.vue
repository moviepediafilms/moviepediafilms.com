<template>
  <base-layout>
    <div class="q-ma-md text-center">
      <h3 class="text-primary">{{ list.name }}</h3>
      <div class="q-mt-md text-left">
        <movies
          :movies="movies"
          :options="menu_options"
          @remove="on_remove"
          @item-selected="on_select"
        />
      </div>
    </div>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/Base";
import Movies from "@/components/Movies";
import { list_service } from "@/services/";
import { LIST_TOGGLE_MOVIE_REQUEST } from "@/store/actions";
export default {
  name: "list-detail-page",
  components: {
    BaseLayout,
    Movies,
  },
  metaInfo: {
    title: "List",
  },
  data() {
    return {
      list: {
        movies: [],
      },
      menu_options: [{ name: "Remove", icon: "mdi-trash-can", emit: "remove" }],
    };
  },
  computed: {
    list_id() {
      return this.$route.params.id;
    },
    movies() {
      return this.list.movies;
    },
    movie_ids() {
      var ids = [];
      this.list.movies.forEach((movie) => {
        ids.push(movie.id);
      });
      return ids;
    },
  },
  mounted() {
    this.fetch_movies();
  },
  methods: {
    fetch_movies() {
      console.log(this.list_id);
      list_service
        .get({}, this.list_id)
        .then((data) => {
          this.movies.splice(0, this.movies.length);
          this.list = data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    on_remove(movie) {
      this.$store
        .dispatch(LIST_TOGGLE_MOVIE_REQUEST, {
          list: { id: this.list.id, movies: this.movie_ids },
          movie_id: movie.id,
        })
        .then((data) => {
          // remove the movie from this.lists.movies
          // Addition is handled automatically
          var movies_to_remove = [];
          this.list.movies.forEach((movie, index) => {
            if (data.movies.indexOf(movie.id) == -1) {
              movies_to_remove.push(index);
            }
          });
          movies_to_remove.forEach((index) => {
            this.list.movies.splice(index, 1);
          });
        });
    },
    on_select(movie) {
      this.$router.push({ name: "movie-detail", id: movie.id });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>