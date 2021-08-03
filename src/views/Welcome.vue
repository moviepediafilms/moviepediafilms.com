<template>
  <base-layout>
    <div class="row" style="overflow-x: hidden">
      <div ref="start"></div>
      <slide1></slide1>
      <slide2 id="creators"></slide2>
      <slide3></slide3>
      <slide4 id="curators"></slide4>
      <slide5></slide5>
      <slide6 id="celebrities"></slide6>
      <slide7></slide7>
      <slide8></slide8>
      <slide9></slide9>
      <slide10></slide10>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn
          ref="fab"
          fab
          round
          glossy
          color="dark"
          padding="12px"
          :to="{ name: 'home' }"
        >
          <q-avatar size="42px">
            <img src="/tile70.png" />
          </q-avatar>
        </q-btn>
      </q-page-sticky>
    </div>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/Base";
import Slide1 from "@/components/welcome/Slide1";
import Slide2 from "@/components/welcome/Slide2";
import Slide3 from "@/components/welcome/Slide3";
import Slide4 from "@/components/welcome/Slide4";
import Slide5 from "@/components/welcome/Slide5";
import Slide6 from "@/components/welcome/Slide6";
import Slide7 from "@/components/welcome/Slide7";
import Slide8 from "@/components/welcome/Slide8";
import Slide9 from "@/components/welcome/Slide9";
import Slide10 from "@/components/welcome/Slide10";
export default {
  metaInfo: {
    title: "Welcome",
  },
  components: {
    Slide1,
    Slide2,
    Slide3,
    Slide4,
    Slide5,
    Slide6,
    Slide7,
    Slide8,
    Slide9,
    Slide10,
    BaseLayout,
  },
  data() {
    return {};
  },
  mounted() {
    setTimeout(this.add_animation, 10);
  },
  methods: {
    add_animation() {
      this.$gsap.from(this.$refs.fab.$el, {
        xPercent: 120,
        scale: 0,
        opacity: 0,
        scrollTrigger: {
          trigger: this.$refs.start,
          start: "top 30px",
          scrub: true,
        },
      });
    },
  },
};
</script>
<style lang="scss">
.mp-subtitle2 {
  font-family: "Prompt", "-apple-system", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  font-size: 14px;
}
.mp-title {
  font-family: "Prompt", "-apple-system", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  font-size: 20px;
  font-weight: 300;
  line-height: 1.1;
}
.mp-title2 {
  font-family: "Prompt", "-apple-system", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  font-size: 32px;
  font-weight: 300;
  line-height: 1.1;
}
.mp-bg {
  width: 100%;
  background-position: center;
  background-size: cover;
}
.mp-title-big {
  font-family: "AbeeZee", "Prompt", "-apple-system", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
  font-weight: 400;
  font-size: 38px;
  letter-spacing: 5px;
}
.mp-name {
  font-family: "Prompt", "-apple-system", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  font-size: 24px;
  font-weight: 300;
  line-height: 1.1;
  letter-spacing: 8.5px;
}
.mp-subtitle {
  font-family: "Prompt", "-apple-system", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  font-weight: 300;
  line-height: 1.1;
  word-spacing: 2px;
}
</style>