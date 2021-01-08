<template>
  <base-layout>
    <div class="q-ma-md text-center">
      <movie-list :list_id="list_id" />
    </div>
  </base-layout>
</template>
<script>
// import momemt from "moment";
import BaseLayout from "@/layouts/Base";
import MovieList from "@/components/MovieList";
export default {
  name: "list-detail-page",
  components: {
    BaseLayout,
    MovieList,
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