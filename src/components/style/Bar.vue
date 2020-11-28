<template>
  <div class="flex justify-end items-center" style="overflow-x: hidden">
    <div class="col">
      <div style="border-top: 2px solid white; width: 100%"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.$gsap.fromTo(
      this.$el,
      { x: -100 },
      { x: 0, duration: 0.5, scrollTrigger: this.$el }
    );
  },
};
</script>