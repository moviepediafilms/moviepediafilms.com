<template>
  <div style="display: inline-block">
    <template v-if="!should_hide">
      <q-btn
        round
        size="xs"
        color="primary"
        text-color="dark"
        icon="mdi-plus"
        v-if="!is_following"
        @click="on_follow"
      />
      <q-btn
        round
        icon="mdi-check"
        size="xs"
        color="primary"
        @click="on_unfollow"
        v-else
      />
    </template>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { PROFILE_FOLLOW, PROFILE_UNFOLLOW } from "@/store/actions";
export default {
  props: {
    profileId: {
      type: Number,
    },
  },
  computed: {
    ...mapState("follow", {
      following: (state) => state.following,
    }),
    is_following() {
      var am_i_following_him = false;
      this.following.forEach((prof) => {
        if (prof.profile_id === this.profileId) am_i_following_him = true;
      });
      return am_i_following_him;
    },
    should_hide() {
      // hide when viewer's profile
      return this.profileId === this.my_profile.id;
    },
  },
  methods: {
    on_follow() {
      this.$store.dispatch(PROFILE_FOLLOW, { profile_id: this.profileId });
    },
    on_unfollow() {
      this.$store.dispatch(PROFILE_UNFOLLOW, { profile_id: this.profileId });
    },
  },
};
</script>