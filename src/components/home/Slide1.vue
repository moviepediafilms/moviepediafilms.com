<template>
  <div style="background-image: url('/img/1_bg.png')" class="text-center mp-bg">
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
            <div style="line-height: 1" class="text-right q-pr-sm">Film</div>
          </div>
        </q-btn>
      </transition>
    </div>
    <play-x3-bar />
  </div>
</template>
<script>
import BarPlus from "@/components/style/BarPlus";
import PlayX3Bar from "@/components/style/PlayX3Bar";
export default {
  components: {
    BarPlus,
    PlayX3Bar,
  },

  data() {
    return {
      monthly_cash: {
        val: 0,
        total: 30000,
      },
    };
  },
  computed: {
    animated_monthly_cash() {
      return new Intl.NumberFormat().format(this.monthly_cash.val.toFixed(0));
    },
  },
  mounted() {
    this.$gsap.to(this.monthly_cash, {
      duration: 0.8,
      val: this.monthly_cash.total,
    });
  },
};
</script>