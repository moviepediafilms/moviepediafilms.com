<template>
  <base-layout>
    <div class="q-ma-md text-center">
      <h3 class="text-primary" v-if="genre.name">{{ genre.name }}</h3>
      <q-skeleton type="text" v-else />

      <div class="q-mt-md text-left">
        <movies
          v-if="!loading"
          :movies="movies"
          @item-selected="on_select"
          empty-title="Nothing to show here"
          empty-desc='<i>"No matter what people tell you, words and ideas can change the world."</i><br/>– Robin Williams'
          empty-image="/img/empty/11.svg"
        />
        <transition
          appear
          name="custom-classes-transition"
          enter-active-class="animated animate__fadeIn"
          leave-active-class="animated animate__fadeOut"
          mode="out-in"
          :duration="200"
        >
          <div class="text-center q-my-lg" v-if="loading">
            <q-spinner-hourglass color="grey-6" size="2em" />
            <br />
            <br />
            <div>Loading Movies</div>
          </div>
        </transition>
      </div>
    </div>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/Base";
import Movies from "@/components/Movies";
import { mp_genre_service } from "@/services/";
export default {
  name: "mp-genre",
  components: {
    BaseLayout,
    Movies,
  },
  metaInfo: {
    title: "MP Genre",
  },
  data() {
    return {
      movies: [],
      genre: {},
      loading: false,
    };
  },
  computed: {
    genre_id() {
      return this.$route.params.genre;
    },
  },
  mounted() {
    this.loading = true;
    this.fetch_movies();
    this.fetch_genre();
  },
  methods: {
    fetch_genre() {
      mp_genre_service
        .get({}, this.genre_id)
        .then((data) => {
          this.genre = data;
        })
        .catch((error) => {
          console.log(error);
          this.genre = { name: "No Such Genre" };
        });
    },
    fetch_movies() {
      mp_genre_service
        .get({}, `${this.genre_id}/movies`)
        .then((data) => {
          this.movies.splice(0, this.movies.length);
          this.movies.push(...data.results);
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
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