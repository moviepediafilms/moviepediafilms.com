<template>
  <q-header reveal class="bg-dark text-dark">
    <div class="row justify-center bg-warning text-overline">
      <div class="text-center" v-if="show_wip_bar">
        <q-icon size="md" name="mdi-rocket-outline"></q-icon> Website is under
        construction
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6 offset-md-3">
        <q-toolbar>
          <q-toolbar-title class="row">
            <router-link :to="{ name: 'home' }">
              <div class="q-mt-xs">
                <img src="@/assets/new_icon_white.png" width="48px" />
              </div>
            </router-link>
            <router-link
              :to="{ name: 'home' }"
              style="text-decoration: none"
              class="text-primary text-uppercase text-title self-center q-ml-sm"
              v-if="false"
            >
              Moviepedia</router-link
            >
          </q-toolbar-title>
          <template v-for="action in action_btns">
            <q-btn
              flat
              round
              color="primary"
              class="q-mr-sm"
              :icon="action.icon"
              :to="action.to"
              :key="action.icon"
              v-if="action.type === 'path'"
            />
            <q-btn
              flat
              round
              color="primary"
              class="q-mr-sm"
              :key="action.icon"
              :icon="action.icon"
              @click.prevent="action.to"
              v-else
            />
          </template>

          <q-btn flat round color="primary" class="q-mr-sm" icon="mdi-menu">
            <q-menu auto-close content-class="negative">
              <q-list style="min-width: 100px">
                <q-item clickable :to="{ name: 'submit' }">
                  <q-item-section>Submit a Film</q-item-section>
                </q-item>
                <q-item clickable :to="{ name: 'filmmaker-of-the-month' }">
                  <q-item-section>Filmmaker of the Month</q-item-section>
                </q-item>
                <q-item clickable :to="{ name: 'mdff-top' }">
                  <q-item-section>MDFF Top 10</q-item-section>
                </q-item>
                <q-item clickable :to="{ name: 'leaderboard' }">
                  <q-item-section>Contest Leaderboard</q-item-section>
                </q-item>
                <q-item clickable :to="{ name: 'partner-judges' }">
                  <q-item-section>Partner Celebs</q-item-section>
                </q-item>
                <q-item clickable @click="auth_action">
                  <q-item-section>{{ auth_action_str }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-toolbar>
      </div>
    </div>
  </q-header>
</template>
<script>
import setting from "@/setting";
import { AUTH_LOGOUT } from "@/store/actions";
export default {
  data() {
    return {
      action_btns: setting.data.action_btns,
    };
  },
  methods: {
    auth_action() {
      if (this.is_authenticated) {
        this.$store.dispatch(AUTH_LOGOUT);
      } else {
        if (this.$route.name !== "login") this.$router.push({ name: "login" });
      }
    },
  },
  computed: {
    auth_action_str() {
      if (this.is_authenticated) return "Sign Out";
      else return "Sign In";
    },

    show_wip_bar() {
      return process.env.VUE_APP_WIP === "true";
    },
  },
};
</script>
<style lang="scss" scoped>
.q-toolbar__title {
  font-size: 16px;
}
</style>