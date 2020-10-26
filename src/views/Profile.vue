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
      <div class="row q-mt-md q-col-gutter-sm">
        <div class="col-4 text-center">
          <div class="text-uppercase text-title text-weight-bolder">
            cinephile
          </div>
          <div class="q-mt-xs text-uppercase text-weight-light text-caption">
            level
          </div>
        </div>
        <div class="col-4 text-center">
          <div class="text-uppercase text-title text-weight-bolder">100</div>
          <div class="q-mt-xs text-uppercase text-weight-light text-caption">
            rank
          </div>
        </div>
        <div class="col-4 text-center">
          <div class="text-uppercase text-title text-weight-bolder">300</div>
          <div class="q-mt-xs text-uppercase text-weight-light text-caption">
            review
          </div>
        </div>
      </div>
      <div class="row justify-around q-mt-md">
        <q-linear-progress
          size="20px"
          :value="engagement"
          track-color="white"
          dark
          rounded
          color="light-green-7"
          class="row q-mt-sm"
          style="max-width: 300px"
        >
          <div class="absolute-full row justify-end">
            <q-badge
              color="transparent"
              text-color="dark"
              @click="show_xp_info_dialog"
            >
              {{ engagement * 100 }}<q-icon name="mdi-percent" />
            </q-badge>
          </div>
        </q-linear-progress>
      </div>
      <div class="row justify-around q-mt-sm">
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
            <q-tab name="lists" label="My Lists" />
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
              <q-list>
                <q-item
                  v-for="list in my_lists"
                  :key="list.id"
                  clickable
                  v-ripple
                  class="q-ma-none"
                  @click="on_list_click(list)"
                >
                  <q-item-section>
                    <q-item-label class="">{{ list.name }}</q-item-label>
                    <q-item-label caption>
                      {{ list_description(list) }}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side top>
                    <q-item-label caption class="text-center">
                      <q-icon name="mdi-thumb-up" size="12px" />
                      <div class="q-mt-xs">{{ list_like_text(list) }}</div>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
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
      engagement: 0.2,
      xp_info_dialog: false,
      earning_info_dialog: false,
      badge_info_dialog: false,
    };
  },
  computed: {
    ...mapState("profile", ["watchlist", "recommends"]),
    ...mapState("list", ["my_lists"]),
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
    on_list_click(list) {
      console.log(list);
    },
    list_description(list) {
      var plural = list.movies.length == 0 || list.movies.length > 1 ? "s" : "";
      var prefix = list.movies.length == 0 ? "No" : list.movies.length;
      return `${prefix} Movie${plural}`;
    },
    list_like_text(list) {
      var plural = list.like_count == 0 || list.like_count > 1 ? "s" : "";
      var prefix = list.like_count == 0 ? "No" : list.like_count;
      return `${prefix} like${plural}`;
    },
  },
};
</script>
<style lang="scss">
.q-linear-progress__track {
  opacity: 1;
}
</style>