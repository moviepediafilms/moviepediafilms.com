<template>
  <q-card flat v-ripple>
    <movie-image
      :enableOptions="enableOptions"
      :title="movie.title"
      :state="movie.state"
      :poster="movie.poster"
      :show-state="is_my_profile"
      @click="$emit('click')"
      @showOptions="$emit('showOptions')"
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
    enableOptions: {
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
    is_my_profile() {
      return this.profile && this.profile.id == this.my_profile.id;
    },
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
};
</script>