<template>
  <router-view />
</template>
<script>
import MAIN from "./constants";
export default {
  name: "app",
  metaInfo: {
    titleTemplate: "%s | " + MAIN.TITLE,
    meta: [{ name: "description", content: MAIN.DESCRIPTION }],
  },
  created() {
    this.$q.dark.set(true);
  },
};
</script>