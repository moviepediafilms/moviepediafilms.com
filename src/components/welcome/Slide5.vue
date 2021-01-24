<template>
  <div
    style="background-image: url('/img/5_bg.png')"
    class="q-mt-md mp-bg q-py-lg mp-bg"
  >
    <bar-hammer />
    <div class="q-mx-lg q-mt-lg">
      <div class="mp-title2 text-primary text-weight-bold">How it works?</div>
      <div class="mp-title2 q-mb-lg q-mt-sm text-weight-bold">CURATORS</div>
      <div
        style="overflow: hidden"
        class="flex items-center q-mb-md"
        v-for="(item, index) in items"
        :key="index"
      >
        <div class="col" ref="lefts">
          <div class="mp-title text-primary">{{ item.title }}</div>
          <div class="mp-subtitle q-mt-sm text-grey-4">{{ item.desc }}</div>
        </div>
        <div class="q-pa-md" ref="rights">
          <div class="flex justify-center items-center circular-border">
            <q-icon size="32px" :name="item.icon" color="primary" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BarHammer from "@/components/animated/BarHammer";
export default {
  components: {
    BarHammer,
  },
  data() {
    return {
      items: [
        {
          title: "Watch & Spot",
          desc:
            "Curation is an art. Spot the best content and win rewards while you're at it",
          icon: "mdi-play-circle",
        },
        {
          title: "Rate & Review",
          desc: "Be the jury and help us pick the best films out there",
          icon: "mdi-thumb-up",
        },
        {
          title: "Recommend",
          desc: "our users recommend your films to their network",
          icon: "mdi-bullhorn",
        },
        {
          title: "Match with the Celebs' Consensus",
          desc:
            "Every month find how your recommendations match with our partner celebrities. The higher the match, the higher the rewards",
          icon: "mdi-star",
        },
        {
          title: "Engagement Boost",
          desc:
            "Shoot up your engagement scores and become a standout curator on our platform",
          icon: "mdi-trending-up",
        },
      ],
    };
  },
  computed: {},
  mounted() {
    setTimeout(this.add_animation, 100);
  },
  methods: {
    add_animation() {
      this.$refs.lefts.forEach((section) => {
        this.$gsap.from(section, {
          opacity: 0,
          x: -100,
          duration: 0.6,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        });
      });
      this.$refs.rights.forEach((section) => {
        this.$gsap.from(section, {
          opacity: 0,
          x: 100,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        });
      });
    },
  },
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