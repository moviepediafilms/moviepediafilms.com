<template>
  <base-layout>
    <div class="q-ma-md text-center">
      <h3 class="text-primary">Films Directed</h3>
      <small v-if="profile.name">by {{ profile.name }}</small>
      <div class="q-mt-md text-left">
        <movies
          :movies="movies"
          @item-selected="on_select"
          empty-title="Nothing to show here"
          empty-desc='<i>"No matter what people tell you, words and ideas can change the world."</i><br/>– Robin Williams'
          empty-image="/img/empty/11.svg"
        />
      </div>
    </div>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/Base";
import Movies from "@/components/Movies";
import { movies_by_service, profile_service } from "@/services/";
export default {
  name: "my-movies-page",
  components: {
    BaseLayout,
    Movies,
  },
  metaInfo: {
    title: "Films Directed",
  },
  data() {
    return {
      movies: [],
      profile: {},
    };
  },
  computed: {
    profile_id() {
      return this.$route.params.profile_id;
    },
  },
  mounted() {
    this.fetch_my_movies();
    this.fetch_profile();
  },
  methods: {
    fetch_profile() {
      profile_service
        .get({}, this.profile_id)
        .then((data) => {
          this.profile = data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetch_my_movies() {
      movies_by_service
        .get({}, this.profile_id)
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