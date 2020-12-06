<template>
  <div
    style="background-image: url('/img/1_bg.png')"
    class="text-center mp-bg text-grey-3"
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
    <div class="q-mt-md mp-subtitle q-px-md">
      Join us in our journey to create a film-first community thinking led by
    </div>
    <q-icon name="mdi-badge-outline"></q-icon>
    <div class="row q-mt-md">
      <div class="col">
        <q-btn
          round
          to="#creators"
          color="primary"
          text-color="dark"
          icon="mdi-movie-open-outline"
          size="lg"
        />
        <div class="mp-subtitle q-mt-md">Creators</div>
      </div>
      <div class="col">
        <q-btn
          round
          to="#curators"
          color="primary"
          text-color="dark"
          icon="mdi-bullhorn"
          size="lg"
        />

        <div class="mp-subtitle q-mt-md">Curators</div>
      </div>
      <div class="col">
        <q-btn
          round
          to="#celebrities"
          color="primary"
          text-color="dark"
          icon="mdi-star"
          size="lg"
        />

        <div class="mp-subtitle q-mt-md">Celebrities</div>
      </div>
    </div>
    <div class="q-mt-lg">
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
          :to="{ name: 'submit' }"
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
    return {};
  },
  computed: {},
  mounted() {
    setTimeout(this.add_animation, 100);
  },
  methods: {
    add_animation() {
      // this.$gsap.to(this.monthly_cash, {
      //   duration: 0.8,
      //   val: this.monthly_cash.total,
      // });
    },
  },
};
</script>