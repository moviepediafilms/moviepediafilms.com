<template>
  <div class="flex q-mx-md q-mt-lg">
    <div ref="left" style="z-index: 100">
      <q-avatar rounded size="96px">
        <img :src="image" />
      </q-avatar>
    </div>
    <div
      ref="right"
      class="col flex text-dark bg-primary celeb-item q-py-md items-center"
      style="margin-left: -50px; padding-left: 65px"
    >
      <div class="text-black text-weight-bolder mp-title">
        {{ name }}
      </div>
      <div class="mp-subtitle">{{ title }}</div>
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
      default: "/default_avatar.png",
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