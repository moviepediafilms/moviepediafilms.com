<template>
  <div class="flex items-center justify-start q-mt-lg">
    <div class="q-ml-lg">
      <q-icon
        name="mdi-play"
        size="24px"
        ref="play"
        :color="i == 3 ? 'primary' : ''"
        v-for="i in 3"
        :key="i"
      />
    </div>

    <div class="col q-ml-lg" ref="bar">
      <div style="border-top: 1px solid white"></div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    console.log(this.$refs.play);
    this.$refs.play.forEach((play, index) => {
      this.$gsap.fromTo(
        play.$el,
        {
          x: -100,
        },
        {
          x: 0,
          duration: 1.6 - 0.4 * (index + 1),
          scrollTrigger: {
            trigger: play.$el,
          },
        }
      );
    });

    this.$gsap.fromTo(
      this.$refs.bar,
      {
        x: 100,
      },
      {
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: this.$refs.bar,
        },
      }
    );
  },
};
</script>