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
          :bar-style="barStyle"
          horizontal
          style="height: 205px"
        >
          <div class="q-pr-md row no-wrap">
            <q-card
              class="my-card q-ma-md"
              style="width: 230px"
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
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#f7cd23",
        width: "10px",
        opacity: 0.75,
      },
      barStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "#f7cd23",
        opacity: 0.2,
      },
      categories: [
        {
          name: "Today's Releases",
          items: [
            {
              id: 1,
              image:
                "https://res.cloudinary.com/moviepedia/image/upload/w_380,h_270/v1600784051/movie_thumbs/movie_15_e6i6th.jpg",
            },
            {
              id: 2,
              image:
                "https://res.cloudinary.com/moviepedia/image/upload/w_380,h_270/v1600784051/movie_thumbs/movie_14_um32ao.jpg",
            },
            {
              id: 3,
              image:
                "https://res.cloudinary.com/moviepedia/image/upload/w_380,h_270/v1600784051/movie_thumbs/movie_13_ripwxl.jpg",
            },
            {
              id: 4,
              image:
                "https://res.cloudinary.com/moviepedia/image/upload/w_380,h_270/v1600784051/movie_thumbs/movie_10_kpupgd.jpg",
            },
            {
              id: 5,
              image:
                "https://res.cloudinary.com/moviepedia/image/upload/w_380,h_270/v1600784050/movie_thumbs/movie_11_gzerr3.jpg",
            },
          ],
        },
        {
          name: "Celeb Recommends",
          items: [
            {
              id: 1,
              image:
                "https://res.cloudinary.com/moviepedia/image/upload/w_380,h_270/v1600785908/judges_thumbs/20200922_201207_0000_t2rtbd.png",
            },
            {
              id: 2,
              image:
                "https://res.cloudinary.com/moviepedia/image/upload/w_380,h_270/v1600784097/judges_thumbs/20200922_182607_0000_dwlpn2.png",
            },
            {
              id: 3,
              image:
                "https://res.cloudinary.com/moviepedia/image/upload/w_380,h_270/v1600784095/judges_thumbs/20200922_182642_0000_ispwzr.png",
            },
            {
              id: 4,
              image:
                "https://res.cloudinary.com/moviepedia/image/upload/w_380,h_270/v1600784095/judges_thumbs/20200922_182626_0000_osijza.png",
            },
          ],
        },
        {
          name: "Trending This Week",
          items: [
            {
              id: 1,
              image:
                "https://res.cloudinary.com/moviepedia/image/upload/w_380,h_270/v1600784050/movie_thumbs/movie_12_vfcqeg.jpg",
            },
            {
              id: 2,
              image:
                "https://res.cloudinary.com/moviepedia/image/upload/w_380,h_270/v1600784050/movie_thumbs/movie_8_q9rj5y.jpg",
            },
            {
              id: 3,
              image:
                "https://res.cloudinary.com/moviepedia/image/upload/w_380,h_270/v1600784050/movie_thumbs/movie_9_prks71.jpg",
            },
            {
              id: 4,
              image:
                "https://res.cloudinary.com/moviepedia/image/upload/w_380,h_270/v1600784050/movie_thumbs/movie_7_f6pq48.jpg",
            },
            {
              id: 5,
              image:
                "https://res.cloudinary.com/moviepedia/image/upload/w_380,h_270/v1600784050/movie_thumbs/movie_4_ifasom.jpg",
            },
          ],
        },
        {
          name: "Award Winning Shorts",
          items: [
            {
              id: 6,
              image:
                "https://res.cloudinary.com/moviepedia/image/upload/w_380,h_270/v1600784050/movie_thumbs/movie_6_c3msbn.jpg",
            },
            {
              id: 7,
              image:
                "https://res.cloudinary.com/moviepedia/image/upload/w_380,h_270/v1600784050/movie_thumbs/movie_3_gvj11y.jpg",
            },
            {
              id: 8,
              image:
                "https://res.cloudinary.com/moviepedia/image/upload/w_380,h_270/v1600784049/movie_thumbs/movie_1_yylabx.jpg",
            },
            {
              id: 1,
              image:
                "https://res.cloudinary.com/moviepedia/image/upload/w_380,h_270/v1600784049/movie_thumbs/movie_5_flas1c.jpg",
            },
            {
              id: 2,
              image:
                "https://res.cloudinary.com/moviepedia/image/upload/w_380,h_270/v1600784049/movie_thumbs/movie_2_vw6fbq.jpg",
            },
          ],
        },
      ],
    };
  },
  mounted() {
    this.action_btns.forEach((btn) => {
      setting.addActionBtn(btn);
    });
  },
  beforeDestroy() {
    this.action_btns.forEach((btn) => {
      setting.removeActionBtn(btn);
    });
  },
  methods: {
    detail_page(movie) {
      this.$router.push({ name: "movie-detail", params: { id: movie.id } });
    },
    show_filters() {
      this.show_filter = !this.show_filter;
    },
    clear_filters() {
      this.selected_filters.time.splice(0, this.selected_filters.time.length);
      this.selected_filters.genre.splice(0, this.selected_filters.genre.length);
      this.selected_filters.lang.splice(0, this.selected_filters.lang.length);
    },
  },
};
</script>
<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 300px;
}
</style>