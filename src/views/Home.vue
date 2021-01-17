<template>
  <base-layout>
    <div class="q-ma-sm">
      <q-dialog v-model="show_filter">
        <q-card>
          <q-card-section>
            <div class="text-h5 text-center">Filters</div>
          </q-card-section>
          <q-card-section>
            <div class="row">
              <div class="col">
                <div class="text-center text-primary">Genre</div>
                <div class="q-mt-sm">
                  <q-checkbox
                    :val="genre.val"
                    v-model="selected_filters.genre"
                    :label="genre.label"
                    v-for="genre in filters.genre"
                    :key="genre.val"
                  />
                </div>
              </div>
              <div class="col">
                <div class="text-center text-primary">Langugage</div>
                <div class="q-mt-sm">
                  <q-checkbox
                    :val="lang.val"
                    v-model="selected_filters.lang"
                    :label="lang.label"
                    v-for="lang in filters.lang"
                    :key="lang.val"
                  />
                </div>
              </div>
              <div class="col">
                <div class="text-center text-primary">Time</div>
                <div class="q-mt-sm">
                  <q-checkbox
                    :val="time.val"
                    v-model="selected_filters.time"
                    :label="time.label"
                    v-for="time in filters.time"
                    :key="time.val"
                  />
                </div>
              </div>
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Apply" color="primary" v-close-popup />
            <q-btn
              flat
              label="Clear"
              color="primary"
              @click.prevent="clear_filters"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <div>
        <q-input
          outlined
          bottom-slots
          v-model="search_text"
          label="Search"
          :dense="true"
        >
          <template v-slot:append>
            <q-icon
              v-if="search_text !== ''"
              name="mdi-close"
              @click="search_text = ''"
              class="cursor-pointer"
            />
            <q-icon name="mdi-magnify" />
          </template>
        </q-input>
      </div>
      <new-releases />
      <celebrity-curators />

      <template v-for="(contest, index) in live_contests">
        <contest-releases :contest="contest" :key="`contest_${index}`" />
      </template>

      <most-recommended />

      <template v-for="(mp_genre, index) in live_mp_genres">
        <mp-genre-movies :mp-genre="mp_genre" :key="`mpgenre_${index}`" />
      </template>
    </div>
  </base-layout>
</template>
<script>
import setting from "@/setting";
import BaseLayout from "@/layouts/Base";
import CelebrityCurators from "@/components/home/CelebrityCurators";
import NewReleases from "@/components/home/NewReleases";
import ContestReleases from "@/components/home/ContestReleases";
import MpGenreMovies from "@/components/home/MpGenreMovies";
import MostRecommended from "@/components/home/MostRecommended";

import _ from "lodash";
export default {
  name: "home-page",
  components: {
    BaseLayout,
    NewReleases,
    ContestReleases,
    CelebrityCurators,
    MpGenreMovies,
    MostRecommended,
  },
  metaInfo: {
    title: "Home",
  },
  data() {
    return {
      thumbStyle: {
        right: "2px",
        borderRadius: "1px",
        backgroundColor: "#f7cd23",
        opacity: 0.75,
        height: "2px",
      },
      dimen: {
        height: 225,
        width: 110,
      },
      search_text: "",
      selected_filters: { time: [], genre: [], lang: [] },
      filters: {
        lang: [
          { label: "English", val: "eng" },
          { label: "Hindi", val: "hin" },
          { label: "Tamil", val: "tamil" },
          { label: "Bengali", val: "ban" },
        ],
        time: [
          { label: "Live", val: "live" },
          { label: "Last Week", val: "week" },
          { label: "Last Month", val: "month" },
        ],
        genre: [
          { label: "Crime", val: "crime" },
          { label: "Drama", val: "drama" },
          { label: "Romance", val: "romance" },
          { label: "Comedy", val: "comedy" },
        ],
      },
      show_filter: false,
      action_btns: [
        {
          icon: "mdi-filter-outline",
          to: this.show_filters,
          type: "dialog",
          auth: false,
        },
      ],
      slide: "",
      categories: [],

      live_contests: [],
      live_mp_genres: [],
    };
  },
  mounted() {
    this.action_btns.forEach((btn) => {
      setting.addActionBtn(btn);
    });
    this.live_contests = [
      {
        name: "January",
        id: 1,
      },
      {
        name: "February",
        id: 2,
      },
    ];
    this.most_recommended_movies = this.get_rand_movie_items(
      10,
      "port",
      "w_200,h_300"
    );
    this.live_mp_genres = [
      {
        id: 1,
        name: "Mind Bending",
      },
      {
        id: 2,
        name: "Time Travel",
      },
    ];
  },
  beforeDestroy() {
    this.action_btns.forEach((btn) => {
      setting.removeActionBtn(btn);
    });
  },
  computed: {
    decounced_search() {
      return _.debounce(this.do_search, 300);
    },
  },
  watch: {
    search_text() {
      this.decounced_search();
    },
  },
  methods: {
    do_search() {
      console.log(this.search_text);
    },
    detail_page(movie) {
      var movie_id = movie.id;
      movie_id = 1;
      this.$router.push({
        name: "movie-detail",
        params: { id: movie_id, slug: this.slugify(movie.title) },
      });
    },
    show_filters() {
      this.show_filter = !this.show_filter;
    },
    clear_filters() {
      this.selected_filters.time.splice(0, this.selected_filters.time.length);
      this.selected_filters.genre.splice(0, this.selected_filters.genre.length);
      this.selected_filters.lang.splice(0, this.selected_filters.lang.length);
    },

    // random movie generator methods
    get_rand_poster(num, orientation, trans_query) {
      // num => int: 5, 10
      // orientation => string: 'port' or 'land'
      // trans_query => string: cloudinary resize query "w_250,h_200"
      const MAX_MOVIE_ID = 51;
      var urls = [];
      var rand_id = 0;
      var generated_ids = [];
      while (generated_ids.length < num) {
        rand_id = Math.floor(Math.random() * MAX_MOVIE_ID + 1);
        if (generated_ids.indexOf(rand_id) == -1) {
          generated_ids.push(rand_id);
          urls.push(
            `https://res.cloudinary.com/moviepedia/image/upload/${trans_query}/v1601209839/movie_thumbs/${orientation}/movie${rand_id}.jpg`
          );
        }
      }
      return urls;
    },
    get_rand_movie_items(num, orientation, trans_query) {
      // num => int: 5, 10
      // orientation => string: 'port' or 'land'
      // trans_query => string: cloudinary resize query "w_250,h_200"
      var items = [];
      var urls = this.get_rand_poster(num, orientation, trans_query);
      urls.forEach((url, i) => {
        items.push({
          id: i,
          title: "30 Days of Existence | A Moviepedia Short Film on Depression",
          poster: url,
        });
      });
      return items;
    },
  },
};
</script>
<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 300px;
  :hover {
    background-color: blue;
  }
}
</style>