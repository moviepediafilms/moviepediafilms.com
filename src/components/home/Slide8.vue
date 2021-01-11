<template>
  <div
    style="background-image: url('/img/8_bg.png')"
    class="q-mt-md mp-bg q-mb-none"
  >
    <div class="row items-stretch q-mt-md" style="display: relative">
      <div class="col-12">
        <bar-plus />
      </div>
      <div class="col-10 offset-2 q-pa-md">
        <div class="q-my-md q-mx-lg">
          <div class="mp-title2 text-weight-bold">Creator Profile</div>
          <div class="mp-subtitle q-mt-sm">
            Showcase your films, grow popularity and stay fund-ready for your
            upcoming projects
          </div>
        </div>
      </div>
      <div class="col-10 offset-2">
        <bar-plus :rtl="true" />
      </div>
      <div class="col-12 text-center q-mt-lg" style="margin-bottom: -5px">
        <img src="/img/8.png" width="100%" style="max-width: 300px" />
      </div>
    </div>
  </div>
</template>
<script>
import BarPlus from "@/components/animated/BarPlus";
export default {
  components: {
    BarPlus,
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
};
</script>