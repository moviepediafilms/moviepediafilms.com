<template>
  <div>
    <q-list padding separator v-if="reviews.length > 0">
      <q-item v-for="review in reviews" :key="review.id">
        <q-item-section>
          <q-item-label align="left"> {{ review.content }}</q-item-label>
          <q-item-label caption align="left">
            <router-link
              class="text-primary text-decoration-none"
              :to="{
                name: 'movie-detail',
                params: {
                  id: review.movie.id,
                  slug: slugify(review.movie.title),
                },
              }"
              >{{ review.movie.title }}</router-link
            >
          </q-item-label>
          <q-item-label caption align="right">
            <span><q-icon name="mdi-star" /> {{ review.rating }} / 10 </span>
            <q-icon name="mdi-circle-medium" class="q-mx-xs" color="grey-6" />
            <span>{{ review.liked_by.length }} likes</span>
            <q-icon name="mdi-circle-medium" class="q-mx-xs" color="grey-6" />
            <span>{{ date_to_txt(review.published_at) }}</span>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <empty-state
      title="No Reviews"
      desc="No reviews were found"
      icon="mdi-emoticon-sad"
      v-else
    />
  </div>
</template>
<script>
export default {
  props: {
    reviews: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>