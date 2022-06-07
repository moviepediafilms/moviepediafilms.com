<template>
  <base-layout>
    <div class="q-ma-md">
      <div class="q-ma-md text-center">
        <h1 class="text-primary">Creators Leaderboard</h1>
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
          @page-change="fetch_users"
          @click="on_user_click"
          point-from="pop_score"
          rank-from="creator_rank"
        />
      </div>
      <empty-state
        title="Nothing to show here."
        desc="Check this space later to know the standings of the creators on our platform"
        image="/img/empty/15.svg"
        v-if="!loading && user.length == 0"
      />
    </div>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/Base";
import Leaderboard from "@/components/Leaderboard";
import settings from "@/settings";
import { flb_service } from "@/services";
export default {
  name: "audience-leaderboard-page",
  components: {
    BaseLayout,
    Leaderboard,
  },
  metaInfo: {
    title: "Creators Leaderboard",
  },
  data() {
    return {
      count: undefined,
      users: [],
      fetch_size: settings.PAGE_SIZE,
      loading: false,
    };
  },
  computed: {
    last_updated_txt() {
      return "Ranks are calculated daily";
    },
  },
  mounted() {
    this.fetch_users();
  },
  methods: {
    fetch_users() {
      if (this.loading) return;
      if (this.users.length >= this.count) return;
      this.loading = true;
      flb_service
        .get({
          offset: this.users.length,
          limit: this.fetch_size,
        })
        .then((data) => {
          this.users.push(...data.results);
          this.count = data.count;
          this.loading = false;
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