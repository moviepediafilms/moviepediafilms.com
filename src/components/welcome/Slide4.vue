<template>
  <div
    style="background-image: url('/img/4_bg.png')"
    class="q-px-lg q-mt-lg q-py-lg mp-bg"
  >
    <bar />
    <div class="mp-title2 q-mt-lg text-weight-bold text-primary">
      What's in it for you?
    </div>
    <div class="mp-title2 q-mt-md text-weight-bold">CURATORS</div>
    <div class="q-mt-md mp-subtitle text-grey-4">
      Moviepedia Films is a platform that bridges the gap between the creators
      and their audience. We consider curation is also an art and on our
      platform, the curators get to recommend films and they get rewarded for
      their eye for good content.
    </div>
    <div class="row q-col-gutter-md q-mt-md">
      <circular-item
        :title="item.title"
        :desc="item.desc"
        :icon="item.icon"
        :key="index"
        v-for="(item, index) in items"
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
          title: "Win Exclusive Giveaways",
          desc: "Curator of the Month Title",
          icon: "mdi-trophy",
        },
        {
          title: "Be the Jury",
          desc: "Rate & Review Films",
          icon: "mdi-checkbox-multiple-marked-outline",
        },
        {
          title: "Recommend",
          desc: "good content and win rewards",
          icon: "mdi-bullhorn",
        },
        {
          title: "Recognition",
          desc: "focussed profiling",
          icon: "mdi-domino-mask",
        },
        {
          title: "Curate",
          desc: "list and maintain your film journal",
          icon: "mdi-playlist-star",
        },
        {
          title: "Build Network",
          desc: "and share the love for cinema",
          icon: "mdi-account-group",
        },
      ],
    };
  },
  computed: {},
  mounted() {},
};
</script>