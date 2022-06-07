<template>
  <div class="col-6 text-center">
    <div class="q-pa-md">
      <div class="flex justify-center items-center circular-border">
        <q-icon :name="icon" size="32px" color="primary"></q-icon>
      </div>
    </div>
    <div class="mp-title text-weight-bold">{{ title }}</div>
    <div class="text-primary q-mt-xs mp-subtitle2" style="font-size: 12px">
      {{ desc }}
    </div>
  </div>
</template>
<script>

export default {
  props: {
    icon: {
      type: String,
      default: "mdi-circle",
    },
    title: {
      type: String,
      default: "Dummy Title",
    },
    desc: {
      type: String,
      default: "Send a summary to me",
    },
  },
  mounted() {
    setTimeout(this.add_animation, 100)
  },
  methods: {
    add_animation(){
      this.$gsap.from(this.$el, {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      ease: "back",
      scrollTrigger: {
        trigger: this.$el,
        start: "top 80%",
      },
    });
    }
  }
};
</script>
<style scoped>
.circular-border {
  border: 1px solid white;
  border-radius: 50%;
  margin: auto;
  width: 60px;
  height: 60px;
}
</style>