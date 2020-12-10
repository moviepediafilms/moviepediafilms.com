<template>
  <div ref="container">
    <div class="row q-col-gutter-sm" v-if="movies.length > 0">
      <div class="col-4 col-sm-3" v-for="movie in movies" :key="movie.id">
        <q-card flat v-ripple @click="on_movie_select(movie)">
          <q-img :ratio="9 / 16" :src="`${media_base}${movie.poster}`">
            <div class="absolute-bottom text-center bg-transparent">
              <div v-if="is_viewers_profile">
                <q-badge
                  text-color="dark"
                  :color="get_status_color(movie.state)"
                >
                  {{ get_movie_status_txt(movie.state) }}
                </q-badge>
              </div>
            </div>
            <template v-slot:error>
              <div class="absolute-full flex flex-center bg-primary text-dark">
                <div class="text-h3">{{ movie.title }}</div>
                <div class="text-caption">
                  <q-icon name="mdi-close" color="negative" size="24px" />Cannot
                  load image
                </div>
              </div>
            </template>
          </q-img>
          <div class="q-my-sm">
            <div class="flex justify-around items-center">
              <div class="">
                <q-icon name="mdi-bullhorn" />
                {{ movie.recommend_count }}
              </div>
              <div class="text-h2 text-primary text-weight-bolder">4.5</div>
            </div>
            <hr class="q-mx-sm" />
            <div class="text-center">
              <span>
                {{ my_roles_txt(movie) }}
              </span>
            </div>
          </div>
        </q-card>
      </div>
    </div>
    <empty-state
      title="Nothing here!"
      desc="Your don't have an association with any movie on our platform!"
      icon="mdi-emoticon-sad"
      v-else
    />
  </div>
</template>
<script>
import { profile_service } from "@/services";
export default {
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
    all_my_roles() {
      var my_roles = new Set();
      this.movies.forEach((movie) => {
        this.my_roles(movie).forEach((role) => {
          my_roles.add(role.role);
        });
      });
      return Array.from(my_roles);
    },
  },
  watch: {
    count() {
      if (this.count == 0) this.$emit("empty");
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
      if (movie.state === "P") {
        this.$router.push({
          name: "movie-detail",
          params: {
            id: movie.id,
            slug: this.slugify(movie.title),
          },
        });
      } else {
        this.$q.notify({
          color: "primary",
          textColor: "dark",
          icon: "mdi-alert-circle-outline",
          message:
            "Movie is being screened and soon will be approved for audience",
        });
      }
    },
    get_status_color(status) {
      return {
        C: "red-4",
        S: "primary",
        P: "green-4",
        R: "red-4",
      }[status];
    },
    get_movie_status_txt(status) {
      return {
        C: "Incomplete",
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