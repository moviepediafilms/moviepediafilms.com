<template>
  <base-layout>
    <div v-if="!loading && !profile.name">
      <not-found />
    </div>
    <div v-else>
      <div class="q-pa-md" v-if="!is_authenticated">
        <template v-if="is_my_profile">
          <div class="row justify-center">
            <q-skeleton
              class="q-mx-sm"
              type="QAvatar"
              size="100px"
              animation="none"
            />
          </div>
          <div class="row q-mt-md justify-center">
            <div class="col-8 text-center">
              <q-skeleton type="rect" animation="none" />
            </div>
          </div>
        </template>
        <template v-else>
          <div class="row justify-center">
            <div class="col text-center">
              <profile-picture :editable="false" :profile="profile" />
              <div class="text-h2 q-mt-md">
                {{ profile.name }}
              </div>
            </div>
          </div>
        </template>
        <div class="row q-mt-lg">
          <div class="col-8 offset-2">
            <div class="row">
              <div class="col-4 text-center">
                <q-skeleton class="q-mx-sm" type="text" animation="none" />
              </div>
              <div class="col-4 text-center">
                <q-skeleton class="q-mx-sm" type="text" animation="none" />
              </div>
              <div class="col-4 text-center">
                <q-skeleton class="q-mx-sm" type="text" animation="none" />
              </div>
            </div>
          </div>
        </div>
        <q-skeleton class="q-mt-md q-mx-lg" type="text" animation="none" />
        <div class="q-mt-lg text-center">
          <div>
            Sign In to check {{ is_my_profile ? "your" : "complete" }} profile
          </div>
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
          <div class="row" v-if="!profile">
            <div class="col">
              <div class="row justify-center">
                <q-skeleton class="q-mx-sm" type="QAvatar" size="100px" />
              </div>
              <div class="row">
                <div class="col-8 offset-2">
                  <q-skeleton class="q-mx-lg" type="text" />
                </div>
              </div>
            </div>
          </div>
          <profile-filmmaker
            :profile="profile"
            @toggle="show_filmmaker_profile = !show_filmmaker_profile"
            v-if="profile && show_filmmaker_profile"
          ></profile-filmmaker>
          <profile-audience
            :profile="profile"
            @toggle="show_filmmaker_profile = !show_filmmaker_profile"
            v-if="profile && !show_filmmaker_profile"
          ></profile-audience>
        </transition>
      </template>
    </div>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/Base";
import NotFound from "@/components/NotFound";
import ProfileAudience from "@/components/profile/Curator";
import ProfileFilmmaker from "@/components/profile/Creator";
import ProfilePicture from "@/components/profile/Image";
import {
  PROFILE_WATCHLIST_REQUEST,
  PROFILE_RECOMMENDS_REQUEST,
  PROFILE_REQUEST,
  FOLLOW_REQUEST,
} from "@/store/actions";
import { profile_service } from "@/services";
export default {
  name: "profile-page",
  components: {
    BaseLayout,
    ProfileAudience,
    ProfileFilmmaker,
    ProfilePicture,
    NotFound,
  },
  metaInfo: {
    title: "Profile",
  },
  data() {
    return {
      loading: true,
      profile: {},
      show_filmmaker_profile: false,
      recommends: [],
    };
  },
  mounted() {
    this.load_data();
  },
  computed: {
    is_my_profile() {
      return this.profile_id == "me";
    },
    profile_id() {
      return this.$route.params.id;
    },
  },
  watch: {
    $route() {
      this.load_data();
    },
    my_profile() {
      if (this.is_my_profile) this.profile = this.my_profile;
    },
  },
  methods: {
    load_data() {
      if (this.is_my_profile) {
        if (this.is_authenticated) this.load_self_data();
      } else {
        this.get_profile();
      }
    },
    load_self_data() {
      this.$store.dispatch(PROFILE_REQUEST, this.my_profile.id).then(() => {
        this.profile = this.my_profile;
      });
      this.$store.dispatch(PROFILE_WATCHLIST_REQUEST);
      this.$store.dispatch(PROFILE_RECOMMENDS_REQUEST);
      this.$store.dispatch(FOLLOW_REQUEST, {
        profile_id: this.my_profile.id,
        type: "following",
      });
      this.$store.dispatch(FOLLOW_REQUEST, {
        profile_id: this.my_profile.id,
        type: "followers",
      });
    },
    get_profile() {
      this.loading = true;
      profile_service
        .get({}, this.profile_id)
        .then((data) => {
          this.profile = data;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
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
</style>