<template>
  <div>
    <q-list padding ref="list" v-if="users.length > 0">
      <q-item dense class="q-ma-none q-pa-none">
        <q-item-section avatar> </q-item-section>
        <q-item-section class="q-ml-lg text-caption text-left text-grey-5">
        </q-item-section>
        <q-item-section
          side
          class="text-caption text-grey-5"
          style="min-width: 50px"
        >
          Points
        </q-item-section>
        <q-item-section
          side
          class="text-caption text-grey-5"
          style="min-width: 50px"
        >
          #Rank
        </q-item-section>
      </q-item>
      <q-item
        clickable
        v-ripple
        class="bg-light-green-10"
        style="border-radius: 10px"
        v-if="pin_self_top"
      >
        <q-item-section avatar>
          <q-avatar>
            <img :src="my_profile.image" @error="on_user_img_error" />
          </q-avatar>
        </q-item-section>
        <q-item-section no-wrap class="ellipsis text-left">
          {{ my_profile.name }}
          <br />
          <span class="text-caption">{{ my_profile.city }}</span>
        </q-item-section>
        <q-item-section side style="min-width: 55px">
          {{ my_profile[pointFrom] }}
        </q-item-section>
        <q-item-section side style="min-width: 55px">
          #{{ my_profile[rankFrom] }}
        </q-item-section>
      </q-item>
      <q-item
        clickable
        v-ripple
        v-for="(user, index) in users"
        :key="user.id"
        style="border-radius: 10px"
        :class="{ 'bg-light-green-10 q-mb-xs': index < highlight_top }"
        @click="$emit('click', user)"
      >
        <q-item-section avatar>
          <q-avatar>
            <img :src="user.image" @error="on_user_img_error" />
          </q-avatar>
        </q-item-section>
        <q-item-section no-wrap class="ellipsis text-left">
          {{ user.name }}
          <span class="text-grey-6 text-caption">{{ user.city }}</span>
        </q-item-section>
        <q-item-section side style="min-width: 55px">
          {{ user[pointFrom] }}
        </q-item-section>
        <q-item-section side style="min-width: 55px">
          {{ user[rankFrom] }}
        </q-item-section>
      </q-item>
    </q-list>
    <div class="text-center q-my-lg" v-if="loading">
      <q-spinner-hourglass color="grey-6" size="2em" />
    </div>
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
import _ from "lodash";
export default {
  props: {
    highlight_top: {
      type: Number,
      default: 0,
    },
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
    pointFrom: {
      type: String,
    },
    rankFrom: {
      type: String,
    },
  },

  data() {
    return {
      curr_page: 1,
    };
  },
  computed: {
    throttled_scroll_handler() {
      return _.throttle(this.scroll_handler, 300);
    },
  },
  created() {
    window.addEventListener("scroll", this.throttled_scroll_handler);
  },
  destroyed() {
    window.removeEventListener("scroll", this.throttled_scroll_handler);
  },
  watch: {
    curr_page() {
      this.$emit("page-change", this.curr_page);
    },
  },
  methods: {
    scroll_handler() {
      if (this.$refs.list) {
        var list = this.$refs.list.$el;
        var dimens = list.getClientRects()[0];
        if (dimens.bottom < window.innerHeight) {
          this.curr_page += 1;
        }
      }
    },
  },
};
</script>