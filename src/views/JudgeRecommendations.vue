<template>
  <base-layout>
    <div class="q-pa-md text-grey-4">
      <div class="col text-center">
        <div class="text-h5 text-overline">Recommended by</div>
        <q-avatar size="96px">
          <img :src="judge.image" @error="on_user_img_error" />
        </q-avatar>
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
          class="col-6 col-md-4 col-lg-3"
          v-for="movie in movies"
          :key="movie.id"
        >
          <q-card class="movie-card">
            <movie-image
              :title="movie.title"
              :state="movie.state"
              :poster="movie.poster"
              :show-state="false"
              @click="movie_details(movie)"
              v-ripple
            />
            <q-card-section class="q-pt-md">
              <div class="text-body1">{{ movie.title }}</div>
              <div class="text-caption text-grey">{{ movie.synopsis }}</div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat @click.prevent="movie_details(movie)" color="primary"
                >Watch</q-btn
              >
            </q-card-actions>
          </q-card>
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
import MovieImage from "@/components/movie/Image";
import { profile_service } from "@/services";
export default {
  name: "judge-recommendations",
  metaInfo: {
    title: "Recommended Movies",
  },
  components: {
    BaseLayout,
    MovieImage,
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
      profile_service.get({}, `${this.judge_id}/recommends/`).then((data) => {
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