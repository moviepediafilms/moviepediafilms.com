<template>
  <base-layout>
    <div class="row justify-center">
      <div
        style="background-image: url('/img/1_bg.png')"
        class="text-center mp-bg"
      >
        <bar-plus />
        <img
          src="@/assets/icon_stripped.png"
          style="max-width: 400px; width: 60%"
          class="q-mt-md"
        />
        <div class="mp-name q-mt-md">
          <div>MOVIEPEDIA</div>
          <div>FILMS</div>
        </div>
        <div class="mp-subtitle text-primary q-mt-md">
          The First Social Content Discovery Platform
        </div>
        <div class="q-mt-md mp-subtitle q-px-md text-grey-6">
          Join our community of 170k+ members. Create, Curate & Recommend short
          films and get a chance to win monthly cash rewards worth
        </div>
        <q-icon name="mdi-badge-outline"></q-icon>
        <div class="q-mt-md mp-title-big text-weight-bolder">
          <b>₹{{ animated_monthly_cash }}</b>
        </div>
        <div class="q-mt-md">
          <transition
            appear
            name="custom-classes-transition"
            enter-active-class="animated animate__slideInRight"
            mode="out-in"
            :duration="200"
          >
            <q-btn
              color="primary"
              rounded
              text-color="dark"
              class="text-uppercase q-px-md q-py-xs text-dark mp-btn"
              translate=""
              ><div class="">
                <div style="line-height: 1">Submit</div>
                <div style="line-height: 1" class="text-right q-pr-sm">
                  Film
                </div>
              </div>
            </q-btn>
          </transition>
        </div>
        <play-x3-bar />
      </div>
      <div class="q-mt-lg mp-bg q-py-lg">
        <bar-hammer />
        <div class="q-ml-lg q-mt-lg">
          <div class="mp-title text-primary" style="font-size: 32px">
            How it Works?
          </div>
          <div
            class="mp-title text-weight-normal q-mt-sm q-mb-xl"
            style="font-size: 32px"
          >
            CREATORS
          </div>
          <template v-for="(item, index) in page2.items">
            <div :key="index" class="flex q-mb-lg items-center">
              <div class="col" ref="page2itemsleft">
                <div class="mp-title text-primary">{{ item.title }}</div>
                <div class="mp-subtitle q-mt-md text-grey-6">
                  {{ item.desc }}
                </div>
              </div>
              <div class="q-mr-lg q-ml-sm" ref="page2itemsright">
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
    </div>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/Base";
import BarPlus from "@/components/style/BarPlus";
import PlayX3Bar from "@/components/style/PlayX3Bar";
import BarHammer from "@/components/style/BarHammer";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
export default {
  components: {
    BarPlus,
    PlayX3Bar,
    BarHammer,
    BaseLayout,
  },
  data() {
    return {
      monthly_cash: {
        val: 0,
        total: 30000,
      },
      page2: {
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
            desc: "our users recommend your films to their network",
            icon: "mdi-bullhorn",
          },
          {
            title: "Celebrity Recommends",
            desc:
              "Your film stands a change to get recommended by our Partner Celebrities",
            icon: "mdi-star",
          },
          {
            title: "Popularity Boost",
            desc:
              "Be a standout creator and shoot up your popularity score by winning titles and recieving recommendations",
            icon: "mdi-trending-up",
          },
        ],
      },
    };
  },
  computed: {
    animated_monthly_cash() {
      return new Intl.NumberFormat().format(this.monthly_cash.val.toFixed(0));
    },
  },
  mounted() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(this.monthly_cash, {
      duration: 0.8,
      val: this.monthly_cash.total,
    });
    this.$refs.page2itemsleft.forEach((section) => {
      gsap.fromTo(
        section,
        {
          opacity: 0,
          x: -100,
        },
        {
          duration: 0.8,
          opacity: 1,
          x: 0,
          scrollTrigger: {
            trigger: section,
          },
        }
      );
    });
    this.$refs.page2itemsright.forEach((section) => {
      gsap.fromTo(
        section,
        {
          opacity: 0,
          x: 100,
        },
        {
          duration: 0.8,
          opacity: 1,
          x: 0,
          scrollTrigger: {
            end: "80%",
            trigger: section,
          },
        }
      );
    });
  },
  methods: {},
};
</script>
<style lang="scss">
.mp-subtitle {
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
.mp-bg {
  max-width: 500px;
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