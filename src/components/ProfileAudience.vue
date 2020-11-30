<template>
  <div class="q-pa-md">
    <div class="row justify-center">
      <div class="col text-center">
        <profile-picture
          :profile="profile"
          :editable="is_viwers_profile"
        ></profile-picture>
        <div class="text-h2 q-mt-md">
          {{ profile.name }}
        </div>
        <div class="row justify-center q-mt-xs">
          <profile-type-switch
            :disabled="!this.profile_is_filmmaker"
            :filmmaker="false"
            @toggle="$emit('toggle')"
          />
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
    <div class="row justify-center q-mt-md" v-if="is_viwers_profile">
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
    <div
      class="row justify-around q-mt-none q-pa-none"
      v-if="is_viwers_profile"
    >
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
          <q-tab name="watchlist" label="Watchlist" v-if="is_viwers_profile" />
          <q-tab name="recommends" label="Recommends" />
          <q-tab name="curations" label="Curations" />
          <q-tab name="followers" :label="followers.length + ' Followers'" />
          <q-tab name="following" :label="following.length + ' Following'" />
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel
            name="watchlist"
            class="q-px-none"
            v-if="is_viwers_profile"
          >
            <watchlist :movies="watchlist"></watchlist>
          </q-tab-panel>
          <q-tab-panel name="recommends" class="q-px-none">
            <recommends :movies="recommends"></recommends>
          </q-tab-panel>
          <q-tab-panel name="curations" class="q-px-none">
            <lists :lists="lists" @select="on_list_select" />
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
import { recommend_service, follow_service, list_service } from "@/services";
import {
  PROFILE_WATCHLIST_REQUEST,
  PROFILE_FOLLOW,
  PROFILE_UNFOLLOW,
} from "@/store/actions";
import { mapState } from "vuex";
export default {
  name: "profile-audience",
  props: {
    profile: {
      type: Object,
      default() {
        return {};
      },
    },
  },
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
      // recommendation used when is_viwers_profile is false
      their_recommends: [],
      lists: [],
      followers: [],
      following: [],
    };
  },
  computed: {
    ...mapState("profile", {
      watchlist: (state) => state.watchlist,
      my_recommends: (state) => state.recommends,
    }),
    engagement() {
      // 6000 is the max score we are aiming at, as of now
      var score = this.my_profile.engagement_score / 6000;
      // round up to 2 decimal places
      return Math.round((score + Number.EPSILON) * 100) / 100;
    },
    recommends() {
      if (this.is_viwers_profile) return this.my_recommends;
      else return this.their_recommends;
    },
    profile_is_filmmaker() {
      return true; //this.is_filmmaker(this.profile);
    },
    is_viwers_profile() {
      return this.profile.id == this.my_profile.id;
    },
    following_actions() {
      if (this.is_viwers_profile)
        return [{ name: "Unfollow", emit: "unfollow" }];
      else return [];
    },
    follower_actions() {
      if (this.is_viwers_profile)
        return [
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
        ];
      else return [];
    },
  },
  watch: {
    profile() {
      if (this.profile.id) this.load_data();
    },
  },
  mounted() {
    this.load_data();
  },
  methods: {
    load_data() {
      if (this.is_authenticated) {
        this.get_recommends();
        if (this.is_viwers_profile) this.get_watchlist();
        this.get_followers();
        this.get_following();
        this.get_lists();
      }
    },
    get_level_name() {
      // TODO: update level names
      var level_map = {
        1: "Cinephile",
        2: "Level2",
        3: "Level3",
        4: "Level4",
      };
      return level_map[this.profile.level];
    },
    get_rank() {
      if (this.profile.rank != -1) return this.profile.rank;
      else return "-";
    },
    get_review_count() {
      //TODO: get it somehow
      return "-";
    },
    get_recommends() {
      recommend_service.get({}, `${this.profile.id}/movies`).then((data) => {
        this.their_recommends.push(...data);
      });
    },
    get_watchlist() {
      this.$store.dispatch(PROFILE_WATCHLIST_REQUEST);
    },
    get_followers() {
      follow_service.get({}, `${this.profile.id}/followers`).then((data) => {
        this.followers.push(...data.results);
      });
    },
    get_following() {
      follow_service.get({}, `${this.profile.id}/following`).then((data) => {
        this.following.push(...data.results);
      });
    },
    get_lists() {
      list_service.get({ owner__id: this.profile.id }).then((data) => {
        this.lists.push(...data.results);
      });
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