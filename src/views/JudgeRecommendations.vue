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
      <recommends
        :profile="judge"
        :empty-title="emptyTitle"
        :empty-desc="emptyDesc"
        :empty-image="emptyImage"
      />
    </div>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/Base";
import Recommends from "@/components/profile/tabs/Recommends";
import { profile_service } from "@/services";
export default {
  name: "judge-recommendations",
  metaInfo: {
    title: "Recommended Movies",
  },
  components: {
    BaseLayout,
    Recommends,
  },
  data() {
    return {
      emptyTitle: "Nothing to show here",
      emptyDesc: "This celebrity hasn't recommended any film yet.",
      emptyImage: "/img/empty/17.svg",
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