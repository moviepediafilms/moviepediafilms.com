<template>
  <div ref="container">
    <div class="row q-col-gutter-sm" v-if="movies.length > 0">
      <div class="col-4 col-sm-3" v-for="movie in movies" :key="movie.id">
        <movie
          :profile="profile"
          :movie="movie"
          :show-state="is_viewers_profile"
          @click="on_movie_select(movie)"
        ></movie>
      </div>
    </div>
    <empty-state
      :title="emptyTitle"
      :desc="emptyDesc"
      :icon="emptyIcon"
      :image="emptyImage"
      v-else
    />
  </div>
</template>
<script>
import { profile_service } from "@/services";
import Movie from "@/components/movie/Movie";
export default {
  components: {
    Movie,
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
    emptyTitle: {
      type: String,
      default: "Nothing to show here",
    },
    emptyDesc: {
      type: String,
      default: "No Reviews found!",
    },
    emptyIcon: {
      type: String,
      default: null,
    },
    emptyImage: {
      type: String,
      default: null,
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
    profile_id() {
      return this.profile.id;
    },
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
    profile_id() {
      this.movies.splice(0, this.movies.length);
      this.fetch_filmography();
    },
  },
  methods: {
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
            "Your film is pending for approval from our end. We'll notify you as soon as it's approved for screening.",
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
            `${this.profile_id}/filmography`
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