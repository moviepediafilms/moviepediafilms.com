<template>
  <div ref="container">
    <q-list class="col" v-if="movies.length > 0">
      <q-item
        v-ripple
        @click="on_movie_select"
        v-for="movie in movies"
        :key="movie.id"
      >
        <q-item-section top thumbnail>
          <img :src="movie.poster" />
        </q-item-section>
        <q-item-section>
          <q-item-label lines="2">{{ movie.title }}<br /></q-item-label>
          <q-item-label>
            <template v-if="is_viewers_profile">Your Roles: </template>
            <template v-else>His Roles: </template>
            {{ my_roles_txt(movie) }}
          </q-item-label>
          <q-item-label v-if="is_viewers_profile">
            <q-badge
              class="q-mr-xs"
              text-color="dark"
              :color="get_status_color(movie.state)"
            >
              {{ get_movie_status_txt(movie.state) }}
            </q-badge>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <div class="text-grey-7 text-center" v-else>
      <q-icon name="mdi-emoticon-sad" size="80px" class="q-mb-md" />
      <div class="text-h4">Add yourself as crew member in movies</div>
      <div class="text-caption q-mt-sm">
        Your don't have an association with any movie on our platform!
      </div>
    </div>
  </div>
</template>
<script>
import { profile_service } from "@/services";
// import FilmographyListItem from "@/components/FilmographyListItem";
export default {
  components: {},
  props: {
    profile: {
      type: Object,
      default() {
        return {};
      },
    },
    page_size: {
      type: Number,
      default: 20,
    },
  },
  data() {
    return {
      count: -1,
      movies: [],
      error_msg: "",
    };
  },
  mounted() {
    this.fetch_filmography();
  },
  computed: {
    is_viewers_profile() {
      return this.profile.id == this.my_profile.id;
    },
  },
  methods: {
    my_roles_txt(movie) {
      var roles = this.my_roles(movie);
      var txt = "";
      roles.forEach((role) => {
        txt += role.role + ", ";
      });
      return txt.slice(0, -2);
    },
    my_roles(movie) {
      return movie.crew.filter((item) => item.profile_id == this.profile.id);
    },
    on_movie_select(movie) {
      console.log(movie);
    },
    get_status_color(status) {
      return {
        S: "primary",
        P: "green-4",
        R: "red-4",
      }[status];
    },
    get_movie_status_txt(status) {
      return {
        S: "Pending",
        P: "Approved",
        R: "Rejected",
      }[status];
    },
    fetch_filmography() {
      if (this.count == -1 || this.count > this.movies.length) {
        profile_service
          .get(
            { limit: this.page_size, offset: this.movies.length },
            `${this.profile.id}/filmography`
          )
          .then((data) => {
            this.movies.push(...data.results);
            this.count = data.count;
          })
          .catch((error) => {
            this.error_msg = this.decode_error_message(error);
          });
      }
    },
  },
};
</script>