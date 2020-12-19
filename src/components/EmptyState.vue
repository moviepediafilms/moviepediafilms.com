<template>
  <div class="text-center text-grey-7" :class="{ 'q-mt-md': topPadded }">
    <q-icon :name="icon" class="q-mb-md" size="80px" v-if="icon && !image" />
    <div
      style="display: flex; align-item: center; justify-content: center"
      :style="{ height: height }"
      v-if="image"
    >
      <img
        :src="image"
        class="q-my-md"
        style="height: 90%; object-fit: scale"
      />
    </div>
    <div class="q-mt-sm q-mb-sm text-h3">{{ title }}</div>
    <p v-if="desc" v-html="desc"></p>
  </div>
</template>
<script>
export default {
  props: {
    height: {
      type: String,
      default: "150px",
    },
    topPadded: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "Nothing in here!",
    },
    desc: {
      type: String,
      default: "no content was found",
    },
    image: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: "mdi-emoticon-sad",
    },
  },
};
</script>