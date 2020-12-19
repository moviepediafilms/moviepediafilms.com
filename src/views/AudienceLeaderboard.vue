<template>
  <base-layout>
    <div class="q-ma-md">
      <div class="q-ma-md text-center">
        <h1 class="text-primary">Curators Leaderboard</h1>
      </div>
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
        :pages="pages"
        :page_size="page_size"
        :users="users"
        :loading="loading"
        @click="on_user_click"
        @page-change="on_page_change"
      />
    </div>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/Base";
import Leaderboard from "@/components/Leaderboard";
import { ALB_REQUEST } from "@/store/actions";
import { mapState } from "vuex";
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
      // get the count from api
      curr_page: 0,
      page_size: 10,
      loading: false,
    };
  },
  computed: {
    last_updated_txt() {
      return "Ranks are calculated daily";
    },
    pages() {
      var pages = Math.ceil(this.total_count / this.page_size);
      return pages == 0 ? 1 : pages;
    },
    ...mapState("alb", {
      users: (state) => state.users,
      total_count: (state) => state.count,
    }),
  },
  watch: {
    curr_page() {
      this.loading = true;
      this.$store
        .dispatch(ALB_REQUEST, {
          offset: (this.curr_page - 1) * this.page_size,
          limit: this.page_size,
        })
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.on_page_change(1);
  },
  methods: {
    on_page_change(page) {
      this.curr_page = page;
    },
    on_user_click(user) {
      this.$router.push({ name: "profile", params: { id: user.id } });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>