<template>
  <div
    style="background-image: url('/img/2_bg.png')"
    class="q-px-lg q-mt-lg q-py-lg mp-bg"
  >
    <bar ref="style_bar" />
    <div class="q-mt-lg text-weight-bold text-center mp-title2 text-primary">
      What's in it for you?
    </div>
    <div class="q-mt-md text-center mp-title2 text-weight-bold">CREATORS</div>
    <div class="q-mt-md text-center mp-subtitle2 text-grey-6">
      We help you with filmmaking needs, from building your own reputed OTT
      channel to getting curators, celebrities and funding for you.
    </div>
    <div class="row q-col-gutter-md q-mt-md">
      <template v-for="(item, index) in items">
        <div class="col-6 text-center" :key="index" ref="items">
          <div class="q-pa-md">
            <div
              class="flex justify-center items-center"
              style="
                border: 1px solid white;
                border-radius: 50%;
                margin: auto;
                width: 60px;
                height: 60px;
              "
            >
              <q-icon :name="item.icon" size="32px" color="primary"></q-icon>
            </div>
          </div>
          <div class="mp-title text-weight-bold">{{ item.title }}</div>
          <div
            class="text-primary q-mt-xs mp-subtitle2"
            style="font-size: 12px"
          >
            {{ item.desc }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import Bar from "@/components/style/Bar";
export default {
  components: {
    Bar,
  },
  data() {
    return {
      items: [
        {
          icon: "mdi-trophy",
          title: "₹ 15,000",
          desc: "Filmaker of the Month Title",
        },
        {
          icon: "mdi-youtube",
          title: "Drive Views",
          desc: "to your TouTube channel",
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
          desc: "for yout upcoming projects",
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
  mounted() {
    this.$refs.items.forEach((item) => {
      this.$gsap.fromTo(
        item,
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          transformOrigin: "50% 50%",
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: item,
            bottom: "50%",
          },
        }
      );
    });
  },
};
</script>