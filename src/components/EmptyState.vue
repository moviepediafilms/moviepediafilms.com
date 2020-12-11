<template>
  <div class="text-center text-grey-7">
    <q-icon :name="icon" class="q-mb-md" size="80px" v-if="icon && !image" />
    <q-img :src="image" v-if="image" style="max-width: 300px" />
    <div class="q-mb-sm text-h3">{{ title }}</div>
    <p v-if="desc" v-html="desc"></p>
  </div>
</template>
<script>
export default {
  props: {
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