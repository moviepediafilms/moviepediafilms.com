<template>
  <base-layout>
    <div class="q-ma-md text-center">
      <h3 class="text-primary text-weight-light q-mb-xs">Top Curators</h3>

      <div class="row q-mt-sm q-col-gutter-md justify-center">
        <div
          v-for="creator in creators"
          :key="creator.id"
          class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-2"
          style="display: inline-block"
        >
          <div class="">
            <q-avatar
              color="white"
              size="100px"
              @click.prevent="open_profile(creator)"
            >
              <img :src="creator.image" />
            </q-avatar>
            <div class="text-h6 q-mt-md text-primary">
              {{ creator.pop_score }}
            </div>
            <div class="text-weight-bold text-subtitle1 ellipsis">
              {{ creator.name }}
            </div>
            <!-- <div class="text-caption text-primary">{{ creator.pop_score }}</div> -->
          </div>
        </div>
      </div>
    </div>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/Base";
export default {
  name: "top-curator-page",
  components: {
    BaseLayout,
  },
  metaInfo: {
    title: "Top Curators",
  },
  data() {
    return {
      creators: [],
      sorted_creators: [],
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
        // `https://res.cloudinary.com/moviepedia/image/upload/${size}/v1600972826/avatars/neutral_uik7av.png`,
        `https://res.cloudinary.com/moviepedia/image/upload/${size}/v1600972826/avatars/male2_ioz3nb.png`,
        `https://res.cloudinary.com/moviepedia/image/upload/${size}/v1600972826/avatars/male3_r8xkgb.png`,
        // `https://res.cloudinary.com/moviepedia/image/upload/${size}/v1600972825/avatars/female2_k1ste4.png`,
        `https://res.cloudinary.com/moviepedia/image/upload/${size}/v1600972825/avatars/male_nam8xo.png`,
        // `https://res.cloudinary.com/moviepedia/image/upload/${size}/v1600972825/avatars/female1_tvzgya.png`,
        // `https://res.cloudinary.com/moviepedia/image/upload/${size}/v1600972825/avatars/female4_hg2nvm.png`,
        // `https://res.cloudinary.com/moviepedia/image/upload/${size}/v1600972825/avatars/female_w7jycr.png`,
        // `https://res.cloudinary.com/moviepedia/image/upload/${size}/v1600972825/avatars/female3_aiuwgu.png`,
      ];
      var rand_idx = Math.floor(Math.random() * avatars.length);
      return avatars[rand_idx];
    },
    get_random_pop_score() {
      var MAX_SCORE = 10000;
      return Math.floor(Math.random() * MAX_SCORE + 1);
    },
    get_random_name() {
      var first_names = [
        "Rahul",
        "Shivam",
        "Durbar",
        "Pankaj",
        "Rohit",
        "Vyom",
        "Ravi",
        "Parmesh",
        "Roshan",
        "Monomay",
      ];
      var last_names = [
        "Kumar",
        "Sharma",
        "Sengupta",
        "Srivastava",
        "Kapoor",
        "Mishra",
        "Pandey",
        "Karmakar",
      ];
      var first_idx = Math.floor(Math.random() * first_names.length);
      var last_idx = Math.floor(Math.random() * last_names.length);
      return `${first_names[first_idx]} ${last_names[last_idx]}`;
    },
    open_profile(creator) {
      this.$router.push({ name: "profile", params: { id: creator.id } });
    },
    fetch_creators() {
      this.creators = [];
      for (var i = 0; i < 10; i++) {
        this.creators.push({
          id: i,
          image: this.get_rand_avatar(),
          name: this.get_random_name(),
          pop_score: this.get_random_pop_score(),
        });
      }
      // reverse sort by popularity score
      this.creators.sort((f, s) => {
        return s.pop_score - f.pop_score;
      });
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