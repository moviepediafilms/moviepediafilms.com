<template>
  <base-layout>
    <not-found />
  </base-layout>
</template>
<script>
import NotFound from "@/components/NotFound";
import BaseLayout from "@/layouts/Base";
export default {
  name: "not-found-page",
  components: { BaseLayout, NotFound },
  data() {
    return {};
  },
  metaInfo: {
    title: "Not Found",
  },
};
</script>