<template>
  <base-layout>
    <div class="q-pa-md text-grey-4">
      <div class="col text-center">
        <q-img :src="judge.image" @error="on_user_img_error" />
        <div class="text-h1 text-primary q-mt-sm">
          {{ judge.name }}
        </div>
        <div class="q-mt-sm text-subtitle1">{{ judge.title }}</div>
      </div>
      <div class="q-mt-md text-uppercase text-primary" v-if="movies.length > 0">
        Recommends
      </div>
      <div class="row q-mt-md q-col-gutter-md" v-if="movies.length > 0">
        <div
          class="col-4 col-md-4 col-lg-3"
          v-for="movie in movies"
          :key="movie.id"
        >
          <movie :movie="movie" :show-my-roles="false" />
        </div>
      </div>
      <empty-state
        title="Nothing to show here"
        desc="This celebrity hasn't recommended any film yet."
        image="/img/empty/17.svg"
        height="200px"
      ></empty-state>
    </div>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/Base";
import Movie from "@/components/movie/Movie";
import { profile_service } from "@/services";
export default {
  name: "judge-recommendations",
  metaInfo: {
    title: "Recommended Movies",
  },
  components: {
    BaseLayout,
    Movie,
  },
  data() {
    return {
      movies: [],
      judge: {},
    };
  },
  mounted() {
    this.fetch_judge();
    this.get_recommendations();
  },
  computed: {
    judge_id() {
      return this.$route.params.id;
    },
  },
  methods: {
    fetch_judge() {
      profile_service.get({}, this.judge_id).then((data) => {
        this.judge = data;
      });
    },
    get_recommendations() {
      profile_service.get({}, `${this.judge_id}/recommends`).then((data) => {
        this.movies.push(...data.results);
      });
    },
    movie_details(movie) {
      this.$router.push({
        name: "movie-detail",
        params: { id: movie.id, slug: this.slugify(movie.title) },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.movie-card {
  width: 100%;
  max-width: 350px;
}
</style>