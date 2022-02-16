<template>
  <div
    style="background-image: url('/img/2_bg.png')"
    class="q-px-lg q-mt-lg q-py-lg mp-bg"
  >
    <bar />
    <div class="q-mt-lg text-weight-bold text-center mp-title2 text-primary">
      What's in it for you?
    </div>
    <div class="q-mt-md text-center mp-title2 text-weight-bold">CREATORS</div>
    <div class="q-mt-md text-center mp-subtitle2 text-grey-4">
      We help you with filmmaking needs, from building your own reputed OTT
      channel to getting curators, celebrities and funding for you.
    </div>
    <div class="row q-col-gutter-md q-mt-md">
      <circular-item
        v-for="(item, index) in items"
        :key="index"
        :icon="item.icon"
        :desc="item.desc"
        :title="item.title"
      ></circular-item>
    </div>
  </div>
</template>
<script>
import Bar from "@/components/animated/Bar";
import CircularItem from "@/components/welcome/CircularItem";
export default {
  components: {
    Bar,
    CircularItem,
  },
  data() {
    return {
      items: [
        {
          icon: "mdi-trophy",
          title: "₹ 15,000",
          desc: "Creator of the Month Title",
        },
        {
          icon: "mdi-youtube",
          title: "Drive Views",
          desc: "to your YouTube channel",
        },
        {
          icon: "mdi-star",
          title: "Celebrities",
          desc: "recommend your films",
        },
        {
          icon: "mdi-domino-mask",
          title: "Recognition",
          desc: "focussed profiling",
        },
        {
          icon: "mdi-cash-multiple",
          title: "Get Funded",
          desc: "for your upcoming projects",
        },
        {
          icon: "mdi-video-account",
          title: "Social Media",
          desc: "campaigns for your films",
        },
      ],
    };
  },
  computed: {},
  mounted() {},
};
</script>