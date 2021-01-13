<template>
  <!-- tell curation list whether to show menu options or not -->
  <curation-list :list_id="list_id" :header="false" :enableOptions="false" />
</template>
<script>
import CurationList from "@/components/CurationList";
export default {
  props: {
    list_id: {
      type: Number,
    },
  },
  components: {
    CurationList,
  },
};
</script>