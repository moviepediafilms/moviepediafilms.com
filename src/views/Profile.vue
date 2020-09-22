<template>
  <base-layout>
    <div class="q-ma-md">
      <div class="row q-mt-lg">
        <div class="col">
          <q-avatar size="100px">
            <img :src="profile.image" />
          </q-avatar>
        </div>
        <div class="col">
          <div class="text-h5 text-weight-bold text-primary">{{profile.name}}</div>
          <div class="q-mt-sm">
            <q-icon name="mdi-star"></q-icon>
            {{profile.rank}} Rank
          </div>
          <div>
            <q-icon name="mdi-decagram"></q-icon>
            {{profile.badges}} Badges
          </div>
          <div>
            <q-icon name="mdi-stairs"></q-icon>
            {{profile.level}} Level
          </div>
        </div>
      </div>
      <div class="q-mt-lg">
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
            <q-tab name="earnings" label="Earnings" />
            <q-tab name="reviews" label="Reviews" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="watchlist">
              <div class="text-h6">Watchlist</div>This is a watch list.
            </q-tab-panel>
            <q-tab-panel name="earnings">
              <div class="text-h6">Earnings</div>
            </q-tab-panel>
            <q-tab-panel name="reviews">
              <div class="text-h3">Reviews</div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/Base";
export default {
  name: "profile-page",
  components: {
    BaseLayout,
  },
  metaInfo: {
    title: "Profile",
  },
  data() {
    return {
      tab: "reviews",
      profile: {},
    };
  },
  mounted() {
    this.fetch_profile();
  },
  methods: {
    fetch_profile() {
      this.profile = {
        image:
          "https://res.cloudinary.com/moviepedia/image/upload/v1600785909/judges_thumbs/20200922_193347_0000_r2wgnw.png",
        is_filmmaker: false,
        name: "Rahul Sharma",
        level: 2,
        rank: 12,
        badges: 18,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
</style>