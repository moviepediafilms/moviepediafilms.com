<template>
  <base-layout>
    <div class="q-ma-md text-center q-pt-xs">
      <div class="text-primary text-h1">Reviews</div>
      <reviews
        :reviews="reviews"
        :empty-top-padded="true"
        empty-title="Nothing to show here"
        empty-desc="Express and appreciate what you watch, who knows you might be our next featured critic"
        empty-image="/img/empty/16.svg"
      />
    </div>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/Base";
import Reviews from "@/components/Reviews";
import { review_service } from "@/services";
export default {
  name: "reviews-page",
  components: {
    BaseLayout,
    Reviews,
  },
  metaInfo: {
    title: "Reviews",
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
  computed: {
    profile_id() {
      return this.$route.params.id;
    },
  },
  methods: {
    get_reviews() {
      review_service
        .get({ author__id: this.profile_id })
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