<template>
  <div class="q-pa-md">
    <div class="row justify-center">
      <div class="col text-center">
        <profile-picture
          :profile="profile"
          :editable="is_viewer_profile"
        ></profile-picture>
        <div class="text-h2 q-mt-md">
          {{ profile.name }}
          <follow-btn :profileId="profile.id"></follow-btn>
        </div>
        <div class="row justify-center q-mt-xs">
          <profile-type-switch
            :disabled="false"
            :filmmaker="true"
            @toggle="$emit('toggle')"
          />
        </div>
      </div>
    </div>
    <div class="row q-mt-md">
      <div class="col-10 offset-1">
        <div class="row">
          <div class="col-4 text-center">
            <q-btn flat stack>
              <div class="text-uppercase text-h5 text-weight-bolder">
                {{ profile.pop_score }}
              </div>
              <div class="q-mt-xs text-uppercase text-caption">Popularity</div>
            </q-btn>
          </div>
          <div class="col-4 text-center">
            <q-btn flat stack @click="on_rank_click">
              <div class="text-uppercase text-h5 text-weight-bolder">
                {{ rank_txt }}
              </div>
              <div class="q-mt-xs text-uppercase text-caption">rank</div>
            </q-btn>
          </div>
          <div class="col-4 text-center">
            <q-btn flat stack @click="on_films_click">
              <div class="text-uppercase text-h5 text-weight-bolder">
                {{ profile.movies_directed || "-" }}
              </div>
              <div class="q-mt-xs text-uppercase text-caption">Films</div>
            </q-btn>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-center q-mt-md" v-if="is_viewer_profile">
      <q-linear-progress
        size="5px"
        :value="fund_meter"
        track-color="white"
        class="row q-mt-sm"
        style="max-width: 180px"
      />
      <span class="text-xs q-ml-sm">
        {{ fund_meter * 100 }} <q-icon name="mdi-percent" />
        <q-icon name="mdi-chevron-down"
      /></span>
    </div>
    <div
      class="row justify-around q-mt-none q-pa-none"
      v-if="is_viewer_profile"
    >
      <div
        class="text-overline text-uppercase"
        style="font-size: 9px; line-height: 1em"
      >
        Fund-Ready Meter
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
          <q-tab name="filmography" label="Filmography" />
          <q-tab name="followers" :label="followers.length + ' Followers'" />
          <q-tab name="following" :label="following.length + ' Following'" />
          <q-tab name="reviews" label="Reviews" />
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="tab" animated>
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
          <q-tab-panel name="followers" class="q-px-none">
            <crew></crew>
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
          <q-tab-panel name="reviews" class="q-px-none"
            ><reviews
              :reviews="reviews"
              empty-title="Nothing to show here."
              empty-desc="<i>“Examine what is said and not who speaks.”</i><br/> – African proverb"
              empty-image="/img/empty/7.svg"
            ></reviews
          ></q-tab-panel>
          <q-tab-panel name="filmography" class="q-px-none">
            <filmography
              :profile="profile"
              empty-title="Nothing to show here."
              empty-desc="<i>“Create your own visual style… let it be unique for yourself and yet identifiable to others.”</i><br/> – Orson Welles"
              empty-image="/img/empty/8.svg"
            />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>
<script>
import ProfilePicture from "@/components/profile/Image";
import ProfileTypeSwitch from "@/components/profile/Switch";
import Reviews from "@/components/Reviews";
import FollowUserList from "@/components/profile/follow/List";
import Filmography from "@/components/profile/tabs/Filmography";
import Crew from "@/components/profile/tabs/Crew";
import FollowBtn from "@/components/profile/FollowBtn";
import { review_service, follow_service } from "@/services";
import {
  FOLLOW_REQUEST,
  PROFILE_FOLLOW,
  PROFILE_UNFOLLOW,
} from "@/store/actions";
export default {
  name: "profile-filmmaker",
  props: {
    profile: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  components: {
    ProfilePicture,
    ProfileTypeSwitch,
    Reviews,
    FollowUserList,
    Filmography,
    Crew,
    FollowBtn,
  },
  data() {
    return {
      new_followers: [],
      new_following: [],
      reviews: [],
      tab: "filmography",
      xp_info_dialog: false,
    };
  },
  computed: {
    fund_meter() {
      // 6000 is the max score we are aiming at, as of now
      var score = this.profile.pop_score / 6400;
      // round up to 2 decimal places
      return Math.round((score + Number.EPSILON) * 100) / 100;
    },
    followers() {
      if (this.is_viewer_profile) return this.$store.state.follow.followers;
      else return this.new_followers;
    },
    following() {
      if (this.is_viewer_profile) return this.$store.state.follow.following;
      else return this.new_following;
    },
    profile_is_filmmaker() {
      return this.is_filmmaker(this.profile);
    },
    show_login_popup() {
      return !this.is_authenticated;
    },
    is_viewer_profile() {
      return this.profile.id == this.my_profile.id;
    },
    rank_txt() {
      return this.profile.creator_rank == -1 ? "-" : this.profile.creator_rank;
    },
    following_actions() {
      if (this.is_viewer_profile)
        return [{ name: "Unfollow", emit: "unfollow" }];
      else return [];
    },
    follower_actions() {
      if (this.is_viewer_profile)
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
      this.reviews.splice(0, this.reviews.length);
      this.new_followers.splice(0, this.new_followers.length);
      this.new_following.splice(0, this.new_following.length);
      this.load_data();
    },
  },
  mounted() {
    this.load_data();
  },
  methods: {
    load_data() {
      if (this.profile.id && this.is_authenticated) {
        this.get_reviews();
        this.get_followers();
        this.get_following();
      }
    },
    show_xp_info_dialog() {
      this.xp_info_dialog = true;
    },
    on_rank_click() {
      this.$router.push({ name: "filmmaker-leaderboard" });
    },
    on_films_click() {
      this.$router.push({
        name: "movies-by-profile",
        params: { profile_id: this.profile.id },
      });
    },
    on_follow_user(user) {
      this.$store.dispatch(PROFILE_FOLLOW, user);
    },
    on_unfollow_user(user) {
      this.$store.dispatch(PROFILE_UNFOLLOW, user);
    },
    get_reviews() {
      review_service
        .get({ author__id: this.profile.id })
        .then((res) => {
          this.reviews = res.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    get_followers() {
      if (this.is_viewer_profile) {
        this.$store.dispatch(FOLLOW_REQUEST, {
          profile_id: this.profile.id,
          type: "followers",
        });
      } else {
        follow_service.get({}, `${this.profile.id}/followers`).then((data) => {
          this.new_followers.push(...data.results);
        });
      }
    },
    get_following() {
      if (this.is_viewer_profile) {
        this.$store.dispatch(FOLLOW_REQUEST, {
          profile_id: this.profile.id,
          type: "following",
        });
      } else {
        follow_service.get({}, `${this.profile.id}/following`).then((data) => {
          this.new_following.push(...data.results);
        });
      }
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