<template>
  <base-layout>
    <div class="q-ma-md">
      <div class="row q-mt-lg">
        <div class="col">
          <q-avatar size="100px">
            <img src="@/assets/icon_white.png" />
          </q-avatar>
        </div>
        <div class="col">
          <div>{{profile.name}}</div>
          <div>{{profile.rank}}</div>
          <div>{{profile.level}}</div>
        </div>
        <q-toggle v-model="profile.is_filmmaker" label="On Right" />
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
            <q-tab name="reviews" label="Reviews" />
            <q-tab name="film_makers" label="Film Makers" />
            <q-tab name="badges" label="Badges" />
            <q-tab name="earnings" label="Earnings" />
            <q-tab name="watchlist" label="Watchlist" />
            <q-tab name="movies" label="Badges" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="reviews">
              <div class="text-h6">Mails</div>Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>

            <q-tab-panel name="film_makers">
              <div class="text-h6">Alarms</div>Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>

            <q-tab-panel name="badges">
              <div class="text-h6">Movies</div>Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>
            <q-tab-panel name="earnings">
              <div class="text-h6">Movies</div>Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>
            <q-tab-panel name="watchlist">
              <div class="text-h6">Movies</div>Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
        is_filmmaker: false,
        name: "Rahul Sharma",
        level: 2,
        rank: 12,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
</style>