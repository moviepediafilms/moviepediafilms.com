<template>
  <div
    class="flex q-mx-md q-mt-lg"
    style="max-width: 350px; margin-right: auto; margin-left: auto"
  >
    <div ref="left" style="z-index: 100">
      <q-avatar size="96px">
        <img :src="image" />
      </q-avatar>
    </div>
    <div
      ref="right"
      class="col flex items-center text-dark bg-primary celeb-item q-py-md"
      style="margin-left: -50px; padding-left: 65px"
    >
      <div class="row">
        <div class="text-h3 text-black text-weight-bolder mp-title">
          {{ name }}
        </div>
        <div class="text-h5 mp-subtitle">{{ title }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: "name",
    },
    title: {
      type: String,
      default: "title goes here",
    },
    image: {
      type: String,
      default: "/default_avatar_m.png",
    },
  },
  mounted() {},
};
</script>
<style scoped>
.celeb-item {
  border-radius: 10px;
}
</style>