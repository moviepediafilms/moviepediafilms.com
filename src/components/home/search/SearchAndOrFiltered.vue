<template>
  <div ref="list">
    <div class="row">
      <div class="col-12" v-if="people.length > 0">
        <h3>People</h3>
        <horizontal-items :height="90" :width="100">
          <div
            class="text-center q-my-md q-mr-md"
            v-for="(person, index) in people"
            :key="index"
            v-ripple
            @click="on_profile_click(person)"
          >
            <q-avatar size="60px">
              <q-img :src="person.image || '/default_avatar.png'" />
            </q-avatar>
            <div class="q-mt-xs text-title">{{ person.name }}</div>
          </div>
        </horizontal-items>
      </div>
      <div class="col-12 q-mt-md">
        <h3>Films</h3>
        <div class="row wrap justify-start content-start">
          <div
            class="col-3 q-pa-xs"
            style="overflow: auto; display: inline-block"
            v-for="(movie, index) in movies"
            :key="index"
          >
            <movie
              :movie="movie"
              :show-my-roles="false"
              :show-state="false"
            ></movie>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Movie from "@/components/movie/Movie";
import _ from "lodash";
import { movie_service, profile_service } from "@/services";
import settings from "@/settings";
import HorizontalItems from "@/components/HorizontalItems.vue";
export default {
  components: { Movie, HorizontalItems },
  props: {
    searchText: {
      type: String,
    },
    langs: {
      type: Array,
      default() {
        return [];
      },
    },
    genres: {
      type: Array,
      default() {
        return [];
      },
    },
    time: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      loading: false,
      ppl_loading: false,
      count: undefined,
      count_pp: undefined,
      fetch_size: settings.PAGE_SIZE,
      movies: [],
      people: [],
    };
  },
  computed: {
    throttled_scroll_handler() {
      return _.throttle(this.scroll_handler, 300);
    },
    filter_lang_text() {
      return this.langs.join(",");
    },
    filter_genre_text() {
      return this.genres.join(",");
    },
    throttled_search() {
      return _.debounce(this.search_and_filter, 400);
    },
  },
  watch: {
    searchText() {
      this.throttled_search();
    },
    filter_genre_text() {
      this.throttled_search();
    },
    filter_lang_text() {
      this.throttled_search();
    },
  },
  mounted() {
    this.search_and_filter();
  },
  methods: {
    on_profile_click(profile) {
      if (profile.is_celeb) {
        console.log("celeb recommends page");
        this.$router.push({
          name: "judge-recommendation",
          params: {
            id: profile.id,
          },
        });
      } else {
        this.$router.push({
          name: "profile",
          params: { id: profile.id },
        });
      }
    },
    search_and_filter() {
      this.movies.splice(0, this.movies.length);
      this.count = undefined;
      this.fetch_movies();
      this.people.splice(0, this.people.length);
      this.pp_count = undefined;
      this.fetch_people();
    },
    scroll_handler() {
      if (this.$refs.list) {
        var list = this.$refs.list;
        var dimens = list.getClientRects()[0];
        if (dimens.bottom < window.innerHeight) {
          this.fetch_movies();
        }
      }
    },
    fetch_movies() {
      if (this.loading) return;
      if (this.movies.length >= this.count) return;
      this.loading = true;
      var params = {
        genres__name__in: this.filter_genre_text,
        lang__name__in: this.filter_lang_text,
        search: this.searchText,
        limit: this.fetch_size,
        offset: this.movies.length,
      };
      movie_service
        .get(params)
        .then((data) => {
          this.movies.push(...data.results);
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
    fetch_people() {
      if (this.ppl_loading) return;
      if (this.people.length >= this.pp_count) return;
      if (!this.searchText) return;
      this.ppl_loading = true;
      var params = {
        search: this.searchText,
        limit: this.fetch_size,
        offset: this.people.length,
      };
      profile_service
        .get(params)
        .then((data) => {
          this.people.push(...data.results);
          this.pp_count = data.count;
          this.ppl_loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.ppl_loading = false;
        });
    },
  },
};
</script>