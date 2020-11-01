<template>
  <base-layout>
    <div class="q-pa-md" v-if="hidden_mode">
      <div class="row justify-center">
        <q-skeleton class="q-mx-sm" type="QAvatar" size="100px" />
      </div>
      <div class="row q-mt-md justify-center">
        <div class="col-8 text-center">
          <q-skeleton type="rect" />
        </div>
      </div>
      <div class="row q-mt-lg">
        <div class="col-8 offset-2">
          <div class="row">
            <div class="col-4 text-center">
              <q-skeleton class="q-mx-sm" type="text" />
            </div>
            <div class="col-4 text-center">
              <q-skeleton class="q-mx-sm" type="text" />
            </div>
            <div class="col-4 text-center">
              <q-skeleton class="q-mx-sm" type="text" />
            </div>
          </div>
        </div>
      </div>
      <q-skeleton class="q-mt-md q-mx-lg" type="text" />
      <div class="q-mt-lg text-center">
        <div>Sign In to check your profile</div>
        <q-btn
          flat
          text
          color="primary"
          :to="{ name: 'login' }"
          label="Sign In"
        />
      </div>
    </div>
    <template v-else>
      <transition
        name="custom-classes-transition"
        enter-active-class="animated animate__fadeIn"
        leave-active-class="animated animate__fadeOut"
        mode="out-in"
        :duration="200"
      >
        <profile-filmmaker v-if="show_filmmaker_profile"></profile-filmmaker>
        <profile-audience v-if="!show_filmmaker_profile"></profile-audience>
      </transition>
    </template>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/Base";
import ProfileAudience from "@/components/ProfileAudience";
import ProfileFilmmaker from "@/components/ProfileFilmmaker";
import {
  PROFILE_WATCHLIST_REQUEST,
  PROFILE_RECOMMENDS_REQUEST,
  PROFILE_REQUEST,
} from "@/store/actions";
import { mapState } from "vuex";
export default {
  name: "profile-page",
  components: {
    BaseLayout,
    ProfileAudience,
    ProfileFilmmaker,
  },
  metaInfo: {
    title: "Profile",
  },
  data() {
    return {};
  },
  mounted() {
    if (this.is_authenticated) {
      this.$store.dispatch(PROFILE_REQUEST, this.my_profile.profile_id);
      this.$store.dispatch(PROFILE_WATCHLIST_REQUEST);
      this.$store.dispatch(PROFILE_RECOMMENDS_REQUEST);
    }
  },
  watch: {},
  computed: {
    hidden_mode() {
      return !this.is_authenticated;
    },
    ...mapState("profile", {
      show_filmmaker_profile: (state) => state.show_filmmaker_profile,
    }),
  },
};
</script>
<style lang="scss">
.q-linear-progress__track {
  opacity: 1;
}
.q-linear-progress__model {
  background: linear-gradient(45deg, yellow, green);
}
.profile-options {
}
</style>