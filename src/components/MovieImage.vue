<template>
  <q-img
    :ratio="9 / 16"
    :src="`${media_base}${poster}`"
    @click="$emit('click')"
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
          <div class="text-h3">{{ title }}</div>
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
  },
  computed: {
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