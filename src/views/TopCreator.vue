<template>
  <base-layout>
    <div class="q-ma-md text-center">
      <h3 class="text-primary text-weight-light q-mb-xs">Top Creators</h3>
      <div class="row justify-around">
        <transition-group appear name="slide">
          <div
            v-for="(creator, pos) in creators"
            :key="creator.id"
            style="display: inline-block"
            class="q-mt-lg q-mx-lg"
          >
            <q-avatar
              size="120px"
              :color="get_level_color(creator.level)"
              @click.prevent="open_profile(creator)"
            >
              <img :src="creator.image" />
            </q-avatar>
            <div class="text-h3 q-mt-sm">#{{ pos + 1 }}</div>
            <div class="q-mt-sm">
              <div class="text-weight-bold text-subtitle1">
                <q-badge
                  :color="get_level_color(creator.level)"
                  align="middle"
                  >{{ creator.level }}</q-badge
                >
                {{ creator.name }}
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/Base";
export default {
  name: "top-creator-page",
  components: {
    BaseLayout,
  },
  metaInfo: {
    title: "Top Creators",
  },
  data() {
    return {
      creators: [],
    };
  },
  mounted() {
    this.fetch_creators();
  },
  methods: {
    get_rand_avatar(height, width) {
      if (!height) height = 400;
      if (!width) width = 400;
      var size = `h_${height},w_${width}`;

      var avatars = [
        `https://res.cloudinary.com/moviepedia/image/upload/${size}/v1600972826/avatars/male4_mnxpb7.png`,
        `https://res.cloudinary.com/moviepedia/image/upload/${size}/v1600972826/avatars/male1_nicpgf.png`,
        `https://res.cloudinary.com/moviepedia/image/upload/${size}/v1600972826/avatars/neutral_uik7av.png`,
        `https://res.cloudinary.com/moviepedia/image/upload/${size}/v1600972826/avatars/male2_ioz3nb.png`,
        `https://res.cloudinary.com/moviepedia/image/upload/${size}/v1600972826/avatars/male3_r8xkgb.png`,
        `https://res.cloudinary.com/moviepedia/image/upload/${size}/v1600972825/avatars/female2_k1ste4.png`,
        `https://res.cloudinary.com/moviepedia/image/upload/${size}/v1600972825/avatars/male_nam8xo.png`,
        `https://res.cloudinary.com/moviepedia/image/upload/${size}/v1600972825/avatars/female1_tvzgya.png`,
        `https://res.cloudinary.com/moviepedia/image/upload/${size}/v1600972825/avatars/female4_hg2nvm.png`,
        `https://res.cloudinary.com/moviepedia/image/upload/${size}/v1600972825/avatars/female_w7jycr.png`,
        `https://res.cloudinary.com/moviepedia/image/upload/${size}/v1600972825/avatars/female3_aiuwgu.png`,
      ];
      var rand_idx = Math.floor(Math.random() * avatars.length);
      return avatars[rand_idx];
    },
    get_random_level() {
      return Math.floor(Math.random() * 4 + 1);
    },
    get_level_color(level) {
      return { 1: "red", 2: "orange", 3: "primary", 4: "green" }[level];
    },
    open_profile(creator) {
      this.$router.push({ name: "profile", params: { id: creator.id } });
    },
    fetch_creators() {
      this.creators = [
        {
          id: 1,
          image: this.get_rand_avatar(),
          name: "Rahul Sharma",
          level: this.get_random_level(),
        },
        {
          id: 2,
          image: this.get_rand_avatar(),
          name: "Pankaj Yadav",
          level: this.get_random_level(),
        },
        {
          id: 3,
          image: this.get_rand_avatar(),
          name: "Pankaj Yadav",
          level: this.get_random_level(),
        },
        {
          id: 4,
          image: this.get_rand_avatar(),
          name: "Pankaj Yadav",
          level: this.get_random_level(),
        },
        {
          id: 5,
          image: this.get_rand_avatar(),
          name: "Pankaj Yadav",
          level: this.get_random_level(),
        },
        {
          id: 6,
          image: this.get_rand_avatar(),
          name: "Pankaj Yadav",
          level: this.get_random_level(),
        },
        {
          id: 7,
          image: this.get_rand_avatar(),
          name: "Pankaj Yadav",
          level: this.get_random_level(),
        },
        {
          id: 8,
          image: this.get_rand_avatar(),
          name: "Pankaj Yadav",
          level: this.get_random_level(),
        },
        {
          id: 9,
          image: this.get_rand_avatar(),
          name: "Pankaj Yadav",
          level: this.get_random_level(),
        },
        {
          id: 10,
          image: this.get_rand_avatar(),
          name: "Pankaj Yadav",
          level: this.get_random_level(),
        },
        {
          id: 11,
          image: this.get_rand_avatar(),
          name: "Pankaj Yadav",
          level: this.get_random_level(),
        },
        {
          id: 12,
          image: this.get_rand_avatar(),
          name: "Pankaj Yadav",
          level: this.get_random_level(),
        },
      ];
    },
  },
};
</script>
<style lang="scss" scoped>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-enter-active {
  transition: all 0.3s ease;
}
.slide-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-enter, .slide-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(30px);
  opacity: 0;
}
</style>