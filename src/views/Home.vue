<template>
  <base-layout>
    <div class="q-ma-sm">
      <q-dialog v-model="show_filter">
        <q-card>
          <q-card-section>
            <div class="text-h5 text-center">Filters</div>
          </q-card-section>
          <q-card-section>
            <div class="row">
              <div class="col">
                <div class="text-center text-primary">Genre</div>
                <div class="q-mt-sm">
                  <q-checkbox
                    :val="genre.val"
                    v-model="selected_filters.genre"
                    :label="genre.label"
                    v-for="genre in filters.genre"
                    :key="genre.val"
                  />
                </div>
              </div>
              <div class="col">
                <div class="text-center text-primary">Langugage</div>
                <div class="q-mt-sm">
                  <q-checkbox
                    :val="lang.val"
                    v-model="selected_filters.lang"
                    :label="lang.label"
                    v-for="lang in filters.lang"
                    :key="lang.val"
                  />
                </div>
              </div>
              <div class="col">
                <div class="text-center text-primary">Time</div>
                <div class="q-mt-sm">
                  <q-checkbox
                    :val="time.val"
                    v-model="selected_filters.time"
                    :label="time.label"
                    v-for="time in filters.time"
                    :key="time.val"
                  />
                </div>
              </div>
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Apply" color="primary" v-close-popup />
            <q-btn
              flat
              label="Clear"
              color="primary"
              @click.prevent="clear_filters"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <div v-for="cat in categories" :key="cat.name">
        <div class="q-pa-md row">
          <h6>{{ cat.name }}</h6>
        </div>
        <q-scroll-area
          :thumb-style="thumbStyle"
          horizontal
          visible
          :style="`height: ${cat.height + 10}px`"
          class="q-mb-md"
        >
          <div class="q-pr-md row no-wrap">
            <q-card
              class="my-card q-mr-sm"
              :style="`width: ${cat.width}px`"
              v-for="item in cat.items"
              :key="item.id"
              @click.prevent="detail_page(item)"
            >
              <img :src="item.image" />
            </q-card>
          </div>
        </q-scroll-area>
      </div>
    </div>
  </base-layout>
</template>
<script>
import setting from "@/setting";
import BaseLayout from "@/layouts/Base";
export default {
  name: "home-page",
  components: {
    BaseLayout,
  },
  metaInfo: {
    title: "Home",
  },
  data() {
    return {
      selected_filters: { time: [], genre: [], lang: [] },
      filters: {
        lang: [
          { label: "English", val: "eng" },
          { label: "Hindi", val: "hin" },
          { label: "Tamil", val: "tamil" },
          { label: "Bengali", val: "ban" },
        ],
        time: [
          { label: "Live", val: "live" },
          { label: "Last Week", val: "week" },
          { label: "Last Month", val: "month" },
        ],
        genre: [
          { label: "Crime", val: "crime" },
          { label: "Drama", val: "drama" },
          { label: "Romance", val: "romance" },
          { label: "Comedy", val: "comedy" },
        ],
      },
      show_filter: false,
      action_btns: [
        { icon: "mdi-filter-outline", to: this.show_filters, type: "dialog" },
      ],
      slide: "",
      thumbStyle: {
        right: "2px",
        borderRadius: "1px",
        backgroundColor: "#f7cd23",
        opacity: 0.75,
        height: "2px",
      },
      categories: [],
    };
  },
  mounted() {
    this.action_btns.forEach((btn) => {
      setting.addActionBtn(btn);
    });
    this.initial_fetch_categories();
  },
  beforeDestroy() {
    this.action_btns.forEach((btn) => {
      setting.removeActionBtn(btn);
    });
  },
  methods: {
    detail_page(movie) {
      var movie_id = movie.id;
      movie_id = 1;
      this.$router.push({
        name: "movie-detail",
        params: { id: movie_id, slug: this.slugify(movie.title) },
      });
    },
    show_filters() {
      this.show_filter = !this.show_filter;
    },
    clear_filters() {
      this.selected_filters.time.splice(0, this.selected_filters.time.length);
      this.selected_filters.genre.splice(0, this.selected_filters.genre.length);
      this.selected_filters.lang.splice(0, this.selected_filters.lang.length);
    },
    get_rand_poster(num, orientation, trans_query) {
      // num => int: 5, 10
      // orientation => string: 'port' or 'land'
      // trans_query => string: cloudinary resize query "w_250,h_200"
      const MAX_MOVIE_ID = 51;
      var urls = [];
      var rand_id = 0;
      var generated_ids = [];
      while (generated_ids.length < num) {
        rand_id = Math.floor(Math.random() * MAX_MOVIE_ID + 1);
        if (generated_ids.indexOf(rand_id) == -1) {
          generated_ids.push(rand_id);
          urls.push(
            `https://res.cloudinary.com/moviepedia/image/upload/${trans_query}/v1601209839/movie_thumbs/${orientation}/movie${rand_id}.jpg`
          );
        }
      }
      return urls;
    },
    get_rand_movie_items(num, orientation, trans_query) {
      // num => int: 5, 10
      // orientation => string: 'port' or 'land'
      // trans_query => string: cloudinary resize query "w_250,h_200"
      var items = [];
      var urls = this.get_rand_poster(num, orientation, trans_query);
      urls.forEach((url, i) => {
        items.push({
          id: i,
          title: "30 Days of Existence | A Moviepedia Short Film on Depression",
          image: url,
        });
      });
      return items;
    },
    initial_fetch_categories() {
      var cel_thumb_dimen = "w_260,h_180";
      // var thumb_dimen = "w_200,h_300";

      this.categories = [
        {
          name: "Today's Releases",
          height: 150,
          width: 100,
          items: this.get_rand_movie_items(10, "port", "w_200,h_300"),
        },
        {
          name: "Celeb Recommends",
          height: 100,
          width: 150,
          items: [
            {
              id: 1,
              image: `https://res.cloudinary.com/moviepedia/image/upload/${cel_thumb_dimen}/v1600785908/judges_thumbs/20200922_201207_0000_t2rtbd.png`,
            },
            {
              id: 2,
              image: `https://res.cloudinary.com/moviepedia/image/upload/${cel_thumb_dimen}/v1600784097/judges_thumbs/20200922_182607_0000_dwlpn2.png`,
            },
            {
              id: 3,
              image: `https://res.cloudinary.com/moviepedia/image/upload/${cel_thumb_dimen}/v1600784095/judges_thumbs/20200922_182642_0000_ispwzr.png`,
            },
            {
              id: 4,
              image: `https://res.cloudinary.com/moviepedia/image/upload/${cel_thumb_dimen}/v1600784095/judges_thumbs/20200922_182626_0000_osijza.png`,
            },
          ],
        },
        {
          name: "Trending This Week",
          height: 150,
          width: 100,
          items: this.get_rand_movie_items(10, "port", "w_200,h_300"),
        },
        {
          name: "Award Winning Shorts",
          height: 150,
          width: 100,
          items: this.get_rand_movie_items(10, "port", "w_200,h_300"),
        },
      ];
    },
  },
};
</script>
<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 300px;
  :hover {
    background-color: blue;
  }
}
</style>