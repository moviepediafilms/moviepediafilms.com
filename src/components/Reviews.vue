<template>
  <q-list padding separator>
    <q-item v-for="review in reviews" :key="review.id">
      <q-item-section>
        <q-item-label align="left"> {{ review.content }}</q-item-label>
        <q-item-label caption align="left">{{
          review.movie.title
        }}</q-item-label>
        <q-item-label caption align="right">
          <span>{{ review.rating }} / 10 <q-icon name="mdi-star" /></span>
          <q-icon name="mdi-circle-medium" class="q-mx-xs" color="grey-6" />
          <span>{{ review.liked_by.length }} likes</span>
          <q-icon name="mdi-circle-medium" class="q-mx-xs" color="grey-6" />
          <span>{{ date_to_txt(review.published_at) }}</span>
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
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