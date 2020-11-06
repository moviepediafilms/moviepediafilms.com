<template>
  <base-layout>
    <div class="q-ma-md text-center q-pt-xs">
      <h3 class="text-primary">My Reviews</h3>
      <reviews :reviews="reviews" />
    </div>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/Base";
import Reviews from "@/components/Reviews";
import { review_service } from "@/services";
export default {
  name: "my-review-page",
  components: {
    BaseLayout,
    Reviews,
  },
  metaInfo: {
    title: "My Reviews",
  },
  data() {
    return {
      reviews: [
        {
          id: 1,
          content: "",
          liked_by: [],
          published_at: "",
          rating: 5.0,
          movie: {
            id: 1,
            title: "",
            poster: "",
            about: "",
          },
        },
      ],
    };
  },
  mounted() {
    this.reviews.splice(0, 1);
    this.get_reviews();
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