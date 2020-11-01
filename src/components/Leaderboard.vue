<template>
  <div>
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

      <q-list padding v-else>
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
        >
          <q-item-section avatar>
            <q-avatar>
              <img :src="my_profile.image" @error="on_img_load_fail" />
            </q-avatar>
          </q-item-section>
          <q-item-section no-wrap class="ellipsis text-left">
            {{ my_profile.name }}
            <br />
            <span class="text-caption">{{ my_profile.city }}</span>
          </q-item-section>
          <q-item-section side style="min-width: 55px">
            {{ my_profile.score }}
          </q-item-section>
          <q-item-section side style="min-width: 55px">
            #{{ my_profile.rank }}
          </q-item-section>
        </q-item>
        <q-item v-for="user in users" :key="user.id">
          <q-item-section avatar>
            <q-avatar>
              <img
                :src="user.image || '/default_avatar.png'"
                @error="on_img_load_fail"
              />
            </q-avatar>
          </q-item-section>
          <q-item-section no-wrap class="ellipsis text-left">
            {{ user.name }}

            <span class="text-grey-6 text-caption">{{ my_profile.city }}</span>
          </q-item-section>
          <q-item-section side style="min-width: 55px">
            {{ user.score }}
          </q-item-section>
          <q-item-section side style="min-width: 55px">
            #{{ user.rank }}
          </q-item-section>
        </q-item>
      </q-list>
    </transition>
    <div class="row justify-center q-mt-md">
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
    page_size: {
      type: Number,
      dafault: 10,
    },
    pages: {
      type: Number,
      dafault: 1,
    },
    loading: {
      type: Boolean,
      dafault: true,
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
  methods: {
    on_img_load_fail(img) {
      img.target.src = "/default_avatar.png";
    },
  },
};
</script>