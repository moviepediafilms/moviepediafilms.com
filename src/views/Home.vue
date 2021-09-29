<template>
  <base-layout>
    <div class="q-ma-sm">
      <q-dialog v-model="show_filter">
        <q-card>
          <q-card-section>
            <div class="text-title text-h3 text-center text-primary">
              Filters
            </div>
          </q-card-section>
          <q-card-section>
            <div class="row">
              <div class="col-12">
                <q-select
                  filled
                  multiple
                  use-chips
                  label="Genre"
                  emit-value
                  option-value="val"
                  v-model="selected_genres"
                  :options="filters.genre"
                />
                <q-select
                  class="q-mt-md"
                  filled
                  multiple
                  use-chips
                  label="Language"
                  option-value="val"
                  emit-value
                  v-model="selected_langs"
                  :options="filters.lang"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12" v-if="false">
                <div class="text-center text-primary">Genre</div>
                <div class="q-mt-sm row justify-around content-start">
                  <q-checkbox
                    v-for="genre in filters.genre"
                    :key="genre.val"
                    class="ellipsis"
                    style="width: 90px"
                    :val="genre.val"
                    v-model="selected_genres"
                    :label="genre.label"
                  />
                </div>
              </div>
              <div class="col-12" v-if="false">
                <div class="text-center text-primary">Langugage</div>
                <div class="q-mt-sm row justify-around content-start">
                  <q-checkbox
                    :val="lang.val"
                    class="ellipsis"
                    style="width: 90px"
                    v-model="selected_langs"
                    :label="lang.label"
                    v-for="lang in filters.lang"
                    :key="lang.val"
                  />
                </div>
              </div>
              <div class="col-12 q-mt-md">
                <div class="text-center text-primary">Time</div>
                <div class="q-mt-sm">
                  <q-checkbox
                    :val="time.val"
                    v-model="selected_time"
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
              v-close-popup
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
      <div
        class="q-pb-md truncate-chip-labels"
        v-if="
          selected_genres.length +
            selected_langs.length +
            selected_time.length >
          0
        "
      >
        <small>Active filters</small><br />

        <q-chip
          size="sm"
          removable
          @remove="selected_genres.pop(name)"
          color="primary"
          text-color="dark"
          :label="name"
          :title="name"
          v-for="name in selected_genres"
          :key="'genre_' + name"
        />

        <q-chip
          size="sm"
          removable
          @remove="selected_langs.pop(name)"
          color="primary"
          text-color="dark"
          :label="name"
          :title="name"
          v-for="name in selected_langs"
          :key="'lan_' + name"
        />
        <q-chip
          size="sm"
          removable
          @remove="selected_time.pop(name)"
          color="primary"
          text-color="dark"
          :label="name"
          :title="name"
          v-for="name in selected_time"
          :key="'lan_' + name"
        />
        <q-chip
          style="float: right"
          clickable
          size="sm"
          @click="clear_filters"
          color="negative"
          class="self-right"
          text-color="white"
          label="Clear All"
          title="Clear All"
        />
      </div>
      <search-and-or-filtered
        :search-text="search_text"
        :langs="selected_langs"
        :genres="selected_genres"
        :time="selected_time"
        v-if="
          search_text ||
          selected_langs.length > 0 ||
          selected_genres.length > 0 ||
          selected_time.length > 0
        "
      />
      <div v-else>
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
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn
          ref="fab"
          fab
          icon="mdi-information"
          color="primary"
          text-color="dark"
          padding="12px"
          :to="{ name: 'welcome' }"
        >
          <span class="q-ml-xs">How it works</span>
        </q-btn>
      </q-page-sticky>
    </div>
  </base-layout>
</template>
<script>
import settings from "@/settings";
import BaseLayout from "@/layouts/Base";
import CelebrityCurators from "@/components/home/CelebrityCurators";
import NewReleases from "@/components/home/NewReleases";
import ContestReleases from "@/components/home/ContestReleases";
import MpGenreMovies from "@/components/home/MpGenreMovies";
import MostRecommended from "@/components/home/MostRecommended";

import SearchAndOrFiltered from "@/components/home/search/SearchAndOrFiltered";
import { contest_service, mp_genre_service } from "@/services";
import { mapState } from "vuex";
import { LANG_REQUEST, GENRE_REQUEST } from "@/store/actions";
export default {
  name: "home-page",
  components: {
    BaseLayout,
    NewReleases,
    ContestReleases,
    CelebrityCurators,
    MpGenreMovies,
    MostRecommended,
    SearchAndOrFiltered,
  },
  metaInfo: {
    title: "Home",
  },
  data() {
    return {
      search_text: "",
      selected_genres: [],
      selected_langs: [],
      selected_time: [],
      show_filter: false,
      filter_action_btn: {
        icon: "mdi-filter-outline",
        active_icon: "mdi-filter",
        count: 0,
        to: this.show_filters,
        type: "dialog",
        auth: false,
      },
      live_contests: [],
      live_mp_genres: [],
    };
  },
  created() {
    this.$store.dispatch(LANG_REQUEST);
    this.$store.dispatch(GENRE_REQUEST);
  },
  mounted() {
    settings.addActionBtn(this.filter_action_btn);
    this.fetch_live_contests();
    this.fetch_live_mp_genres();
  },
  beforeDestroy() {
    settings.removeActionBtn(this.filter_action_btn);
  },
  computed: {
    ...mapState("genre", {
      genres: (state) => state.genres,
    }),
    ...mapState("lang", {
      langs: (state) => state.langs,
    }),
    filter_langs() {
      var langs = [];
      this.langs.forEach((lang) => {
        langs.push({ label: lang.name, val: lang.name });
      });
      return langs;
    },
    filter_genres() {
      var genres = [];
      this.genres.forEach((genre) => {
        genres.push({ label: genre.name, val: genre.name });
      });
      return genres;
    },
    filters() {
      return {
        lang: this.filter_langs,
        time: [
          { label: "Live", val: "live" },
          { label: "Last Week", val: "week" },
          { label: "Last Month", val: "month" },
        ],
        genre: this.filter_genres,
      };
    },
  },
  watch: {
    selected_genres() {
      this.filter_action_btn.count = this.get_filter_type_count();
    },
    selected_time() {
      this.filter_action_btn.count = this.get_filter_type_count();
    },
    selected_langs() {
      this.filter_action_btn.count = this.get_filter_type_count();
    },
  },
  methods: {
    get_filter_type_count() {
      var res = 0;
      if (this.selected_genres.length > 0) res += 1;
      if (this.selected_time.length > 0) res += 1;
      if (this.selected_langs.length > 0) res += 1;
      return res;
    },
    fetch_live_contests() {
      contest_service
        .get({ live: true })
        .then((data) => {
          this.live_contests.push(...data.results);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetch_live_mp_genres() {
      mp_genre_service
        .get()
        .then((data) => {
          this.live_mp_genres.push(...data.results);
        })
        .catch((error) => {
          console.log(error);
        });
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
      this.selected_genres.splice(0, this.selected_genres.length);
      this.selected_langs.splice(0, this.selected_langs.length);
      this.selected_time.splice(0, this.selected_time.length);
      this.search_text = "";
    },
  },
};
</script>