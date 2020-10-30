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
      <profile-audience
        @switch-profile="show_audience_profile = !show_audience_profile"
        v-show="show_audience_profile"
      ></profile-audience>
      <profile-filmmaker
        @switch-profile="show_audience_profile = !show_audience_profile"
        v-show="!show_audience_profile"
      ></profile-filmmaker>
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
    return {
      show_audience_profile: true,
    };
  },
  mounted() {
    this.show_audience_profile = !this.is_director;
    if (this.is_authenticated) {
      this.$store.dispatch(PROFILE_REQUEST, this.my_profile.profile_id);
      this.$store.dispatch(PROFILE_WATCHLIST_REQUEST);
      this.$store.dispatch(PROFILE_RECOMMENDS_REQUEST);
    }
  },
  computed: {
    hidden_mode() {
      return !this.is_authenticated;
    },
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