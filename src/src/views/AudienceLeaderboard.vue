<template>
  <base-layout>
    <div class="q-ma-md">
      <div class="q-ma-md text-center">
        <h1 class="text-primary">Curators Leaderboard</h1>
      </div>
      <div v-if="loading || users.length > 0">
        <div class="row justify-start q-ml-md q-mt-md">
          <div class="text-caption text-grey-5">
            <q-icon
              name="mdi-information-variant"
              size="16px"
              class="q-mr-xs"
            />{{ last_updated_txt }}
          </div>
        </div>
        <leaderboard
          :users="users"
          :loading="loading"
          @click="on_user_click"
          @page-change="load_users"
          point-from="engagement_score"
          rank-from="curator_rank"
        />
      </div>
      <empty-state
        title="Nothing to show here."
        desc="Check this space later to know the standings of the curators on our platform"
        image="/img/empty/15.svg"
        v-if="!loading && user.length == 0"
      />
    </div>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/Base";
import Leaderboard from "@/components/Leaderboard";
import { alb_service } from "@/services";
import settings from "@/settings";
export default {
  name: "audience-leaderboard-page",
  components: {
    BaseLayout,
    Leaderboard,
  },
  metaInfo: {
    title: "Audience Leaderboard",
  },
  data() {
    return {
      users: [],
      fetch_size: settings.PAGE_SIZE,
      loading: false,
      count: undefined,
    };
  },
  computed: {
    last_updated_txt() {
      return "Ranks are calculated daily";
    },
  },
  mounted() {
    this.load_users();
  },
  methods: {
    load_users() {
      if (this.loading) return;
      if (this.users.length >= this.count) return;
      this.loading = true;
      alb_service
        .get({
          offset: this.users.length,
          limit: this.fetch_size,
        })
        .then((data) => {
          this.users.push(...data.results);
          this.loading = false;
          this.count = data.count;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    on_user_click(user) {
      this.$router.push({ name: "profile", params: { id: user.id } });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>