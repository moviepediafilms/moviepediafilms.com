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
          <div class="video">
            <iframe
              src="https://www.youtube.com/embed/Wfd3cO2gVHE"
              frameborder="0"
              allowfullscreen
            />
          </div>
        </div>
        <div class="col-12">
          <div class="row items-center">
            <div clss="col">
              <q-icon name="fas fa-thumbs-down" />
            </div>
            <div class="col q-mx-md">
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
              <q-icon name="fas fa-thumbs-up" />
            </div>
          </div>
          <div class="row justify-around">
            <q-btn round color="primary" text-color="dark" icon="fa fa-share" />

            <q-btn round color="primary" text-color="dark" icon="fa fa-plus" />

            <q-btn round color="primary" text-color="dark" icon="fa fa-bookmark" />
          </div>
          <div class="row q-mt-lg">{{movie.synopsis}}</div>
          <div class="row">
            <div class="col">
              <vue-easy-pie-chart :percent="30"></vue-easy-pie-chart>
            </div>
            <div class="col">
              <vue-easy-pie-chart :percent="60"></vue-easy-pie-chart>
            </div>
          </div>
          <div class="row"></div>
        </div>
      </div>
    </div>
  </base-layout>
</template>
<script>
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
            content: "A great movie.’ by Arjun (Gold level)",
          },
          {
            content: "A great movie.’ by Arjun (Gold level2)",
          },
          {
            content: "A great movie.’ by Arjun (Gold level3)",
          },
          {
            content: "A great movie.’ by Arjun (Gold level4)",
          },
        ],
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.video {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  padding-top: 25px;
  height: 0;
}
.video iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>