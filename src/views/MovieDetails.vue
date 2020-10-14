<template>
  <base-layout>
    <div class="q-pa-lg" v-swipe="swipe" ref="content">
      <div class="row">
        <div class="col-12">
          <div class="text-h5 text-primary q-mb-sm">{{ movie.title }}</div>
          <div class>by {{ director.name }}</div>
          <div class>Genre: {{ genre }}</div>
          <div class>Runtime: {{ movie.runtime }} Minutes</div>
        </div>
        <div class="col-12 q-mt-lg">
          <q-responsive :ratio="16 / 9" class="col">
            <iframe :src="movie.link" frameborder="0" allowfullscreen />
          </q-responsive>
        </div>
        <div class="col-12">
          <div class="row justify-around q-mt-sm">
            <q-btn
              flat
              size="sm"
              color="primary"
              icon="mdi-share-variant-outline"
              label="share"
            />
            <q-btn
              flat
              size="sm"
              color="primary"
              icon="mdi-plus"
              label="watchlist"
            />
            <q-btn
              flat
              size="sm"
              color="primary"
              icon="mdi-cards-heart"
              label="Recommend"
            />
          </div>
          <div class="row items-center q-mt-md">
            <div class="text-caption">Rate the movie</div>
          </div>
          <div class="row items-center q-mt-md">
            <div clss="col">
              <q-icon
                size="48px"
                color="primary"
                name="mdi-emoticon-sad-outline"
              />
            </div>
            <div class="col q-mx-sm">
              <q-slider
                v-model="rating"
                :min="0"
                :max="10"
                :step="1"
                label
                label-text-color="black"
                snap
                style="display: inline-block"
              />
            </div>
            <div clss="col">
              <q-icon
                size="48px"
                color="primary"
                name="mdi-emoticon-excited-outline"
              />
            </div>
          </div>
          <div class="row q-mt-lg">{{ movie.synopsis }}</div>
          <div class="row q-mt-lg">
            <div class="col">
              <vue-easy-pie-chart
                :bar-color="'#00C851'"
                :track-color="'#212121'"
                :scale-length="0"
                :line-width="7"
                :line-cap="'round'"
                :percent="movie.jury_rating * 10"
              >
                <span class="text-h6 rating-text"
                  >{{ movie.jury_rating }}/10</span
                >
              </vue-easy-pie-chart>
              <div class="q-mt-md text-center">Jury Rating</div>
            </div>
            <div class="col">
              <vue-easy-pie-chart
                :bar-color="'#ffc221'"
                :track-color="'#212121'"
                :scale-length="0"
                :line-width="7"
                :line-cap="'round'"
                :percent="movie.audience_rating * 10"
              >
                <span class="text-h6 rating-text"
                  >{{ movie.audience_rating }}/10</span
                >
              </vue-easy-pie-chart>
              <div class="q-mt-md text-center">Audience Rating</div>
            </div>
          </div>
          <div class="row q-mt-lg justify-around">
            <q-btn outline color="primary" class="q-mr-md">Write Review</q-btn>
            <q-btn outline color="primary">Play And Win</q-btn>
          </div>
          <div class="row q-mt-lg">
            <div class="col">
              <div class="text-uppercase text-primary text-weight-bold">
                Recent Reviews
              </div>
              <q-list
                separator
                light
                v-if="reviews"
                style="max-height: 400px; overflow-y: scroll"
                ref="reviews"
              >
                <q-infinite-scroll
                  @load="load_more_review"
                  :scroll-target="$refs.reviews"
                  ref="reviews_is"
                >
                  <q-item v-for="review in reviews" :key="review.id" class="">
                    <q-item-section>
                      <q-item-label>
                        <div class="text-primary">{{ review.author.name }}</div>
                      </q-item-label>
                      <q-item-label caption>
                        <div class="q-mt-xs">{{ review.content }}</div>
                      </q-item-label>
                      <q-item-label caption>
                        <div class="text-right q-mt-xs">
                          <span class="q-mr-md">
                            <q-btn
                              round
                              flat
                              icon="mdi-thumb-up"
                              size="xs"
                            ></q-btn>
                            {{ review.liked }}</span
                          >
                          <span class="self-center">
                            {{ from_now(review.timestamp) }}
                          </span>
                        </div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <template v-slot:loading>
                    <div class="row justify-center q-my-md">
                      <q-spinner-dots color="primary" size="40px" />
                    </div>
                  </template>
                </q-infinite-scroll>
              </q-list>
            </div>
          </div>
        </div>
      </div>
    </div>
  </base-layout>
</template>
<script>
import moment from "moment";
import VueEasyPieChart from "vue-easy-pie-chart";
import "vue-easy-pie-chart/dist/vue-easy-pie-chart.css";
import BaseLayout from "@/layouts/Base";
import { movie_service, review_service } from "@/services";
export default {
  name: "detail-page",
  components: {
    BaseLayout,
    VueEasyPieChart,
  },
  metaInfo: {
    title: "Home",
  },
  data() {
    return {
      rating: 0,
      review_page_size: 2,
      reviews: [],
      movie: {
        audience_rating: 0,
        jury_rating: 0,
        genre: [],
        runtime: "12",
        title: "",
        link: "",
        // recommended_by: [
        //   {
        //     name: "Varun Grover",
        //   },
        // ],
        // about:
        //   "The protagonist is seen to explore unusual activities while floating",
        reviews: [
          {
            timestamp: "2020-09-20T15:45:42.478Z",
            author: {
              name: "Rahul Sharma",
            },
            id: 1,
            content:
              "A great movie. by Arjun (Gold level) Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
          },
          {
            timestamp: "2020-09-20T15:45:42.478Z",
            author: {
              name: "Rahul Sharma",
            },
            id: 2,
            content:
              "A great movie. by Arjun (Gold level2) Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
          },
          {
            timestamp: "2020-09-20T15:45:42.478Z",
            author: {
              name: "Rahul Sharma",
            },
            id: 3,
            content:
              "A great movie. by Arjun (Gold level3) Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
          },
          {
            timestamp: "2020-09-20T15:45:42.478Z",
            author: {
              name: "Rahul Sharma",
            },
            id: 4,
            content: "A great movie. by Arjun (Gold level4)",
          },
        ],
      },
    };
  },
  watch: {
    movie_id() {
      this.load_data();
    },
  },
  computed: {
    genre() {
      var genre_names = [];
      if (this.movie && this.movie.genres)
        this.movie.genres.forEach((genre) => {
          genre_names.push(genre.name);
        });
      return genre_names.join(", ");
    },
    director() {
      var director = {};
      if (this.movie && this.movie.crew)
        this.movie.crew.forEach((crew) => {
          if (crew.roles)
            crew.roles.forEach((role) => {
              if (role.name === "Director") director = crew.profile;
            });
        });
      return director;
    },
    movie_id() {
      return this.$route.params.id;
    },
  },
  mounted() {
    console.log(this.$route.params.id);
    this.load_data();
  },
  methods: {
    load_data() {
      this.fetch_movie();
      // this.fetch_reviews();
      this.$refs.reviews_is.trigger();
    },
    swipe(event) {
      // 0 = none, 2 = left, 4 = right, 8 = up, 16 = down
      console.log("someone swiped", event.direction);
    },
    from_now(datetime) {
      return moment(datetime).fromNow();
    },
    fetch_movie() {
      movie_service
        .get({}, this.movie_id)
        .then((movie) => {
          console.log(movie);
          this.movie = movie;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetch_reviews() {
      review_service
        .get({ movie__id: this.movie_id })
        .then((body) => {
          console.log(body);
          this.reviews.push(...body.results);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    load_more_review(index, done) {
      console.log("loading next set of reviews", index);
      review_service
        .get({ offset: this.reviews.length, limit: this.review_page_size })
        .then((data) => {
          if (data.results.length) {
            this.reviews.push(...data.results);
            done();
          } else {
            done(true);
          }
        })
        .catch((error) => {
          console.log(error);
          done();
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.rating-text {
  color: #7f7f7f;
}
</style>