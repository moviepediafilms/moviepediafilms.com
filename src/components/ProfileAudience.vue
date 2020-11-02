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
          <q-tab name="following" :label="following.length + ' Following'" />
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
            <lists :lists="my_lists" @select="on_list_select" />
          </q-tab-panel>
          <q-tab-panel name="following" class="q-px-none">
            <follow-user-list
              :users="following"
              :actions="following_actions"
              @unfollow="on_unfollow_user"
            />
          </q-tab-panel>
          <q-tab-panel name="followers" class="q-px-none">
            <follow-user-list
              :users="followers"
              :actions="follower_actions"
              @follow="on_follow_user"
              @unfollow="on_unfollow_user"
            />
          </q-tab-panel>
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
import FollowUserList from "@/components/FollowUserList";
import Lists from "@/components/Lists";
import { mapState } from "vuex";
import { PROFILE_FOLLOW, PROFILE_UNFOLLOW } from "@/store/actions";
export default {
  name: "profile-audience",
  components: {
    Recommends,
    Watchlist,
    ProfilePicture,
    ProfileTypeSwitch,
    Lists,
    FollowUserList,
  },
  data() {
    return {
      tab: "watchlist",
      engagement: 0.86,
      following_actions: [{ name: "Unfollow", emit: "unfollow" }],
      follower_actions: [
        {
          name: "Follow Back",
          emit: "follow",
          disable: (user) =>
            this.following.filter((f) => f.id == user.id).length == 0,
        },
        {
          name: "Following",
          emit: "unfollow",
          icon: "mdi-check",
          disable: (user) =>
            this.following.filter((f) => f.id == user.id).length > 0,
        },
      ],
    };
  },
  computed: {
    ...mapState("profile", ["watchlist", "recommends"]),
    ...mapState("list", ["my_lists"]),
    ...mapState("follow", ["followers", "following"]),

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
    on_list_select(list) {
      this.$router.push({
        name: "list-detail",
        params: { id: list.id, slug: this.slugify(list.name) },
      });
    },
    on_follow_user(user) {
      this.$store.dispatch(PROFILE_FOLLOW, user);
    },
    on_unfollow_user(user) {
      this.$store.dispatch(PROFILE_UNFOLLOW, user);
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