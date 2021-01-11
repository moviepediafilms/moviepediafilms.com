<template>
  <base-layout>
    <div class="q-ma-md text-center">
      <curation-list :list_id="list_id" />
    </div>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/Base";
import CurationList from "@/components/CurationList";
export default {
  name: "list-detail-page",
  components: {
    BaseLayout,
    CurationList,
  },
  computed: {
    list_id() {
      return parseInt(this.$route.params.id);
    },
  },
  metaInfo: {
    title: "Curation",
  },
};
</script>