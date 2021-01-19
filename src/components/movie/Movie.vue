<template>
  <q-card flat v-ripple :style="cardStyle">
    <movie-image
      :menuBtn="menuBtn"
      :title="movie.title"
      :state="movie.state"
      :poster="movie.poster"
      :show-state="showState"
      :runtime="movie.runtime"
      @click="on_movie_select"
      @showOptions="$emit('showOptions')"
    />

    <div class="q-my-sm">
      <div class="flex justify-around items-center">
        <div class="">
          <q-icon name="mdi-bullhorn" />
          {{ movie.recommend_count }}
        </div>
        <div class="text-h3 text-primary text-weight-bolder">
          {{ movie.score }}
        </div>
      </div>
      <hr class="q-mx-sm" v-if="showMyRoles" />
      <div class="text-center" v-if="showMyRoles && my_roles_txt">
        <span>
          {{ my_roles_txt }}
        </span>
      </div>
    </div>
  </q-card>
</template>
<script>
import MovieImage from "@/components/movie/Image";
export default {
  components: {
    MovieImage,
  },
  props: {
    showState: {
      type: Boolean,
      default: false,
    },
    cardStyle: {
      type: Object,
      default() {
        return {};
      },
    },
    emitSelection: {
      type: Boolean,
      default: false,
    },
    showMyRoles: {
      type: Boolean,
      default: true,
    },
    menuBtn: {
      type: Boolean,
      default: false,
    },
    movie: {
      type: Object,
      default() {
        return {};
      },
    },
    profile: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    my_roles_txt() {
      var txt = "";
      this.my_roles.forEach((role) => {
        txt += role.role + ", ";
      });
      return txt.slice(0, -2);
    },
    my_roles() {
      return this.movie.crew.filter(
        (item) => item.profile_id == this.profile.id
      );
    },
  },
  methods: {
    on_movie_select() {
      if (this.emitSelection) this.$emit("select");
      else
        this.$router.push({
          name: "movie-detail",
          params: {
            id: this.movie.id,
            slug: this.slugify(this.movie.title),
          },
        });
    },
  },
};
</script>