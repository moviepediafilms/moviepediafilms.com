<template>
  <q-img
    :ratio="9 / 16"
    :src="`${media_base}${poster}`"
    @click.prevent="$emit('click')"
  >
    <div
      class="absolute-top-left text-center bg-primary q-pa-none"
      style="padding: 0px"
    >
      <div v-if="showState">
        <q-badge text-color="dark" color="transparent">
          {{ state_txt }}
        </q-badge>
      </div>
    </div>
    <div
      class="absolute-top-right bg-transparent"
      style="padding: 0"
      v-if="menuBtn"
    >
      <q-btn
        round
        flat
        icon="mdi-dots-vertical"
        @click.stop="$emit('showOptions')"
      />
    </div>
    <div
      class="absolute-bottom-right bg-transparent text-grey-4 q-mr-xs"
      style="padding: 2px"
      v-if="runtime_txt"
    >
      <q-icon name="mdi-play-circle-outline" class="q-mr-xs" />{{ runtime_txt }}
    </div>
    <template v-slot:error>
      <div
        class="absolute-full column bg-primary text-dark"
        style="padding: 0px"
      >
        <div class="col-auto" v-if="showState">
          <div class="bg-dark" style="width: fit-content">
            <q-badge :text-color="state_color" color="transparent">
              {{ state_txt }}
            </q-badge>
          </div>
        </div>
        <div
          class="col flex text-center justify-center items-center"
          style="padding: 16px"
        >
          <div class="text-h4">{{ title }}</div>
          <div class="text-caption">
            <q-icon name="mdi-close" color="negative" size="24px" />Cannot load
            image
          </div>
        </div>
      </div>
    </template>
  </q-img>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    poster: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    showState: {
      type: Boolean,
      default: false,
    },
    menuBtn: {
      type: Boolean,
      default: false,
    },
    runtime: {
      type: [Number, String],
      default: 0,
    },
  },
  computed: {
    runtime_txt() {
      // runtime cannot exeed 60 minutes
      var minutes = this.runtime;
      if (minutes) {
        if (minutes < 10) minutes = "0" + minutes;
        return `${minutes}:00`;
      }
      return "";
    },
    state_color() {
      return {
        C: "red-4",
        S: "primary",
        P: "green-4",
        R: "red-4",
      }[this.state];
    },
    state_txt() {
      return {
        C: "Incomplete",
        S: "Pending",
        P: "Approved",
        R: "Rejected",
      }[this.state];
    },
  },
};
</script>