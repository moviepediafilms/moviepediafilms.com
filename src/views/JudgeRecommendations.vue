<template>
  <base-layout>
    <div class="q-pa-lg text-grey-4">
      <div class="q-pt-md row">
        <div class="col text-center">
          <q-avatar size="250px">
            <img :src="judge.image" />
          </q-avatar>
          <div class="q-mt-md text-h5 text-primary">{{judge.name}}</div>
          <div class="q-mt-sm text-subtitle1">{{judge.title}}</div>
          <div class="q-mt-lg text-subheading">{{judge.about}}</div>
          <div class="q-mt-md">
            <q-btn color="primary" text-color="dark">Follow</q-btn>
          </div>
        </div>
      </div>

      <div class="q-mt-xl text-weight-bold text-uppercase text-primary">Recommendations</div>
      <div class="q-mt-md row items-start q-gutter-md">
        <q-card class="movie-card" v-for="movie in movies" :key="movie.id">
          <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" basic></q-img>
          <q-card-section class="q-pt-xs">
            <div class="text-overline">{{movie.year}}</div>
            <div class="text-h5 text-primary q-mt-sm q-mb-xs">{{movie.title}}</div>
            <div class="text-caption text-grey">{{movie.synopsis}}</div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat @click.prevent="movie_details(movie)" color="primary">Watch</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/Base";
export default {
  name: "judge-recommendations",
  components: {
    BaseLayout,
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
      this.judge = {
        name: "Anurag kashyap",
        title: "Director",
        image: "https://cdn.quasar.dev/img/mountains.jpg",
        about:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      };
    },
    get_recommendations() {
      console.log(this.judge_id);
      this.movies = [
        {
          year: 2020,
          id: 1,
          title: "Dhundh",
          synopsis:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magn",
          poster: "https://cdn.quasar.dev/img/parallax2.jpg",
        },
        {
          id: 2,
          year: 2020,
          title: "Dhundh",
          synopsis:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magn",
          poster: "https://cdn.quasar.dev/img/parallax2.jpg",
        },
      ];
    },
    movie_details(movie) {
      this.$router.push({ name: "movie-detail", params: { id: movie.id } });
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