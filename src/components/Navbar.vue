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
                <img src="@/assets/icon.png" width="48px" />
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
          <template v-for="action in filtered_actions">
            <q-btn
              flat
              round
              color="primary"
              class="q-mr-sm"
              :icon="action.count > 0 ? action.active_icon : action.icon"
              :to="action.to"
              :key="action.icon"
              v-if="action.type === 'path'"
            >
              <q-badge
                color="primary"
                text-color="dark"
                floating
                transparent
                v-if="action.count > 0"
                >{{ action.count }}</q-badge
              >
            </q-btn>
            <q-btn
              flat
              round
              color="primary"
              class="q-mr-sm"
              :key="action.icon"
              :icon="action.count > 0 ? action.active_icon : action.icon"
              @click.prevent="action.to"
              v-else
            >
              <q-badge
                color="primary"
                text-color="dark"
                floating
                transparent
                v-if="action.count > 0"
                >{{ action.count }}</q-badge
              >
            </q-btn>
          </template>

          <q-btn flat round color="primary" class="" icon="mdi-menu">
            <q-menu auto-close>
              <q-list>
                <q-item clickable :to="{ name: 'submit' }">
                  <q-item-section>Submit a Film</q-item-section>
                </q-item>
                <q-item
                  clickable
                  :to="{ name: 'my-submissions' }"
                  v-if="is_authenticated"
                >
                  <q-item-section>My Submissions</q-item-section>
                </q-item>
                <q-item clickable :to="{ name: 'partner-judges' }">
                  <q-item-section>Celebrity Curators</q-item-section>
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
import settings from "@/settings";
import { AUTH_LOGOUT } from "@/store/actions";
export default {
  data() {
    return {
      action_btns: settings.data.action_btns,
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
    filtered_actions() {
      return this.action_btns.filter(
        (item) => !item.auth || this.is_authenticated
      );
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