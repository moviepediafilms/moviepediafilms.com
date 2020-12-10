<template>
  <base-layout>
    <div class="q-ma-md text-center q-pt-sm">
      <div class="text-primary text-h1">Notifications</div>
      <div v-if="notifications.length > 0"></div>
      <empty-state
        class="q-mt-lg"
        icon="mdi-bell-check"
        title="You're all caught up"
        desc=""
        v-else
      />
    </div>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/Base";
export default {
  name: "notification-page",
  components: {
    BaseLayout,
  },
  metaInfo: {
    title: "Notifications",
  },
  data() {
    return {
      notifications: [],
    };
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
</style>