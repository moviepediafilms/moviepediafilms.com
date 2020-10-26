<template>
  <base-layout>
    <div class="q-pa-md">
      <div class="row justify-center">
        <div class="text-center">
          <q-avatar size="100px">
            <img :src="my_profile.image" />
          </q-avatar>
          <div class="text-h5 text-weight-bold text-primary q-mt-md">
            {{ my_profile.name }}
          </div>
        </div>
      </div>
      <div class="row justify-around q-mt-md">
        <div class="q-mx-md text-center">
          <div class="text-uppercase text-title text-weight-bolder">
            cinephile
          </div>
          <div class="q-mt-xs text-uppercase text-weight-light text-caption">
            level
          </div>
        </div>
        <div class="q-mx-md text-center">
          <div class="text-uppercase text-title text-weight-bolder">1.2K</div>
          <div class="q-mt-xs text-uppercase text-weight-light text-caption">
            rank
          </div>
        </div>
        <div class="q-mx-md text-center">
          <div class="text-uppercase text-title text-weight-bolder">300</div>
          <div class="q-mt-xs text-uppercase text-weight-light text-caption">
            review
          </div>
        </div>
      </div>
      <div class="row justify-around q-mt-md">
        <q-linear-progress
          size="20px"
          :value="0.25"
          track-color="white"
          dark
          rounded
          color="light-blue-2"
          class="q-mt-sm"
        >
          <div class="absolute-full row justify-between">
            <q-badge
              color="transparent"
              text-color="dark"
              @click="show_xp_info_dialog"
            >
              <q-icon name="mdi-shoe-print" class="q-mr-xs" />
              20
            </q-badge>
            <q-badge
              color="transparent"
              text-color="dark"
              @click="show_earning_info_dialog"
            >
              <q-icon name="mdi-currency-inr" class="q-mr-xs" />
              <span>324</span>
            </q-badge>
            <q-badge
              color="transparent"
              text-color="dark"
              @click="show_badge_info_dialog"
            >
              <q-icon name="mdi-decagram" class="q-mr-xs" />
              <span>18/24</span>
            </q-badge>
          </div>
        </q-linear-progress>
        <div
          class="text-overline text-uppercase text-weight-light"
          style="font-size: 10px"
        >
          Engagement meter
        </div>
      </div>
      <div class="q-mt-xs">
        <q-card flat>
          <q-tabs
            v-model="tab"
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            inline-label
            outside-arrows
            mobile-arrows
          >
            <q-tab name="watchlist" label="Watchlist" />
            <q-tab name="recommends" label="Recommends" />
            <q-tab name="lists" label="Lists" />
          </q-tabs>
          <q-separator />
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="watchlist" class="q-px-none">
              <movie-list
                :source="watchlist"
                @item-selected="on_movie_click"
              ></movie-list>
            </q-tab-panel>
            <q-tab-panel name="recommends">
              <movie-list
                :source="recommends"
                @item-selected="on_movie_click"
              ></movie-list>
            </q-tab-panel>
            <q-tab-panel name="lists">
              <div class="text-h6">Lists</div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/Base";
import MovieList from "@/components/MovieList";
import {
  PROFILE_WATCHLIST_REQUEST,
  PROFILE_RECOMMENDS_REQUEST,
} from "@/store/actions";
import { mapState } from "vuex";
export default {
  name: "profile-page",
  components: {
    BaseLayout,
    MovieList,
  },
  metaInfo: {
    title: "Profile",
  },
  data() {
    return {
      tab: "watchlist",
      xp_info_dialog: false,
      earning_info_dialog: false,
      badge_info_dialog: false,
    };
  },
  computed: {
    ...mapState("profile", ["watchlist", "recommends"]),
  },
  mounted() {
    this.$store.dispatch(PROFILE_WATCHLIST_REQUEST);
    this.$store.dispatch(PROFILE_RECOMMENDS_REQUEST);
  },
  methods: {
    show_xp_info_dialog() {
      this.xp_info_dialog = true;
    },
    show_earning_info_dialog() {
      this.earning_info_dialog = true;
    },
    show_badge_info_dialog() {
      this.badge_info_dialog = true;
    },
    on_movie_click(item) {
      this.$router.push({
        name: "movie-detail",
        params: { id: item.id, slug: this.slugify(item.title) },
      });
    },
  },
};
</script>
<style lang="scss">
.q-linear-progress__track {
  opacity: 1;
}
</style>