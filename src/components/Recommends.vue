<template>
  <div>
    <div class="row">
      <div
        class="col flex items-center justify-between"
        v-if="movies.length > 0"
      >
        <q-btn-dropdown
          split
          rounded
          size="sm"
          padding="sm"
          color="primary"
          text-color="dark"
          :label="selected_month"
        >
          <q-list>
            <q-item
              clickable
              v-close-popup
              v-for="(month, index) in months"
              :key="index"
              @click="selected_month = month"
            >
              <q-item-section>
                <q-item-label>{{ month }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <div class="text-right">
          <q-btn
            size="md"
            disable
            flat
            icon="mdi-thumb-up-outline"
            :label="'45 likes'"
          />
          <q-btn
            size="sm"
            label="Share"
            color="primary"
            rounded
            text-color="dark"
            icon="mdi-share"
          />
        </div>
      </div>
    </div>
    <movies
      class="q-mt-md"
      :movies="filtered_movies"
      :options="menu_options"
      @remove="on_remove"
      @item-selected="on_movie_click"
      v-if="movies.length > 0"
    ></movies>
    <empty-state
      title="Nothing to show here."
      desc="Recommend the best from our featured films by using the <span class='mdi mdi-bullhorn'></span>
 button"
      image="/img/empty/2.svg"
      v-else
    />
  </div>
</template>
<script>
import moment from "moment";
import Movies from "@/components/Movies";
import { PROFILE_REMOVE_RECOMMEND } from "@/store/actions";
export default {
  components: {
    Movies,
  },
  props: {
    movies: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      selected_month: "",
      menu_options: [{ name: "Remove", icon: "mdi-trash-can", emit: "remove" }],
    };
  },
  computed: {
    monthly_grouped_movies() {
      var movies = {};
      var month = null;
      this.movies.forEach((movie) => {
        console.log("movie", movie);
        month = movie.publish_on
          ? moment(movie.publish_on).format("MMMM")
          : moment().format("MMMM");
        if (movies[month]) movies[month].push(movie);
        else movies[month] = [movie];
      });
      return movies;
    },
    months() {
      var ordered = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      var months = Object.keys(this.monthly_grouped_movies);
      return ordered.filter((name) => months.indexOf(name) != -1);
    },
    filtered_movies() {
      return this.monthly_grouped_movies[this.selected_month];
    },
  },
  mounted() {
    console.log(this.monthly_grouped_movies);
    this.selected_month = this.months[0];
  },
  methods: {
    on_remove(movie) {
      this.$store.dispatch(PROFILE_REMOVE_RECOMMEND, movie);
    },
    on_movie_click(movie) {
      this.$router.push({
        name: "movie-detail",
        params: { id: movie.id, slug: this.slugify(movie.title) },
      });
    },
  },
};
</script>