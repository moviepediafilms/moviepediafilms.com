<template>
  <base-layout>
    <div class="q-ma-md text-center q-pt-lg">
      <h3 class="text-primary">{{ list.name }}</h3>
      {{ movies }}
    </div>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/Base";
import { list_service } from "@/services/";
export default {
  name: "list-detail-page",
  props: {
    list: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    BaseLayout,
  },
  metaInfo: {
    title: "List",
  },
  data() {
    return {
      movies: [],
    };
  },
  mounted() {
    this.fetch_movies();
  },
  methods: {
    fetch_movies() {
      list_service.get(this.$route.params.id).then((data) => {
        this.movies.splice(0, this.movies.length);
        this.movies.push(...data.results);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>