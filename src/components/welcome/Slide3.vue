<template>
  <div
    style="background-image: url('/img/2_bg.png')"
    class="q-mt-md mp-bg q-py-lg mp-bg"
  >
    <bar-hammer />
    <div class="q-mx-lg q-mt-lg">
      <div
        class="mp-title text-primary text-weight-bold"
        style="font-size: 32px"
      >
        How it Works?
      </div>
      <div
        class="mp-title text-weight-bold q-mt-sm q-mb-xl"
        style="font-size: 32px"
      >
        CREATORS
      </div>
      <template v-for="(item, index) in items">
        <div
          :key="index"
          class="flex q-mb-lg items-center"
          style="overflow: hidden"
        >
          <div class="col" ref="lefts">
            <div class="mp-title text-primary">{{ item.title }}</div>
            <div class="mp-subtitle q-mt-md text-grey-4">
              {{ item.desc }}
            </div>
          </div>
          <div class="q-ml-sm" ref="rights">
            <q-btn
              round
              color="primary"
              size="20px"
              text-color="dark"
              :icon="item.icon"
            />
          </div>
        </div>
      </template>
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
          title: "Film Submission",
          desc: "You submit your film on our platform",
          icon: "mdi-plus",
        },
        {
          title: "Film Screening",
          desc: "We screen your film after verification",
          icon: "mdi-play",
        },
        {
          title: "Curator Recommends",
          desc: "Our users recommend your films to their network",
          icon: "mdi-bullhorn",
        },
        {
          title: "Celebrity Recommends",
          desc:
            "Your film stands a chance to get recommended by our Partner Celebrities",
          icon: "mdi-star",
        },
        {
          title: "Popularity Boost",
          desc:
            "Be a standout creator and shoot up your popularity score by winning titles and receiving recommendations",
          icon: "mdi-trending-up",
        },
      ],
    };
  },
  mounted() {
    setTimeout(this.add_animation, 100);
  },
  computed: {},
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