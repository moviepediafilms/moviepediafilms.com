<template>
  <div class="flex justify-end items-center" style="overflow-x: hidden">
    <div class="col" ref="bar">
      <div style="border-top: 2px solid white; width: 100%"></div>
    </div>
    <div
      style="width: 70px; height: 15px"
      class="bg-primary"
      ref="hammer"
    ></div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.$gsap.fromTo(
      this.$refs.bar,
      {
        x: -300,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: this.$refs.bar,
      }
    );
    this.$gsap.fromTo(
      this.$refs.hammer,
      {
        x: 200,
      },
      {
        x: 0,
        duration: 2,
        scrollTrigger: this.$refs.hammer,
      }
    );
  },
};
</script>