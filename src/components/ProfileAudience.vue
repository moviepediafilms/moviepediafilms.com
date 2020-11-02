<template>
  <div class="q-pa-md">
    <div class="row justify-center">
      <div class="col text-center">
        <profile-picture></profile-picture>
        <div class="text-h2 q-mt-md">
          {{ my_profile.name }}
        </div>
        <div class="row justify-center q-mt-xs">
          <profile-type-switch />
        </div>
      </div>
    </div>
    <div class="row q-mt-md">
      <div class="col-10 offset-1">
        <div class="row">
          <div class="col-4 text-center">
            <q-btn flat stack @click="on_level_clicked">
              <div class="text-uppercase text-h5 text-weight-bold">
                {{ get_level_name() }}
              </div>
              <div class="q-mt-xs text-uppercase text-sm">level</div>
            </q-btn>
          </div>
          <div class="col-4 text-center">
            <q-btn flat stack @click="on_rank_clicked">
              <div class="text-uppercase text-h5 text-weight-bolder">
                {{ get_rank() }}
              </div>
              <div class="q-mt-xs text-uppercase text-sm">rank</div>
            </q-btn>
          </div>
          <div class="col-4 text-center">
            <q-btn flat stack @click="on_reviews_clicked">
              <div class="text-uppercase text-h5 text-weight-bolder">
                {{ get_review_count() }}
              </div>
              <div class="q-mt-xs text-uppercase text-sm">reviews</div>
            </q-btn>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-center q-mt-md">
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
    <div class="q-mt-md">
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
            <watchlist :movies="watchlist"></watchlist>
          </q-tab-panel>
          <q-tab-panel name="recommends" class="q-px-none">
            <recommends :movies="recommends"></recommends>
          </q-tab-panel>
          <q-tab-panel name="lists" class="q-px-none">
            <lists :lists="my_lists" />
          </q-tab-panel>
          <q-tab-panel name="following"> </q-tab-panel>
          <q-tab-panel name="follows"> </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>
<script>
import Recommends from "@/components/Recommends";
import Watchlist from "@/components/Watchlist";
import ProfilePicture from "@/components/ProfilePicture";
import ProfileTypeSwitch from "@/components/ProfileTypeSwitch";
import Lists from "@/components/Lists";
import { mapState } from "vuex";
export default {
  name: "profile-audience",
  components: {
    Recommends,
    Watchlist,
    ProfilePicture,
    ProfileTypeSwitch,
    Lists,
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
      dialog_profile_type: false,
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
  methods: {
    get_level_name() {
      var level_map = {
        1: "Cienphile",
        2: "Level2",
        3: "Level3",
        4: "Level4",
      };
      return level_map[this.my_profile.level];
    },
    get_rank() {
      if (this.my_profile.rank != -1) return this.my_profile.rank;
      else return "-";
    },
    get_review_count() {
      //TODO: get it somehow
      return "-";
    },
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

    on_level_clicked() {
      console.log("level clicked");
    },
    on_rank_clicked() {
      this.$router.push({ name: "audience-leaderboard" });
    },
    on_reviews_clicked() {
      this.$router.push({ name: "my-reviews" });
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