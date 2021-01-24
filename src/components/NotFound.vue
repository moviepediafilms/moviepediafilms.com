<template>
  <div class="q-my-lg q-py-lg text-center">
    <div class="text-h1 text-weight-thin" style="letter-spacing: 0.15em">
      404
    </div>
    <div class="text-overline text-weight-light">It seems you are lost!</div>
    <div class="q-mt-lg">
      <router-link
        :to="{ name: 'home' }"
        class="text-primary text-decoration-none"
        >Home</router-link
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "not-found",
  data() {
    return {};
  },
};
</script>