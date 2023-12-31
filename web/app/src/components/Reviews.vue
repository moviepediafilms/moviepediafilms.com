<template>
  <div>
    <q-list padding separator v-if="reviews.length > 0">
      <q-item v-for="review in reviews" :key="review.id">
        <q-item-section
          avatar
          top
          v-if="showUser"
          @click="
            $router.push({ name: 'profile', params: { id: review.author.id } })
          "
        >
          <q-avatar>
            <img :src="review.author.image" @error="on_user_img_error" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label v-if="showUser">
            <router-link
              class="text-primary text-decoration-none"
              :to="{ name: 'profile', params: { id: review.author.id } }"
              >{{ review.author.name }}</router-link
            >
          </q-item-label>
          <q-item-label caption align="left" v-if="showMovieLink">
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
          <q-item-label align="left" style="word-break: break-word">
            <read-more
              class="readmore readmore-primary"
              more-str="read more"
              :text="review.content"
              link="#"
              less-str="read less"
              :max-chars="200"
            ></read-more>
          </q-item-label>

          <q-item-label caption align="right">
            <span v-if="review.rating > -1"
              ><q-icon name="mdi-star" /> {{ review.rating }} / 10
            </span>

            <q-icon name="mdi-circle-medium" class="q-mx-xs" color="grey-6" />
            <q-btn
              round
              flat
              icon="mdi-thumb-up"
              @click="$emit('toggle-like', review)"
              :color="get_like_btn_color(review.liked_by)"
              size="xs"
            ></q-btn>
            <span>{{ get_like_txt(review.liked_by.length) }}</span>

            <q-icon name="mdi-circle-medium" class="q-mx-xs" color="grey-6" />
            <span>{{ date_to_txt(review.published_at) }}</span>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <empty-state
      :title="emptyTitle"
      :desc="emptyDesc"
      :icon="emptyIcon"
      :image="emptyImage"
      :top-padded="emptyTopPadded"
      v-else
    />
  </div>
</template>
<script>
export default {
  props: {
    showUser: {
      type: Boolean,
      default: false,
    },
    showMovieLink: {
      type: Boolean,
      default: true,
    },
    reviews: {
      type: Array,
      default() {
        return [];
      },
    },
    emptyTitle: {
      type: String,
      default: "Nothing to show here",
    },
    emptyDesc: {
      type: String,
      default: "No Reviews found!",
    },
    emptyIcon: {
      type: String,
      default: null,
    },
    emptyImage: {
      type: String,
      default: null,
    },
    emptyTopPadded: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {},
  methods: {
    get_like_txt(count) {
      if (count == 0) return "no likes";
      if (count == 1) return "1 like";
      return `${count} likes`;
    },
    get_like_btn_color(liked_by) {
      return this.if_i_liked(liked_by) ? "primary" : "default";
    },
    if_i_liked(liked_by) {
      var liked = false;
      if (!this.my_profile) return liked;

      liked_by.forEach((user) => {
        if (user.id == this.my_profile.id) {
          liked = true;
        }
      });
      return liked;
    },
  },
};
</script>