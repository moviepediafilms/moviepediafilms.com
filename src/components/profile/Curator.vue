<template>
  <div class="q-pa-md">
    <div class="row justify-center">
      <div class="col text-center">
        <profile-picture
          :profile="profile"
          :editable="is_viewers_profile"
        ></profile-picture>
        <div class="text-h2 q-mt-md">
          {{ profile.name }}
          <follow-btn :profileId="profile.id"></follow-btn>
        </div>
        <div
          class="row justify-center q-mt-xs"
          v-if="is_viewers_profile || profile_is_filmmaker"
        >
          <profile-type-switch
            :disabled="!profile_is_filmmaker"
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
                {{ rank_txt }}
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
    <div class="row justify-center q-mt-md" v-if="is_viewers_profile">
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
      v-if="is_viewers_profile"
    >
      <div
        class="text-overline text-uppercase"
        style="font-size: 9px; line-height: 1em"
      >
        Engagement Meter
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
          <q-tab
            name="filmography"
            label="Filmography"
            v-if="!profile_is_filmmaker && !hide_filmography"
          />
          <q-tab name="watchlist" label="Watchlist" v-if="is_viewers_profile" />
          <q-tab name="recommends" label="Recommends" />
          <q-tab name="curations" label="Curations" />
          <q-tab name="followers" :label="followers.length + ' Followers'" />
          <q-tab name="following" :label="following.length + ' Following'" />
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel
            name="filmography"
            class="q-px-none"
            v-if="!profile_is_filmmaker && !hide_filmography"
          >
            <filmography
              :profile="profile"
              @empty="on_empty_filmography"
              empty-title="No association with any film on our platform"
              empty-desc="Add yourself as a crew member to films you've worked on"
              empty-image="/img/empty/12.svg"
            />
          </q-tab-panel>
          <q-tab-panel
            name="watchlist"
            class="q-px-none"
            v-if="is_viewers_profile"
          >
            <watchlist :movies="watchlist"></watchlist>
          </q-tab-panel>
          <q-tab-panel name="recommends" class="q-px-none">
            <recommends :profile="profile" />
          </q-tab-panel>
          <q-tab-panel name="curations" class="q-px-none">
            <curations :lists="curations" @select="on_list_select" />
          </q-tab-panel>
          <q-tab-panel name="following" class="q-px-none">
            <follow-user-list
              :users="following"
              :actions="following_actions"
              @unfollow="on_unfollow_user"
              empty-title="Nobody’s following"
              empty-desc="Keep updated, stay engaged and get noticed to grow your network"
              empty-image="/img/empty/4.svg"
            />
          </q-tab-panel>
          <q-tab-panel name="followers" class="q-px-none">
            <follow-user-list
              :users="followers"
              :actions="follower_actions"
              @follow="on_follow_user"
              @unfollow="on_unfollow_user"
              empty-title="No Followers"
              empty-desc="Start connecting and spread your love for cinema"
              empty-image="/img/empty/10.svg"
            />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>
<script>
import Recommends from "@/components/profile/tabs/Recommends";
import Watchlist from "@/components/profile/tabs/Watchlist";
import ProfilePicture from "@/components/profile/Image";
import ProfileTypeSwitch from "@/components/profile/Switch";
import FollowUserList from "@/components/profile/follow/List";
import Filmography from "@/components/profile/tabs/Filmography";
import FollowBtn from "@/components/profile/FollowBtn";
import Curations from "@/components/profile/tabs/Curations";
import { follow_service, curation_service } from "@/services";
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
    Watchlist,
    ProfilePicture,
    ProfileTypeSwitch,
    Curations,
    FollowUserList,
    Filmography,
    FollowBtn,
    Recommends,
  },
  data() {
    return {
      tab: "recommends",
      curations: [],
      followers: [],
      following: [],
      hide_filmography: false,
    };
  },
  computed: {
    ...mapState("profile", {
      watchlist: (state) => state.watchlist,
    }),
    rank_txt() {
      return this.profile.curator_rank == -1 ? "-" : this.profile.curator_rank;
    },
    engagement() {
      // 6000 is the max score we are aiming at, as of now
      var score = this.my_profile.engagement_score / 6000;
      // round up to 2 decimal places
      return Math.round((score + Number.EPSILON) * 100) / 100;
    },
    profile_is_filmmaker() {
      return this.is_filmmaker(this.profile);
    },
    is_viewers_profile() {
      return this.profile.id == this.my_profile.id;
    },
    following_actions() {
      if (this.is_viewers_profile)
        return [{ name: "Unfollow", emit: "unfollow" }];
      else return [];
    },
    follower_actions() {
      if (this.is_viewers_profile)
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
      this.curations.splice(0, this.curations.length);
      this.following.splice(0, this.following.length);
      this.followers.splice(0, this.followers.length);
      this.load_data();
    },
    profile_is_filmmaker() {
      // when user is not a filmmaker, filmography tab is not mounted and on_empty_filmography is never called to switch the tab,
      // in such cases explicitly setting tab to next mounted tab

      if (this.is_viewers_profile) {
        this.tab = "watchlist";
        console.log("watchlist");
      } else {
        this.tab = "recommends";
        console.log("recommends");
      }
    },
  },
  mounted() {
    this.load_data();
  },
  methods: {
    on_empty_filmography() {
      this.hide_filmography = true;
      this.tab = "watchlist";
    },
    load_data() {
      if (this.profile.id && this.is_authenticated) {
        if (this.is_viewers_profile) this.get_watchlist();
        this.get_followers();
        this.get_following();
        this.get_curations();
      }
    },
    get_level_name() {
      var level_map = {
        1: "Cinephile",
        2: "Curator",
        3: "Influencer",
        4: "Connoisseur",
        5: "Patron",
      };
      return level_map[this.profile.level];
    },
    get_review_count() {
      //TODO: fetch top reviews that I have given to movies
      return "-";
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
    get_curations() {
      curation_service.get({ owner__id: this.profile.id }).then((data) => {
        this.curations.push(...data.results);
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
    on_level_clicked() {},
    on_rank_clicked() {
      this.$router.push({ name: "audience-leaderboard" });
    },
    on_reviews_clicked() {
      this.$router.push({
        name: "reviews",
        params: {
          id: this.profile.id,
        },
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