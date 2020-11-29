<template>
  <div
    style="background-image: url('/img/7_bg.png')"
    class="q-mt-md mp-bg q-py-lg"
  >
    <div class="row items-stretch">
      <div
        class="bg-primary"
        ref="sidebar"
        style="width: 50px; z-index: 1"
      ></div>
      <div class="col" style="z-index: 10">
        <bar-plus />
        <div class="q-my-md q-mx-lg">
          <div class="mp-title2 text-weight-bold">Creator Profile</div>
          <div class="mp-subtitle q-mt-sm">
            Showcase your films, grow popularity and stay fund-ready for your
            upcoming projects
          </div>
        </div>
        <bar-plus :rtl="true" />
        <div class="q-mt-lg q-pt-lg bg-red" style="width: 100%">
          <img src="/img/7.png" width="100%" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BarPlus from "@/components/style/BarPlus";
export default {
  components: {
    BarPlus,
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {
    this.$gsap.from(this.$refs.sidebar, {
      xPercent: -110,
      duration: 0.8,
      scrollTrigger: {
        trigger: this.$refs.sidebar,
        start: "top 50%",
      },
    });
  },
};
</script>