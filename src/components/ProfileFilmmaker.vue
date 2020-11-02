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
            <q-btn flat stack>
              <div class="text-uppercase text-h5 text-weight-bolder">
                {{ my_profile.pop_score }}
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
            <q-btn flat stack>
              <div class="text-uppercase text-h5 text-weight-bolder">
                {{ my_profile.film_count || "-" }}
              </div>
              <div class="q-mt-xs text-uppercase text-caption">Films</div>
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
        fund-ready meter
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
          <q-tab name="performance" label="Performance" />
          <q-tab name="reviews" label="Reviews" />
          <q-tab name="now-playing" label="Now Playing" />
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="performance" class="q-px-none"></q-tab-panel>
          <q-tab-panel name="reviews" class="q-px-none"
            ><reviews :reviews="reviews"></reviews
          ></q-tab-panel>
          <q-tab-panel name="now-playing" class="q-px-none"></q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>
<script>
import ProfilePicture from "@/components/ProfilePicture";
import ProfileTypeSwitch from "@/components/ProfileTypeSwitch";
import Reviews from "@/components/Reviews";
export default {
  name: "profile-filmmaker",
  components: {
    ProfilePicture,
    ProfileTypeSwitch,
    Reviews,
  },
  data() {
    return {
      reviews: [],
      tab: "performance",
      engagement: 0.86,
      xp_info_dialog: false,
    };
  },
  computed: {
    show_login_popup() {
      return !this.is_authenticated;
    },
    hide_mode() {
      return !this.is_authenticated;
    },
    rank_txt() {
      return this.my_profile.rank == -1 ? "-" : this.my_profile.rank;
    },
  },
  methods: {
    show_xp_info_dialog() {
      this.xp_info_dialog = true;
    },
    on_rank_click() {
      this.$router.push({ name: "filmmaker-leaderboard" });
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