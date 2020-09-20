<template>
  <base-layout>
    <div class="q-ma-sm">
      <div v-for="cat in categories" :key="cat.name">
        <div class="q-pa-md row">
          <div class="text-h6">{{cat.name}}</div>
        </div>
        <q-scroll-area
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          horizontal
          style="height: 205px;"
        >
          <div class="q-pr-md row no-wrap">
            <q-card
              class="my-card q-ma-md"
              style="width: 250px;"
              v-for="item in cat.items"
              :key="item.id"
              @click.prevent="detail_page(item)"
            >
              <img :src="item.image" />
            </q-card>
          </div>
        </q-scroll-area>
      </div>
    </div>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/Base";
export default {
  name: "home-page",
  components: {
    BaseLayout,
  },
  metaInfo: {
    title: "Home",
  },
  data() {
    return {
      slide: "",
      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#f7cd23",
        width: "10px",
        opacity: 0.75,
      },
      barStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "#f7cd23",
        opacity: 0.2,
      },
      categories: [
        {
          name: "Today's Releases",
          items: [
            { image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { image: "https://cdn.quasar.dev/img/mountains.jpg" },
          ],
        },
        {
          name: "Star Pick",
          items: [
            { image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { image: "https://cdn.quasar.dev/img/mountains.jpg" },
          ],
        },
        {
          name: "Trending This Week",
          items: [
            { image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { image: "https://cdn.quasar.dev/img/mountains.jpg" },
          ],
        },
        {
          name: "Award Winning Shorts",
          items: [
            { image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { image: "https://cdn.quasar.dev/img/mountains.jpg" },
          ],
        },
      ],
    };
  },
  methods: {
    detail_page() {
      this.$router.push({ name: "detail-category" });
    },
  },
};
</script>
<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 300px;
}
</style>