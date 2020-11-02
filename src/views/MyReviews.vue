<template>
  <base-layout>
    <div class="q-ma-md text-center q-pt-xs">
      <h3 class="text-primary">My Reviews</h3>
      <q-list padding separator>
        <q-item v-for="review in reviews" :key="review.id">
          <q-item-section>
            <q-item-label align="left"> {{ review.content }}</q-item-label>
            <q-item-label caption align="left">{{
              review.movie.title
            }}</q-item-label>
            <q-item-label caption align="right">
              {{ review.liked_by.length }} likes
              <q-icon name="mdi-circle-medium" />
              {{ date_to_txt(review.published_at) }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/Base";
import { review_service } from "@/services";
export default {
  name: "my-review-page",
  components: {
    BaseLayout,
  },
  metaInfo: {
    title: "My Reviews",
  },
  data() {
    return {
      reviews: [
        {
          id: 1,
          author: {
            id: 2,
            email: "zkhan1093@gmail.com",
            name: "Zeeshan Khan",
          },
          content:
            "Damn. \r\nThis was both beautiful and haunting, as someone who's been through terrible Depression, I could feel it scene by scene, it was too amazing for words Mann, keep it up ❤️",
          liked_by: [],
          published_at: "2020-10-01T17:21:08.672000Z",
          rating: 5.0,
          movie: {
            id: 1,
            title:
              "30 Days of Existence | A Moviepedia Short Film on Depression",
            poster: "https://img.youtube.com/vi/KS0bagkAC4Y/hqdefault.jpg",
            about: "This is a good movie",
          },
        },
        {
          id: 2,
          author: {
            id: 2,
            email: "zkhan1093@gmail.com",
            name: "Zeeshan Khan",
          },
          content:
            "Damn. \r\nThis was both beautiful and haunting, as someone who's been through terrible Depression, I could feel it scene by scene, it was too amazing for words Mann, keep it up ❤️",
          liked_by: [],
          published_at: "2020-10-01T17:21:08.672000Z",
          rating: 5.0,
          movie: {
            id: 1,
            title:
              "30 Days of Existence | A Moviepedia Short Film on Depression",
            poster: "https://img.youtube.com/vi/KS0bagkAC4Y/hqdefault.jpg",
            about: "This is a good movie",
          },
        },
      ],
    };
  },
  mounted() {
    // this.get_reviews();
  },
  methods: {
    get_reviews() {
      review_service
        .get({ author__id: this.my_profile.id })
        .then((res) => {
          this.reviews = res.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>