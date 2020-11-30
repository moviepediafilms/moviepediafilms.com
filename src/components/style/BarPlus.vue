<template>
  <div class="flex justify-end items-center" style="overflow-x: hidden">
    <template v-if="rtl">
      <div class="color-bg-white" ref="plus">
        <q-icon name="mdi-plus" color="primary" size="32px" class="q-mr-md" />
      </div>
    </template>
    <div class="col q-mr-sm" ref="bar">
      <div style="border-top: 2px solid white; width: 100%"></div>
    </div>
    <template v-if="!rtl">
      <div class="color-bg-white" ref="plus">
        <q-icon name="mdi-plus" color="primary" size="32px" class="q-mr-md" />
      </div>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    rtl: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  mounted() {
    setTimeout(this.add_animation, 100);
  },
  methods: {
    add_animation() {
      this.$gsap.fromTo(
        this.$refs.bar,
        {
          x: this.rtl ? 300 : -300,
        },
        {
          x: 0,
          duration: 0.5,
          scrollTrigger: this.$refs.bar,
        }
      );
      this.$gsap.fromTo(
        this.$refs.plus,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: this.$refs.plus,
        }
      );
    },
  },
};
</script>