<template>
  <base-layout>
    <div class="q-pa-lg">
      <div class="row">
        <div class="col-12">
          <div class="text-h5">{{movie.name}}</div>
          <div class>by {{movie.director}}</div>
          <div class>Genre: {{movie.genre}}</div>
          <div class>Runtime: {{movie.runtime}}</div>
        </div>
        <div class="col-12 q-mt-lg">
          <q-responsive :ratio="16/9" class="col">
            <iframe
              src="https://www.youtube.com/embed/Wfd3cO2gVHE"
              frameborder="0"
              allowfullscreen
            />
          </q-responsive>
        </div>
        <div class="col-12">
          <div class="row justify-around q-mt-sm">
            <q-btn flat size="sm" color="primary" icon="mdi-share-variant-outline" label="share" />
            <q-btn flat size="sm" color="primary" icon="mdi-plus" label="watchlist" />
            <q-btn flat size="sm" color="primary" icon="mdi-bookmark" label="Bookmark" />
          </div>
          <div class="row items-center q-mt-md">
            <div clss="col">
              <q-icon size="48px" color="primary" name="mdi-emoticon-sad-outline" />
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
              <q-icon size="48px" color="primary" name="mdi-emoticon-excited-outline" />
            </div>
          </div>

          <div class="row q-mt-lg">{{movie.synopsis}}</div>
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
                <span class="text-h6 rating-text">{{movie.jury_rating}}/10</span>
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
                <span class="text-h6 rating-text">{{movie.audience_rating}}/10</span>
              </vue-easy-pie-chart>
              <div class="q-mt-md text-center">Audience Rating</div>
            </div>
          </div>
          <div class="row q-mt-lg">
            <div class="col">
              <div class="text-uppercase text-primary text-weight-bold">Recent Reviews</div>
              <q-list separator padding>
                <q-item v-for="review in movie.reviews" :key="review.id">
                  <q-item-section class="q-ma-sm">
                    <q-item-label>
                      <div class="text-primary">{{review.author.name}}</div>
                    </q-item-label>
                    <q-item-label caption>
                      <div class="q-mt-sm">{{review.content}}</div>
                    </q-item-label>
                    <q-item-label caption>
                      <div class="text-right q-mt-sm">{{from_now(review.timestamp)}}</div>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
          <div class="row q-mt-lg justify-around">
            <q-btn color="primary" text-color="dark" class="q-mr-md">Write Review</q-btn>
            <q-btn color="primary" text-color="dark">Play And Win</q-btn>
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
      movie: {
        audience_rating: 4.5,
        jury_rating: 7.5,
        genre: "Sci-Fi",
        runtime: "12 Minutes",
        name: "Headline 1",
        director: "Rohan S",
        video: "google.com",
        recommended_by: [
          {
            name: "Varun Grover",
          },
        ],
        synopsis:
          "The protagonist is seen to explore unusual activities while floating",
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
  methods: {
    from_now(datetime) {
      return moment(datetime).fromNow();
    },
  },
};
</script>
<style lang="scss" scoped>
.rating-text {
  color: #7f7f7f;
}
</style>