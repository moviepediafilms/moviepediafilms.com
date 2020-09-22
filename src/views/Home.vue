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
              style="width: 230px;"
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
            {
              id: 1,
              image:
                "https://res.cloudinary.com/moviepedia/image/upload/w_380,h_270/v1600784051/movie_thumbs/movie_15_e6i6th.jpg",
            },
            {
              id: 2,
              image:
                "https://res.cloudinary.com/moviepedia/image/upload/w_380,h_270/v1600784051/movie_thumbs/movie_14_um32ao.jpg",
            },
            {
              id: 3,
              image:
                "https://res.cloudinary.com/moviepedia/image/upload/w_380,h_270/v1600784051/movie_thumbs/movie_13_ripwxl.jpg",
            },
            {
              id: 4,
              image:
                "https://res.cloudinary.com/moviepedia/image/upload/w_380,h_270/v1600784051/movie_thumbs/movie_10_kpupgd.jpg",
            },
            {
              id: 5,
              image:
                "https://res.cloudinary.com/moviepedia/image/upload/w_380,h_270/v1600784050/movie_thumbs/movie_11_gzerr3.jpg",
            },
          ],
        },
        {
          name: "Star Pick",
          items: [
            {
              id: 1,
              image:
                "https://res.cloudinary.com/moviepedia/image/upload/w_380,h_270/v1600784098/judges_thumbs/20200922_182634_0000_xd8vfn.png",
            },
            {
              id: 2,
              image:
                "https://res.cloudinary.com/moviepedia/image/upload/w_380,h_270/v1600784097/judges_thumbs/20200922_182607_0000_dwlpn2.png",
            },
            {
              id: 3,
              image:
                "https://res.cloudinary.com/moviepedia/image/upload/w_380,h_270/v1600784095/judges_thumbs/20200922_182642_0000_ispwzr.png",
            },
            {
              id: 4,
              image:
                "https://res.cloudinary.com/moviepedia/image/upload/w_380,h_270/v1600784095/judges_thumbs/20200922_182626_0000_osijza.png",
            },
          ],
        },
        {
          name: "Trending This Week",
          items: [
            { id: 1, image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { id: 2, image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { id: 3, image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { id: 4, image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { id: 5, image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { id: 6, image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { id: 7, image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { id: 8, image: "https://cdn.quasar.dev/img/mountains.jpg" },
          ],
        },
        {
          name: "Award Winning Shorts",
          items: [
            { id: 1, image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { id: 2, image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { id: 3, image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { id: 4, image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { id: 5, image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { id: 6, image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { id: 7, image: "https://cdn.quasar.dev/img/mountains.jpg" },
            { id: 8, image: "https://cdn.quasar.dev/img/mountains.jpg" },
          ],
        },
      ],
    };
  },
  methods: {
    detail_page(movie) {
      this.$router.push({ name: "movie-detail", params: { id: movie.id } });
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