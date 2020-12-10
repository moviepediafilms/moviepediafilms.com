<template>
  <div ref="container">
    <div class="row q-col-gutter-sm" v-if="movies.length > 0">
      <div class="col-4 col-sm-3" v-for="movie in movies" :key="movie.id">
        <q-card flat v-ripple @click="on_movie_select(movie)">
          <movie-image
            :title="movie.title"
            :state="movie.state"
            :poster="movie.poster"
            :show-state="is_my_profile"
          />

          <div class="q-my-sm">
            <div class="flex justify-around items-center">
              <div class="">
                <q-icon name="mdi-bullhorn" />
                {{ movie.recommend_count }}
              </div>
              <div class="text-h2 text-primary text-weight-bolder">
                {{ movie.score }}
              </div>
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
import MovieImage from "@/components/MovieImage";
export default {
  components: {
    MovieImage,
  },
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
    is_my_profile() {
      return this.profile && this.profile.id == this.my_profile.id;
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
        var messages = {
          C:
            "Your film submission is still pending. Complete your payment to proceed and successfully submit your film.",
          S:
            "Your film is pending for approval. We'll notify you as soon as it's approved for screening.",
          R:
            "Your film didn't get through. But don't worry, your next film submission is on us. :)",
        };

        var message = messages[movie.state];
        var actions = [];
        if (movie.state === "C")
          actions.push({
            label: "My Submissions",
            color: "dark",
            handler: () => {
              this.$router.push({ name: "my-submissions" });
            },
          });

        this.$q.notify({
          color: "primary",
          multiLine: true,
          textColor: "dark",
          icon: "mdi-alert-circle-outline",
          message: message,
          actions: actions,
        });
      }
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