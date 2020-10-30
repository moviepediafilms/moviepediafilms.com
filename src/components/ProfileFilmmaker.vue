<template>
  <div class="q-pa-md">
    <div class="row justify-center">
      <div class="col text-center">
        <profile-picture></profile-picture>
        <div class="text-h5 text-weight-bold q-mt-md">
          Filmmaker {{ my_profile.name }}
        </div>
      </div>
    </div>
    <div class="row q-mt-lg">
      <div class="col-8 offset-2">
        <div class="row">
          <div class="col-4 text-center">
            <q-skeleton class="q-mx-sm" type="text" v-if="hide_mode" />
            <div class="text-uppercase text-title text-weight-bolder" v-else>
              cinephile
            </div>
            <div class="q-mt-xs text-uppercase text-caption">level</div>
          </div>
          <div class="col-4 text-center">
            <q-skeleton class="q-mx-sm" type="text" v-if="hide_mode" />
            <div class="text-uppercase text-title text-weight-bolder" v-else>
              100
            </div>
            <div class="q-mt-xs text-uppercase text-caption">rank</div>
          </div>
          <div class="col-4 text-center">
            <q-skeleton class="q-mx-sm" type="text" v-if="hide_mode" />
            <div class="text-uppercase text-title text-weight-bolder" v-else>
              300
            </div>
            <div class="q-mt-xs text-uppercase text-caption">reviews</div>
          </div>
        </div>
      </div>
    </div>
    <q-skeleton class="q-mt-md q-mx-lg" type="text" v-if="hide_mode" />
    <div class="row justify-center q-mt-md" v-else>
      <q-linear-progress
        size="5px"
        :value="engagement"
        track-color="white"
        class="row q-mt-sm"
        style="max-width: 180px"
      />
      <span class="text-xs q-ml-sm">
        {{ engagement * 100 }} <q-icon name="mdi-percent" />
        <q-icon name="mdi-chevron-down"
      /></span>
    </div>
    <div class="row justify-around q-mt-none q-pa-none">
      <div
        class="text-overline text-uppercase"
        style="font-size: 9px; line-height: 1em"
      >
        Engagement meter
      </div>
    </div>
    <div class="q-mt-lg text-center" v-if="hide_mode">
      <div>Sign In to check your profile</div>
      <q-btn
        flat
        text
        color="primary"
        :to="{ name: 'login' }"
        label="Sign In"
      />
    </div>
    <div class="q-mt-md" v-else>
      <q-card flat>
        <q-tabs
          v-model="tab"
          dense
          class="white"
          indicator-color="primary"
          align="justify"
          inline-label
          outside-arrows
          mobile-arrows
        >
          <q-tab name="watchlist" label="Watchlist" />
          <q-tab name="recommends" label="Recommends" />
          <q-tab name="lists" label="Lists" />
          <q-tab name="followers" :label="followers.length + ' Followers'" />
          <q-tab name="following" :label="followings.length + ' Following'" />
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
                class="q-ma-none"
                v-ripple
                clickable
                @click="on_list_click(list)"
              >
                <q-item-section>
                  <q-item-label class="text-title">
                    {{ list.name }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label class="text-center">
                    <div class="text-title">{{ list.movies.length }}</div>
                    <div
                      class="text-caption text-uppercase"
                      style="font-size: 0.7em"
                    >
                      Movies
                    </div>
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label class="text-center">
                    <div class="text-title">{{ list.like_count }}</div>
                    <div
                      class="text-caption text-uppercase"
                      style="font-size: 0.7em"
                    >
                      Likes
                    </div>
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn
                    size="sm"
                    flat
                    round
                    icon="mdi-dots-vertical"
                    @click.stop="list_item_menu = !list_item_menu"
                  >
                  </q-btn>
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>
          <q-tab-panel name="following"> </q-tab-panel>
          <q-tab-panel name="follows"> </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
    <q-dialog v-model="list_item_menu">
      <q-card class="" style="width: 400px; max-width: 50vw">
        <q-card-section>
          <q-list class="">
            <q-item clickable v-ripple v-close-popup>
              <q-item-section side>
                <q-icon name="mdi-border-color" size="xs" />
              </q-item-section>
              <q-item-section> Edit </q-item-section>
            </q-item>
            <q-item clickable v-ripple v-close-popup>
              <q-item-section side>
                <q-icon name="mdi-trash-can" size="xs" />
              </q-item-section>
              <q-item-section> Delete </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import MovieList from "@/components/MovieList";
import ProfilePicture from "@/components/ProfilePicture";

import {
  PROFILE_WATCHLIST_REQUEST,
  PROFILE_RECOMMENDS_REQUEST,
} from "@/store/actions";
import { mapState } from "vuex";
export default {
  name: "profile-filmmaker",
  components: {
    MovieList,
    ProfilePicture,
  },
  data() {
    return {
      tab: "watchlist",
      engagement: 0.86,
      followers: [],
      followings: [],
      xp_info_dialog: false,
      earning_info_dialog: false,
      badge_info_dialog: false,
      edit_name_dialog: false,
      list_item_menu: false,
    };
  },
  computed: {
    ...mapState("profile", ["watchlist", "recommends"]),
    ...mapState("list", ["my_lists"]),
    show_login_popup() {
      return !this.is_authenticated;
    },
    hide_mode() {
      return !this.is_authenticated;
    },
  },
  watch: {},
  mounted() {
    if (this.is_authenticated) {
      this.$store.dispatch(PROFILE_WATCHLIST_REQUEST);
      this.$store.dispatch(PROFILE_RECOMMENDS_REQUEST);
    }
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
    show_edit_popup() {
      this.edit_name_dialog = true;
    },
    on_movie_click(item) {
      this.$router.push({
        name: "movie-detail",
        params: { id: item.id, slug: this.slugify(item.title) },
      });
    },
    on_list_click(list) {
      // redirect to page where he can see his list stats and movies in it
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
.q-linear-progress__model {
  background: linear-gradient(45deg, yellow, green);
}
</style>