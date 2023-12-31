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
    setTimeout(this.add_animation, 100);
  },
  methods: {
    add_animation() {
      this.$refs.play.forEach((play, index) => {
        this.$gsap.from(play.$el, {
          x: -100,
          duration: 1.8 - 0.4 * (index + 1),
          scrollTrigger: {
            trigger: play.$el,
          },
        });
      });

      this.$gsap.from(this.$refs.bar, {
        x: 200,
        duration: 1,
        scrollTrigger: {
          trigger: this.$refs.bar,
        },
      });
    },
  },
};
</script>