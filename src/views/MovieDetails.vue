<template>
  <base-layout>
    <div v-swipe="swipe" ref="content">
      <div class="q-pa-xs">
        <q-responsive :ratio="16 / 9" class="col">
          <iframe :src="movie.link" frameborder="0" allowfullscreen />
        </q-responsive>
      </div>
      <div class="q-px-md q-pb-md">
        <div class="row">
          <div class="col-12">
            <div class="text-body1 text-primary">
              {{ movie.title }}
            </div>
            <div class="row justify-between no-wrap">
              <div class="ellipsis text-grey-6 text-caption">
                <q-icon name="mdi-tag" class="q-mr-xs" />
                <template v-for="(genre, index) in top_movie_genres">
                  <router-link
                    class="text-decoration-none text-grey-6"
                    :to="{
                      name: 'movies-by-genre',
                      params: { genre: genre.name },
                    }"
                    :key="genre.id"
                  >
                    {{ genre.name }}
                  </router-link>
                  <template v-if="index < top_movie_genres.length - 1"
                    ><span :key="genre.id + '_'">, </span></template
                  >
                </template>
              </div>
              <div class="text-grey-6 text-caption">
                <q-icon name="mdi-projector-screen" /> in Jan 2020
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="row q-mt-sm">
              <q-btn-group flat spread style="width: 100%">
                <q-btn size="sm" flat @click="on_share">
                  <div>
                    <q-icon name="mdi-share" />
                    <div
                      class="text-muted q-mt-xs text-grey-6"
                      style="font-size: 8px"
                    >
                      Share
                    </div>
                  </div>
                </q-btn>
                <q-btn
                  size="sm"
                  flat
                  :color="watchlisted ? 'primary' : 'default'"
                  :loading="watchlist_loading"
                  @click="on_watchlist"
                >
                  <div>
                    <q-icon
                      :name="
                        watchlisted ? 'mdi-bookmark' : 'mdi-bookmark-outline'
                      "
                    />
                    <div
                      class="text-muted text-grey-6 q-mt-xs"
                      style="font-size: 8px"
                    >
                      Watchlist<template v-if="watchlisted">ed</template>
                    </div>
                  </div>
                </q-btn>
                <q-btn
                  size="sm"
                  flat
                  @click="on_recommend"
                  :loading="recommend_loading"
                  :color="recommended ? 'primary' : 'default'"
                >
                  <div>
                    <q-icon
                      :name="
                        recommended ? 'mdi-bullhorn' : 'mdi-bullhorn-outline'
                      "
                    />
                    <div
                      class="text-grey-6 text-muted q-mt-xs"
                      style="font-size: 8px"
                    >
                      Recommend<template v-if="recommended">ed</template>
                    </div>
                  </div>
                </q-btn>
                <q-btn
                  size="sm"
                  flat
                  @click="on_add_to_list"
                  :color="is_added_to_any_list ? 'primary' : 'default'"
                >
                  <div>
                    <q-icon
                      :name="
                        is_added_to_any_list
                          ? 'mdi-checkbox-multiple-marked'
                          : 'mdi-check-box-multiple-outline'
                      "
                    />
                    <div
                      class="text-muted text-grey-6 q-mt-xs"
                      style="font-size: 8px"
                    >
                      Save<template v-if="is_added_to_any_list">ed</template>
                    </div>
                  </div>
                </q-btn>
              </q-btn-group>
            </div>
            <div class="col-12 q-mt-sm">
              <q-expansion-item>
                <template slot="header">
                  <q-item-section avatar top>
                    <q-avatar>
                      <img :src="director.image" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>
                      <router-link
                        class="text-primary text-decoration-none"
                        :to="{ name: 'profile', id: director.id }"
                        >{{ director.name }}</router-link
                      >
                      <span class="q-mx-xs text-grey-6">&bull;</span>
                      <a
                        href="#"
                        @click.stop="follow(director)"
                        class="text-light-blue-11 text-decoration-none text-caption"
                        >Follow</a
                      >
                      <div class="text-caption text-grey-6">
                        Directed with {{ movie.crew.length - 1 }} other crew
                        member<template v-if="movie.crew.length > 2"
                          >s</template
                        >
                      </div>
                    </q-item-label>
                  </q-item-section>
                </template>
                <q-item
                  v-for="crew in crew_except_director"
                  :key="crew.profile.id"
                >
                  <q-item-section avatar top>
                    <q-avatar>
                      <img :src="crew.profile.image" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>
                      <router-link
                        class="text-primary text-decoration-none"
                        :to="{ name: 'profile', id: crew.profile.id }"
                        >{{ crew.profile.name }}</router-link
                      >
                      <div class="text-caption text-grey-6">
                        {{ join_roles(crew.roles) }}
                        &bull;
                        {{ crew.profile.id + 6 }} Followers
                      </div>
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-btn flat icon="mdi-plus" label="Follow" />
                  </q-item-section>
                </q-item>
                <q-item v-ripple>
                  <q-item-section avatar top>
                    <q-avatar color="primary">
                      <q-icon name="?" color="dark" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-primary"> Add More </q-item-label>
                    <q-item-label caption
                      >Request to add more crew members</q-item-label
                    >
                  </q-item-section>
                </q-item>
              </q-expansion-item>
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
                  ref="rating_slider"
                  :value="my_rate_review.rating"
                  :min="0"
                  :max="10"
                  :step="1"
                  @input="change_rating"
                  @change="save_rate_review"
                  :disabled="rating_loading"
                  snap
                  label-text-color="black"
                  label
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
              <q-btn
                outline
                color="primary"
                class="q-mr-md"
                @click="show_write_review_popup"
                >Write Review</q-btn
              >
            </div>
            <div class="row q-mt-lg">
              <div class="text-caption">
                Are you a crew member in this movie ? click
                <q-btn style="display: inline-block" color="primary" flat text
                  >here</q-btn
                >
              </div>
            </div>
            <div class="row q-mt-lg">
              <div class="col">
                <div
                  class="text-uppercase text-primary text-weight-bold q-mb-sm"
                >
                  Recent Reviews
                </div>
                <q-list separator light ref="reviews">
                  <q-item v-for="review in reviews" :key="review.id">
                    <q-item-section>
                      <q-item-label>
                        <div class="text-primary">
                          {{ review.author.name }}
                        </div>
                      </q-item-label>
                      <q-item-label caption>
                        <div class="q-mt-xs">{{ review.content }}</div>
                      </q-item-label>
                      <q-item-label caption>
                        <div class="text-right q-mt-xs">
                          <span class="q-mr-md" v-if="review.rating">
                            <q-icon name="mdi-star-outline" />
                            {{ review.rating }}/10
                          </span>
                          <span class="q-mr-md">
                            <q-btn
                              round
                              flat
                              icon="mdi-thumb-up"
                              @click="submit_like(review)"
                              :color="get_like_btn_color(review.liked_by)"
                              size="xs"
                            ></q-btn>
                            {{ get_like_txt(review.liked_by) }}
                          </span>
                          <span class="self-center">
                            <q-icon name="mdi-clock-outline" />
                            {{ from_now(review.published_at) }}
                          </span>
                        </div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
                <div class="text-center text-primary">
                  <q-spinner-dots v-if="loading_reviews" size="48px" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <login-required-popup
          :message="login_required_msg"
          :show="login_required"
          @hide="login_required = false"
        ></login-required-popup>

        <q-dialog
          v-model="show_review_dialog"
          ref="review_dialog"
          @hide="on_hide_write_review_popup"
        >
          <q-card style="width: 700px; max-width: 80vw">
            <q-card-section class="q-pt-none">
              <q-input
                type="textarea"
                clearable
                v-model="my_rate_review.content"
                autofocus
                :disabled="rating_loading"
                label="Your Review"
              />
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Cancel" v-close-popup />
              <q-btn flat label="Submit" @click="save_rate_review" />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="show_share_dialog">
          <q-card
            class="bg-primary text-dark"
            style="width: 700px; max-width: 80vw"
          >
            <q-card-section class="text-center q-pb-sm">
              <div class="text-body1">Share with</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <div class="row justify-center">
                <a
                  target="_blank"
                  :href="
                    'https://facebook.com/sharer/sharer.php?u=https://moviepediafilms.com/%23' +
                    $route.fullPath
                  "
                  class="text-decoration-off color-facebook q-mx-md"
                >
                  <q-icon name="mdi-facebook" size="lg" />
                </a>
                <a
                  target="_blank"
                  :href="
                    'https://twitter.com/intent/tweet?url=https://moviepediafilms.com/%23' +
                    $route.fullPath +
                    ' Check out this film I watched on Moviepedia. Absolutely loved it! 😍'
                  "
                  class="text-decoration-off color-twitter q-mx-md"
                >
                  <q-icon name="mdi-twitter" size="lg" />
                </a>
                <a
                  target="_blank"
                  :href="
                    'https://api.whatsapp.com/send?text=https://moviepediafilms.com/%23' +
                    $route.fullPath +
                    ' Check out this film I watched on Moviepedia. Absolutely loved it! 😍'
                  "
                  class="text-decoration-off color-whatsapp q-mx-md"
                >
                  <q-icon name="mdi-whatsapp" size="lg" />
                </a>
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>
        <q-dialog v-model="show_list_dialog" position="bottom" full-width>
          <q-card>
            <q-card-section class="row q-mb-none q-pb-none">
              <div class="text-caption self-center" style="text-align: center">
                Save to
              </div>
              <q-space dir="horizontal" />
              <q-btn
                class="self-right"
                color="primary"
                flat
                icon="mdi-plus"
                label="New List"
              />
            </q-card-section>
            <q-card-section class="q-mt-none q-pt-none">
              <q-list dense>
                <q-item
                  tag="label"
                  v-ripple
                  v-for="list in my_lists"
                  :key="list.id"
                  dense
                >
                  <q-item-section side top>
                    <q-checkbox
                      size="sm"
                      :value="is_movie_in_list(list)"
                      @input="toggle_movie_from_list(list)"
                      color="primary"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ list.name }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </base-layout>
</template>
<script>
import moment from "moment";
import VueEasyPieChart from "vue-easy-pie-chart";
import "vue-easy-pie-chart/dist/vue-easy-pie-chart.css";
import BaseLayout from "@/layouts/Base";
import LoginRequiredPopup from "@/components/LoginRequiredPopup";
import {
  movie_service,
  review_service,
  review_like_service,
  recommend_service,
  watchlist_service,
  list_service,
} from "@/services";
import {
  LIST_REQUEST,
  TOGGLE_MOVIE_IN_LIST_REQUEST,
} from "@/store/actions/list";
import _ from "lodash";
export default {
  name: "detail-page",
  components: {
    BaseLayout,
    VueEasyPieChart,
    LoginRequiredPopup,
  },
  metaInfo() {
    return {
      title: "Home",
      meta: [
        {
          property: "og:title",
          content: this.movie.title + " | Moviepedia Films",
          class: "next-head",
        },
        {
          property: "og:url",
          content: "https://moviepediafilms.com/#" + this.$route.fullPath,
          class: "next-head",
        },
        { property: "og:type", content: "video.movie", class: "next-head" },
        {
          property: "og:description",
          content: this.movie.about,
          class: "next-head",
        },
        {
          property: "og:image",
          content: this.movie.poster,
          class: "next-head",
        },
        {
          itemProp: "name",
          content: this.movie.title + " | Moviepedia Films",
          class: "next-head",
        },
        {
          itemProp: "headline",
          content: this.movie.title + " | Moviepedia Films",
          class: "next-head",
        },
        {
          itemProp: "description",
          content: this.movie.about,
          class: "next-head",
        },
        { itemProp: "image", content: this.movie.poster, class: "next-head" },
        { itemProp: "author", content: "Moviepedia Films", class: "next-head" },

        // {
        //   name: "twitter:title",
        //   content: "{{movie.entry.name}} | MDFF Shortlist | Moviepedia Films",
        //   class: "next-head",
        // },
        // {
        //   name: "twitter:url",
        //   content:
        //     "https://moviepediafilms.com/{% url 'dff2020:shortlist-detail' movie.id %}",
        //   class: "next-head",
        // },
        // {
        //   name: "twitter:description",
        //   content: "{{movie.review}}",
        //   class: "next-head",
        // },
        // {
        //   name: "twitter:image",
        //   content: "{{movie.thumbnail}}",
        //   class: "next-head",
        // },
        // {
        //   name: "twitter:card",
        //   content: "summary_large_image",
        //   class: "next-head",
        // },

        { name: "description", content: this.movie.about, class: "next-head" },
        { name: "publisher", content: "Moviepedia Films", class: "next-head" },
        // {
        //   property: "article:published_time",
        //   content: "{{movie.publish_at.isoformat}}",
        //   class: "next-head",
        // },
      ],
    };
  },
  data() {
    return {
      // my_lists: [{ name: "", id: 1, like_count: 0, owner: 0, movies: [0, 1] }],
      recommend_loading: false,
      watchlist_loading: false,
      rating_loading: false,
      is_recommended: false,
      is_watchlisted: false,
      my_rate_review: {
        id: null,
        content: null,
        rating: 0,
      },
      old_review_content: "",
      old_rating: null,
      show_review_dialog: false,
      show_share_dialog: false,
      show_list_dialog: false,
      login_required: false,
      login_required_msg: "",
      user_rating: null,
      old_user_rating: null,
      reviews: [
        {
          author: {
            id: null,
            name: "",
            email: "",
          },
          content: "",
          id: null,
          liked_by: [
            {
              id: null,
              name: "",
            },
          ],
          movie: null,
          published_at: "",
          rating: null,
        },
      ],
      max_reviews: undefined,
      loading_reviews: false,
      movie: {
        id: null,
        audience_rating: 0,
        jury_rating: 0,
        genre: [],
        crew: [],
        runtime: "12",
        title: "",
        link: "",
        poster: "",
        published_at: "",
        is_recommended: false,
        is_watchlisted: false,
      },
    };
  },
  watch: {
    movie_id() {
      this.load_data();
    },
    is_authenticated() {
      if (!this.is_authenticated) {
        console.log("reload the page, user logged");
        this.my_rate_review = { id: null, content: null, rating: null };
        this.load_data();
      }
    },
  },
  computed: {
    crew_except_director() {
      // ignore the first director and return the rest of the crew
      if (this.movie && this.movie.crew)
        return this.movie.crew.filter((crew) => crew.profile != this.director);
      else return [];
    },
    top_movie_genres() {
      // var genres = [];
      if (this.movie && this.movie.genres) return this.movie.genres.slice(0, 3);
      else return [];
    },
    is_added_to_any_list() {
      var found = false;
      this.my_lists.forEach((list) => {
        if (list.movies.indexOf(this.movie.id) != -1) {
          found = true;
        }
      });
      return found;
    },
    watchlisted() {
      return this.movie.is_watchlisted;
    },
    recommended() {
      return this.movie.is_recommended;
    },
    review_page_size() {
      return parseInt(process.env.VUE_APP_REVIEW_PAGE_SIZE);
    },
    director() {
      var director = {};
      if (this.movie && this.movie.crew)
        this.movie.crew.forEach((crew) => {
          if (!director.name && crew.roles)
            crew.roles.forEach((role) => {
              if (role.name === "Director") director = crew.profile;
            });
        });
      return director;
    },
    movie_id() {
      return this.$route.params.id;
    },
    throttled_scroll_handler() {
      return _.throttle(this.scroll_handler, 300);
    },
    my_lists() {
      return this.$store.getters.getMyLists;
    },
  },
  created() {
    window.addEventListener("scroll", this.throttled_scroll_handler);
  },
  destroyed() {
    window.removeEventListener("scroll", this.throttled_scroll_handler);
  },
  mounted() {
    // one dummy object were created in the list for future objects in list to become reactive
    // clearing those dummy items here
    this.reviews.splice(0);
    // this.my_lists.splice(0);

    this.load_data();
    console.log(this.$route.fullPath);
  },
  methods: {
    scroll_handler() {
      var list = this.$refs.reviews.$el;
      var dimens = list.getClientRects()[0];
      if (dimens.bottom < window.innerHeight) {
        this.fetch_reviews();
      }
    },
    load_data() {
      this.fetch_movie();
      this.fetch_reviews();

      if (this.is_authenticated)
        this.$store.dispatch(LIST_REQUEST, this.user_profile.id);
      // this.fetch_my_lists();
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
          if (movie.requestor_rating)
            this.my_rate_review = movie.requestor_rating;
          delete movie["requestor_rating"];
          this.movie = movie;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetch_reviews() {
      if (this.loading_reviews) {
        // already loading
        return;
      }
      // if max_reviews is not defined or its greater than the current fetched reviews
      if (!this.max_reviews || this.reviews.length < this.max_reviews) {
        this.loading_reviews = true;
        review_service
          .get({
            movie__id: this.movie_id,
            offset: this.reviews.length,
            limit: this.review_page_size,
          })
          .then((data) => {
            if (data.results.length) this.reviews.push(...data.results);
            this.max_reviews = data.count;
            this.loading_reviews = false;
          })
          .catch((error) => {
            console.log(error);
            this.loading_reviews = false;
          });
      }
    },
    fetch_my_lists() {
      list_service
        .get({ owner__id: this.user_profile.id })
        .then((data) => {
          console.log(data);
          this.my_lists.push(...data.results);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    on_hide_write_review_popup() {
      this.my_rate_review.content = this.old_review_content;
    },
    show_write_review_popup() {
      if (this.is_authenticated) {
        this.show_review_dialog = true;
        this.old_review_content = this.my_rate_review.content;
      } else {
        this.login_required = true;
        this.login_required_msg = "Login required to review the movie";
      }
    },
    change_rating(new_rating) {
      console.log("change_rating", new_rating);
      if (!this.is_authenticated) {
        console.log("user not authenticated");
        this.$refs.rating_slider.model = 0;
      } else {
        console.log("user authenticated");
        this.my_rate_review.rating = new_rating;
        this.save_rate_review();
      }
    },
    save_rate_review() {
      if (this.is_authenticated) {
        console.log("user is authenticated");
        if (this.my_rate_review.id) {
          console.log("review id present");
          this.update_my_rate_review();
        } else {
          this.create_my_rate_review();
        }
      } else {
        this.user_rating = null;
        this.login_required = true;
        this.login_required_msg = "Login required to rate or review the movie";
      }
    },
    create_my_rate_review() {
      console.log("creating review");
      this.rating_loading = true;
      review_service
        .post({
          movie: this.movie.id,
          rating: this.my_rate_review.rating,
          content: this.my_rate_review.content,
        })
        .then((data) => {
          this.rating_loading = false;
          this.my_rate_review.id = data.id;
          this.my_rate_review.content = data.content;
          this.my_rate_review.rating = data.rating;
        })
        .catch((error) => {
          console.log(error);
          this.rating_loading = false;
        });
    },
    update_my_rate_review() {
      console.log("updating review");
      this.rating_loading = true;
      review_service
        .patch(
          {
            rating: this.my_rate_review.rating,
            content: this.my_rate_review.content,
          },
          this.my_rate_review.id
        )
        .then((data) => {
          this.rating_loading = false;
          this.my_rate_review.content = data.content;
          this.my_rate_review.rating = data.rating;
          this.$refs.review_dialog.hide();
        })
        .catch((error) => {
          console.log(error);
          this.rating_loading = false;
        });
    },
    submit_like(review) {
      if (!this.is_authenticated) {
        this.login_required = true;
        this.login_required_msg = "Login required to like reviews";
        return;
      }
      if (this.if_i_liked(review.liked_by)) {
        review_like_service.delete(review.id).then((data) => {
          console.log("unlike", data);
          if (data.success) {
            var to_remove = null;
            review.liked_by.forEach((item, index) => {
              if (item.id == this.user_profile.id) {
                to_remove = index;
              }
            });
            review.liked_by.splice(to_remove, 1);
          }
        });
      } else {
        review_like_service.patch({}, review.id).then((data) => {
          console.log("like", data);
          if (data.success) {
            review.liked_by.push({
              id: this.user_profile.id,
              name: this.user_profile.name,
            });
          }
        });
      }
    },
    if_i_liked(liked_by) {
      var liked = false;
      if (!this.user_profile) return liked;

      liked_by.forEach((user) => {
        if (user.id == this.user_profile.id) {
          liked = true;
        }
      });
      return liked;
    },
    get_like_txt(liked_by) {
      if (liked_by.length == 0) return "nobody liked it";
      if (liked_by.length == 1) return `${liked_by.length} like`;
      return `${liked_by.length} likes`;
    },
    get_like_btn_color(liked_by) {
      return this.if_i_liked(liked_by) ? "primary" : "default";
    },
    is_movie_in_list(list) {
      return list.movies.indexOf(this.movie.id) != -1;
    },
    toggle_movie_from_list(list) {
      this.$store.dispatch(TOGGLE_MOVIE_IN_LIST_REQUEST, {
        list: list,
        movie_id: this.movie.id,
      });
    },
    on_watchlist() {
      if (!this.is_authenticated) {
        this.login_required = true;
        this.login_required_msg = "Login required to watchlist a movie";
        return;
      }
      console.log("watchlisting");
      this.watchlist_loading = true;
      if (!this.movie.is_watchlisted) {
        console.log("adding to watchlist");
        watchlist_service
          .patch({}, this.movie.id)
          .then((data) => {
            if (data.success) {
              this.movie.is_watchlisted = true;
            }
            this.watchlist_loading = false;
          })
          .catch((error) => {
            console.log(error);
            this.watchlist_loading = false;
          });
      } else {
        console.log("removing from watchlist");
        watchlist_service
          .delete(this.movie.id)
          .then((data) => {
            if (data.success) {
              this.movie.is_watchlisted = false;
            }
            this.watchlist_loading = false;
          })
          .catch((error) => {
            console.log(error);
            this.watchlist_loading = false;
          });
      }
    },
    on_recommend() {
      if (!this.is_authenticated) {
        this.login_required = true;
        this.login_required_msg = "Login required to recommend a movie";
        return;
      }
      console.log("recommending");
      this.recommend_loading = true;
      if (!this.movie.is_recommended) {
        recommend_service
          .patch({}, this.movie.id)
          .then((data) => {
            if (data.success) {
              this.movie.is_recommended = true;
            }
            this.recommend_loading = false;
          })
          .catch((error) => {
            console.log(error);
            this.recommend_loading = false;
          });
      } else {
        recommend_service
          .delete(this.movie.id)
          .then((data) => {
            if (data.success) {
              this.movie.is_recommended = false;
            }
            this.recommend_loading = false;
          })
          .catch((error) => {
            console.log(error);
            this.recommend_loading = false;
          });
      }
    },
    on_share() {
      console.log("sharing");
      this.show_share_dialog = true;
    },
    on_add_to_list() {
      console.log("adding to a list");
      if (!this.is_authenticated) {
        this.login_required = true;
        this.login_required_msg = "Login is required to save a movie";
        return;
      }
      this.show_list_dialog = true;
    },
    join_roles(roles) {
      var names = [];
      roles.forEach((role) => {
        names.push(role.name);
      });
      return names.join(", ");
    },
    follow(profile) {
      console.log(profile, "follow");
    },
  },
};
</script>
<style lang="scss" scoped>
.rating-text {
  color: #7f7f7f;
}
</style>