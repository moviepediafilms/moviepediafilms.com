<template>
  <base-layout>
    <div class="q-ma-md text-center">
      <h3 class="text-primary">Films Directed</h3>
      <div class="q-mt-md text-left">
        <movie-list :movies="movies" @item-selected="on_select" />
      </div>
    </div>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/Base";
import MovieList from "@/components/MovieList";
import { movie_service } from "@/services/";
export default {
  name: "my-movies-page",
  components: {
    BaseLayout,
    MovieList,
  },
  metaInfo: {
    title: "Films Directed",
  },
  data() {
    return {
      movies: [],
    };
  },
  mounted() {
    this.fetch_my_movies();
  },
  methods: {
    fetch_my_movies() {
      console.log(this.my_profile.profile_id);
      movie_service
        .get({}, "my")
        .then((data) => {
          this.movies.splice(0, this.movies.length);
          this.movies.push(...data.results);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    on_select(movie) {
      this.$router.push({
        name: "movie-detail",
        params: { id: movie.id, slug: this.slugify(movie.title) },
      });
    },
  },
};
</script>