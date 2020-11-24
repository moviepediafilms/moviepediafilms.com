<template>
  <base-layout>
    <div class="q-ma-md text-center">
      <h3 class="text-primary text-weight-light q-mb-xs">Top Creators</h3>

      <q-card flat class="q-mt-md">
        <q-tabs
          v-model="tab"
          dense
          class="white"
          indicator-color="primary"
          inline-label
          outside-arrows
          mobile-arrows
        >
          <q-tab
            :name="contest.name"
            :label="contest.name"
            v-for="contest in contests"
            :key="contest.id"
          />
        </q-tabs>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel
            :name="contest.name"
            v-for="contest in contests"
            :key="contest.id"
          >
            <creator-paginated
              :contest="contest"
              @click="on_profile_select"
              :key="contest.id"
            />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/Base";
import CreatorPaginated from "@/components/CreatorPaginated";
import { contest_service } from "@/services";
export default {
  name: "top-creator-page",
  components: {
    BaseLayout,
    CreatorPaginated,
  },
  metaInfo: {
    title: "Top Creators",
  },
  data() {
    return {
      contests: [],
      tab: "",
    };
  },
  mounted() {
    this.load_live_monthly_contests();
  },

  methods: {
    load_live_monthly_contests() {
      contest_service
        .get({ ordering: "start", is_live: "true", type__name: "Monthly" })
        .then((data) => {
          console.log(data);
          this.contests.push(...data.results);
          this.tab = this.contests[this.contests.length - 1].name;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    on_profile_select(creator) {
      this.$router.push({ name: "profile", params: { id: creator.id } });
    },
  },
};
</script>
<style lang="scss" scoped>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-enter-active {
  transition: all 0.3s ease;
}
.slide-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-enter, .slide-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(30px);
  opacity: 0;
}
</style>