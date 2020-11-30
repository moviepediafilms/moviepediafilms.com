<template>
  <base-layout>
    <div class="row">
      <slide1></slide1>
      <slide2></slide2>
      <slide3></slide3>
      <slide4></slide4>
      <slide5></slide5>
      <slide6></slide6>
      <slide7></slide7>
      <slide8></slide8>
      <slide9></slide9>
      <slide10></slide10>
    </div>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/Base";
import Slide1 from "@/components/home/Slide1";
import Slide2 from "@/components/home/Slide2";
import Slide3 from "@/components/home/Slide3";
import Slide4 from "@/components/home/Slide4";
import Slide5 from "@/components/home/Slide5";
import Slide6 from "@/components/home/Slide6";
import Slide7 from "@/components/home/Slide7";
import Slide8 from "@/components/home/Slide8";
import Slide9 from "@/components/home/Slide9";
import Slide10 from "@/components/home/Slide10";
export default {
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
  mounted() {},
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
.mp-btn {
  font-family: "Prompt", "-apple-system", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  letter-spacing: 6px;
}
</style>