<template>
  <div class="col">
    <q-list padding v-if="users.length > 0">
      <q-item dense class="q-ma-none q-pa-none">
        <q-item-section avatar> </q-item-section>
        <q-item-section class="q-ml-lg text-caption text-left text-grey-5"
          >Name
        </q-item-section>
        <q-item-section
          side
          class="text-caption text-grey-5"
          style="min-width: 50px"
        >
          Likes
        </q-item-section>
        <q-item-section
          side
          class="text-caption text-grey-5"
          style="min-width: 50px"
        >
          Match
        </q-item-section>
      </q-item>
      <q-item
        clickable
        v-ripple
        v-for="(user, index) in users"
        :key="index"
        style="border-radius: 10px"
        :class="{ 'bg-light-green-10 q-mb-xs': index < highlight_top }"
        @click="$emit('click', user)"
      >
        <q-item-section avatar>
          <q-avatar>
            <img
              :src="user.image || '/default_avatar.png'"
              @error="on_user_img_error"
            />
          </q-avatar>
        </q-item-section>
        <q-item-section no-wrap class="ellipsis text-left">
          {{ user.name }}
          <span class="text-grey-6 text-caption">{{ user.city }}</span>
        </q-item-section>
        <q-item-section side style="min-width: 55px">
          {{ user.likes_on_recommend }}
        </q-item-section>
        <q-item-section side style="min-width: 55px">
          {{ user.match }}
        </q-item-section>
      </q-item>
    </q-list>
    <transition
      appear
      name="custom-classes-transition"
      enter-active-class="animated animate__fadeIn"
      leave-active-class="animated animate__fadeOut"
      mode="out-in"
      :duration="200"
    >
      <div class="text-center q-my-lg" v-if="loading">
        <q-spinner-hourglass color="grey-6" size="2em" />
      </div>
    </transition>
    <div class="row justify-center q-mt-md" v-if="show_page_indicator">
      <q-pagination
        v-model="curr_page"
        color="grey-6"
        text-color="dark"
        :max="pages"
        :max-pages="7"
        :direction-links="true"
        :boundary-numbers="false"
      >
      </q-pagination>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    users: {
      type: Array,
      default() {
        return [];
      },
    },
    pages: {
      type: Number,
      dafault: 1,
    },
    loading: {
      type: Boolean,
      dafault: true,
    },
    show_page_indicator: {
      type: Boolean,
      dafault: true,
    },
    pin_self_top: {
      type: Boolean,
      dafault: true,
    },
    highlight_top: {
      type: Number,
      dafault: 0,
    },
  },

  data() {
    return {
      curr_page: 1,
    };
  },
  watch: {
    curr_page() {
      this.$emit("page-change", this.curr_page);
    },
  },
  methods: {},
};
</script>