<template>
  <base-layout>
    <div v-swipe="swipe" ref="content">
      <div class="q-pa-xs">
        <q-responsive :ratio="16 / 9" class="col" v-if="is_movie_published">
          <iframe :src="movie.link" frameborder="0" allowfullscreen />
        </q-responsive>
        <q-skeleton
          height="230px"
          type="rect"
          class="full-width"
          v-if="loading"
        />
      </div>
      <div class="q-px-md q-pb-md">
        <div class="row" v-if="is_movie_published">
          <div class="col-12">
            <div class="text-h3 text-primary q-mt-sm">
              {{ movie.title }}
            </div>
            <div class="row">
              <q-badge
                v-if="movie.type === 'B'"
                color="grey-5"
                text-color="dark"
                class="q-ma-xs"
                >Blog</q-badge
              >
              <q-badge v-if="movie.is_live" color="positive" class="q-mr-xs"
                >Live</q-badge
              >
              <div v-if="movie.contests.length > 0" class="q-my-xs">
                <q-badge
                  v-for="(contest, index) in movie.contests"
                  :key="index"
                  color="grey-5"
                  text-color="dark"
                  class="q-mr-xs"
                  >{{ contest.name }}</q-badge
                >
              </div>
            </div>
            <div class="row justify-between no-wrap">
              <div class="ellipsis text-grey-6 text-caption q-mt-xs">
                <span class="q-mr-sm">
                  <q-icon name="mdi-translate" class="q-mr-xs" />
                  {{ movie.lang.name }}
                </span>
                <q-icon
                  name="mdi-tag"
                  class="q-mr-xs"
                  v-if="top_movie_genres.length > 0"
                />
                <template v-for="(genre, index) in top_movie_genres">
                  {{ genre.name }}
                  <template v-if="index < top_movie_genres.length - 1"
                    ><span :key="genre.id + '_'">/</span></template
                  >
                </template>
              </div>

              <div class="text-grey-6 text-caption">
                <q-icon name="mdi-bullhorn" />
                {{ movie.recommend_count }}
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
                  :color="'default'"
                  @click="curate_info_dialog = true"
                >
                  <!-- disabled feature -->
                  <!-- @click="on_add_to_list" :color="is_added_to_any_list ? 'primary' : 'default'" -->
                  <div>
                    <q-icon name="mdi-lock" />
                    <!-- disabled feature -->
                    <!-- name="is_added_to_any_list
                          ? 'mdi-checkbox-multiple-marked'
                          : 'mdi-check-box-multiple-outline'"" -->
                    <div
                      class="text-muted text-grey-6 q-mt-xs"
                      style="font-size: 8px"
                    >
                      Curate
                      <!-- disabled feature -->
                      <!-- <template v-if="is_added_to_any_list">d</template> -->
                    </div>
                  </div>
                </q-btn>
              </q-btn-group>
            </div>
            <div class="col-12 q-mt-sm" v-if="movie.type === 'S'">
              <q-expansion-item>
                <template slot="header">
                  <q-item-section avatar top>
                    <q-avatar>
                      <img :src="director.image" @error="on_user_img_error" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>
                      <router-link
                        class="text-primary text-decoration-none"
                        :to="{ name: 'profile', params: { id: director.id } }"
                        >{{ director.name }}</router-link
                      >
                      <template v-if="my_profile.id != director.id">
                        <span class="q-mx-xs text-grey-6">&bull;</span>
                        <a
                          href="#"
                          @click.stop="on_follow(director)"
                          class="text-light-blue-11 text-decoration-none text-caption"
                        >
                          Follow<template v-if="is_following(director)"
                            >ing</template
                          >
                        </a>
                      </template>
                      <div class="text-caption text-grey-6">
                        <template v-if="movie.crew.length > 1">
                          Directed with {{ movie.crew.length - 1 }} other crew
                          member<template v-if="movie.crew.length > 2"
                            >s</template
                          >
                        </template>
                        <template v-else>Director</template>
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
                      <img
                        :src="crew.profile.image"
                        @error="on_user_img_error"
                      />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>
                      <router-link
                        class="text-primary text-decoration-none"
                        :to="{
                          name: 'profile',
                          params: { id: crew.profile.id },
                        }"
                        >{{ crew.profile.name }}</router-link
                      >
                      <div class="text-caption text-grey-6">
                        {{ get_roles_str(crew.roles) }}
                      </div>
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side v-if="my_profile.id != crew.profile.id">
                    <q-btn
                      flat
                      :icon="
                        is_following(crew.profile) ? 'mdi-check' : 'mdi-plus'
                      "
                      :label="
                        is_following(crew.profile) ? 'Following' : 'Follow'
                      "
                      @click.stop="on_follow(crew.profile)"
                    />
                  </q-item-section>
                </q-item>
                <q-item v-ripple>
                  <q-item-section class="text-center" @click="on_add_crew">
                    <q-item-label class="text-grey-6">Add Crew</q-item-label>
                    <q-item-label caption class="text-grey-6"
                      >Create a request to add new crew member</q-item-label
                    >
                  </q-item-section>
                </q-item>
              </q-expansion-item>
            </div>
            <div class="row q-mt-lg" v-if="movie.about">
              <div class="col text-center text-grey-5">
                <div class="text-h4 text-primary">Our Take</div>
                <div class="q-mt-xs">
                  <div
                    class="text-body2 text-left"
                    style="word-break: break-all"
                  >
                    <read-more
                      class="readmore readmore-primary"
                      more-str="read more"
                      :text="movie.about"
                      link="#"
                      less-str="read less"
                      :max-chars="200"
                    ></read-more>
                  </div>
                </div>
              </div>
            </div>
            <div class="row items-center q-mt-lg" v-if="!has_rating_fixed">
              <div clss="col">
                <q-icon size="48px" color="primary" name="mdi-emoticon-dead" />
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
                  :disable="rating_loading"
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
                  name="mdi-emoticon-excited"
                />
              </div>
            </div>
            <div class="text-center text-grey-6 q-mt-md text-bold">
              <template v-if="my_rate_review.rating != null">
                You rated {{ my_rate_review.rating }} / 10
              </template>
              <template v-else
                ><q-icon name="mdi-chevron-triple-right" /> Slide to rate the
                film <q-icon name="mdi-chevron-triple-right"
              /></template>
            </div>

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
              <div class="col">
                <div
                  class="text-uppercase text-primary text-weight-bold q-mb-sm"
                  v-show="reviews.length > 0"
                >
                  Recent Reviews
                </div>
                <div ref="reviews">
                  <reviews
                    :show-user="true"
                    :reviews="loaded_reviews"
                    :show-movie-link="false"
                    v-on:toggle-like="toggle_like"
                  />
                </div>
                <div class="text-center text-primary">
                  <q-spinner-dots v-if="loading_reviews" size="48px" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row" v-if="loading">
          <div class="col">
            <q-skeleton type="rect" width="70%" class="text-subtitle1" />
            <q-skeleton type="text" width="10%" />
            <q-skeleton type="text" width="100%" />
            <div class="row q-col-gutter-sm">
              <div class="col"><q-skeleton type="QBtn" /></div>
              <div class="col"><q-skeleton type="QBtn" /></div>
              <div class="col"><q-skeleton type="QBtn" /></div>
              <div class="col"><q-skeleton type="QBtn" /></div>
            </div>

            <q-list>
              <q-item>
                <q-item-section avatar>
                  <q-skeleton type="QAvatar" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>
                    <q-skeleton type="text" width="35%" />
                  </q-item-label>
                  <q-item-label caption>
                    <q-skeleton type="text" />
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
        <div class="col" v-if="!loading && !is_movie_published">
          <empty-state
            title="This film is yet to be screened."
            desc="You can watch other films screening on our platform here."
            icon="mdi-movie"
          />
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
          <share-card
            :url="base_url + $route.fullPath"
            content="Check out this film I watched on Moviepedia. Absolutely loved it! 😍"
          ></share-card>
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
                @click="show_add_list_dialog = true"
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
        <q-dialog v-model="show_crew_dialog">
          <q-card style="width: 700px; max-width: 80vw">
            <q-card-section>
              <div class="text-title text-primary">Add New Crew</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <q-form
                class="q-gutter-sm"
                @submit="save_crew_request"
                ref="new_crew_form"
              >
                <q-input
                  type="text"
                  v-model="new_crew.name"
                  autofocus
                  label="Full Name"
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please enter name',
                  ]"
                  :error="!!new_crew_error.name"
                  :error-message="new_crew_error.name"
                />
                <q-input
                  type="email"
                  v-model="new_crew.email"
                  autocomplete="email"
                  @keydown.enter="save_crew_request"
                  label="Email address"
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please enter email',
                  ]"
                  :error="!!new_crew_error.email"
                  :error-message="new_crew_error.email"
                />
                <div class="q-pa-sm">
                  Roles:
                  <q-option-group
                    :options="role_options"
                    type="checkbox"
                    color="primary"
                    v-model="new_crew.roles"
                    :error="!!new_crew_error.roles"
                    :error-message="new_crew_error.roles"
                  />
                </div>
              </q-form>
            </q-card-section>
            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Cancel" v-close-popup />
              <q-btn
                flat
                label="Add"
                :loading="loading_new_crew"
                @click="save_crew_request"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="show_add_list_dialog">
          <q-card style="width: 700px; max-width: 80vw">
            <q-card-section title>Create New List</q-card-section>
            <q-card-section class="q-pt-none">
              <q-input
                type="text"
                v-model="new_list.name"
                autofocus
                label="Name"
                :error-message="err_new_list_request"
                :error="!!err_new_list_request"
              />
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Cancel" v-close-popup />
              <q-btn flat label="Create" @click="save_new_list_request" />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="show_request_created_dialog">
          <q-card style="width: 700px; max-width: 80vw">
            <q-card-section title>Request Successfully Created</q-card-section>
            <q-card-section class="q-pt-none text-center">
              <q-icon name="mdi-check" class="text-positive" size="30px" />
              <div class="text-body">
                {{ show_request_created_message }}
              </div>
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="OK" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="show_recommend_for_dialog">
          <q-card style="width: 700px; max-width: 80vw">
            <q-card-section title class="text-primary text-h4"
              >Recommend this Film for</q-card-section
            >
            <q-card-section class="">
              <q-list bordered separator class="rounded-borders text-primary">
                <q-item v-for="(contest, index) in movie.contests" :key="index">
                  <q-item-section>
                    <q-item-label lines="1" class="text-primary">{{
                      contest.name
                    }}</q-item-label>
                    <q-item-label caption
                      >ends {{ get_relative_time(contest.end) }}</q-item-label
                    >
                  </q-item-section>
                  <q-item-section side class="text-center">
                    <q-btn
                      icon="mdi-bullhorn"
                      :color="
                        is_recommended_in(contest) ? 'primary' : 'default'
                      "
                      flat
                      text-primary
                      :loading="loading_recommends[contest.id]"
                      size="sm"
                      @click="recommend_in_contest(contest)"
                    />
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label lines="1" class="text-primary"
                      >My Recommendations</q-item-label
                    >
                    <q-item-label caption
                      >Your All-Time Recommendations List</q-item-label
                    >
                  </q-item-section>
                  <q-item-section side class="text-center">
                    <q-btn
                      icon="mdi-bullhorn"
                      :color="movie.is_recommended ? 'primary' : 'default'"
                      flat
                      :loading="recommend_loading"
                      text-primary
                      size="sm"
                      @click="recommend_in_personal"
                    />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="close" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="curate_info_dialog">
          <q-card>
            <q-card-section>
              <div class="text-h3 text-primary">Curate</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              Lets you curate and create customised lists based on your own
              cinematic taste. Gets unlocked after you reach
              <span class="text-bold">'Curator'</span> level.
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="OK" color="primary" v-close-popup />
            </q-card-actions>
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
import Reviews from "@/components/Reviews";
import ShareCard from "@/components/ShareCard";
import settings from "@/settings";
import {
  movie_service,
  review_service,
  review_like_service,
  crew_request_service,
  contest_service,
} from "@/services";
import {
  LIST_CREATE,
  LIST_REQUEST,
  LIST_TOGGLE_MOVIE_REQUEST,
  ROLE_REQUEST,
  PROFILE_FOLLOW,
  PROFILE_UNFOLLOW,
  PROFILE_TOGGLE_WATCHLIST,
  PROFILE_TOGGLE_RECOMMEND,
} from "@/store/actions";

import _ from "lodash";
import { mapState } from "vuex";
export default {
  name: "detail-page",
  components: {
    ShareCard,
    BaseLayout,
    VueEasyPieChart,
    LoginRequiredPopup,
    Reviews,
  },
  metaInfo() {
    return {
      title: this.movie.title,
      meta: [
        {
          property: "og:title",
          content: this.movie.title + " | Moviepedia Films",
          class: "next-head",
        },
        {
          property: "og:url",
          content: this.base_url + this.$route.fullPath,
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
        { name: "description", content: this.movie.about, class: "next-head" },
        { name: "publisher", content: "Moviepedia Films", class: "next-head" },
      ],
    };
  },
  data() {
    return {
      interval: undefined,
      now: moment(),

      frame_error: false,
      // my_lists: [{ name: "", id: 1, like_count: 0, owner: 0, movies: [0, 1] }],
      recommend_loading: false,
      watchlist_loading: false,
      rating_loading: false,
      my_rate_review: {
        id: null,
        content: null,
        rating: null,
        rated_at: null,
      },
      old_review_content: "",
      old_rating: null,
      show_review_dialog: false,
      show_share_dialog: false,
      show_list_dialog: false,
      show_crew_dialog: false,
      show_add_list_dialog: false,
      curate_info_dialog: false,
      show_recommend_for_dialog: false,
      show_request_created_dialog: false,
      show_request_created_message:
        "Your request is sent to the director for approval.",
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
      loading_recommends: {},
      loading: false,
      loading_reviews: false,
      loading_new_list_request: false,
      loading_new_crew: false,
      err_new_list_request: "",
      movie: {
        id: null,
        state: null,
        contests: [
          {
            recommended_movies: [{ id: undefined }],
          },
        ],
        audience_rating: 0,
        jury_rating: 0,
        genre: [],
        crew: [],
        runtime: "12",
        title: "",
        link: "",
        poster: "",
        published_at: "",
        // is the movie is present in requestor's personal recommend list
        is_recommended: false,
        is_watchlisted: false,
      },
      new_crew: {
        name: "",
        email: "",
        roles: [],
      },
      new_crew_error: {
        name: "",
        email: "",
        roles: "",
      },
      new_list: {
        name: "",
      },
    };
  },
  watch: {
    movie_id() {
      this.load_data();
    },
    is_authenticated() {
      // watch authentication state and reload the page if it changes
      if (!this.is_authenticated) {
        this.my_rate_review = {
          id: null,
          content: null,
          rating: null,
          rated_at: null,
        };
        this.load_data();
      }
    },
  },
  computed: {
    has_rating_fixed() {
      if (this.my_rate_review.rating) {
        var freezet_at = moment(this.my_rate_review.rated_at).add(9, "seconds");
        var res = this.now.isAfter(freezet_at);
        if (res) clearInterval(this.interval);
        return res;
      }
      return false;
    },
    has_live_contest() {
      // backend only returns live contests
      return this.movie.contests.length > 0;
    },
    is_movie_published() {
      // A movie can be live even without being part of any contest
      return this.movie.state === "P";
    },
    loaded_reviews() {
      return this.reviews;
    },
    movie_publish_date() {
      if (this.movie.publish_on) return moment(this.movie.publish_on).fromNow();
      return "";
    },
    role_options() {
      var roles = [];
      this.roles.forEach((role) => {
        roles.push({ label: role.name, value: role.id });
      });
      return roles;
    },
    crew_except_director() {
      // ignore the first director and return the rest of the crew
      if (this.movie && this.movie.crew)
        return this.movie.crew.filter((crew) => crew.profile != this.director);
      else return [];
    },
    top_movie_genres() {
      // var genres = [];
      if (this.movie && this.movie.genres) return this.movie.genres.slice(0, 2);
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
      var recommended = false;
      this.movie.contests.forEach((contest) => {
        contest.recommended_movies.forEach((movie) => {
          if (this.movie.id === movie.id) recommended = true;
        });
      });
      return recommended || this.movie.is_recommended;
    },
    review_page_size() {
      return settings.PAGE_SIZE;
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
      return parseInt(this.$route.params.id);
    },
    throttled_scroll_handler() {
      return _.throttle(this.scroll_handler, 300);
    },
    ...mapState({
      roles: (state) => state.role.roles,
      my_lists: (state) => state.list.my_lists,
    }),
  },
  created() {
    window.addEventListener("scroll", this.throttled_scroll_handler);
    this.interval = setInterval(() => {
      this.update_now();
    }, 2000);
  },
  destroyed() {
    window.removeEventListener("scroll", this.throttled_scroll_handler);
    clearInterval(this.interval);
  },
  mounted() {
    // one dummy object were created in the list for future objects in list to become reactive
    // clearing those dummy items here
    this.reviews.splice(0);
    this.load_data();
  },
  methods: {
    is_recommended_in(contest) {
      var has_recommended = false;
      contest.recommended_movies.forEach((movie) => {
        if (this.movie.id == movie.id) has_recommended = true;
      });
      return has_recommended;
    },
    get_relative_time(date) {
      return moment(date).fromNow();
    },
    update_now() {
      this.now = moment();
    },
    scroll_handler() {
      if (this.$refs.reviews) {
        var list = this.$refs.reviews;
        var dimens = list.getClientRects()[0];
        if (dimens.bottom < window.innerHeight) {
          this.fetch_reviews();
        }
      }
    },
    load_data() {
      this.fetch_movie(this.movie_id);
      this.fetch_reviews();
      this.$store.dispatch(ROLE_REQUEST);
      if (this.is_authenticated) {
        this.$store.dispatch(LIST_REQUEST, this.my_profile.id);
      }
    },
    swipe() {
      // 0 = none, 2 = left, 4 = right, 8 = up, 16 = down
      // console.log("someone swiped", event.direction);
    },
    fetch_movie(movie_id) {
      this.loading = true;
      movie_service
        .get({}, movie_id)
        .then((movie) => {
          if (movie.requestor_rating)
            this.my_rate_review = movie.requestor_rating;
          delete movie["requestor_rating"];
          Object.assign(this.movie, movie);
          this.loading = false;
        })
        .catch((error) => {
          if (error.response.status == 404) console.log("show 404 page");

          this.loading = false;
        });
    },
    fetch_reviews() {
      if (this.loading_reviews) {
        // already loading
        return;
      }
      // don't do network call if there are no reviews to fetch, or all are fetched already.
      if (
        this.max_reviews == undefined ||
        this.reviews.length < this.max_reviews
      ) {
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
      if (!this.is_authenticated) {
        this.$refs.rating_slider.model = 0;
      } else {
        this.my_rate_review.rating = new_rating;
        // this.save_rate_review();
      }
    },
    save_rate_review() {
      if (this.is_authenticated) {
        if (this.my_rate_review.id) {
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
    save_crew_request() {
      this.$refs.new_crew_form.validate().then((valid) => {
        if (valid) {
          this.loading_new_crew = true;
          var payload = { movie: this.movie_id };
          Object.assign(payload, this.new_crew);
          crew_request_service
            .post(payload)
            .then((data) => {
              this.new_crew = { roles: [] };
              this.show_crew_dialog = false;
              if (data.state === "A")
                this.show_request_created_message = "Added crew member";
              this.show_request_created_dialog = true;
              this.loading_new_crew = false;
            })
            .catch((error) => {
              this.check_fields_for_error(
                error.response.data,
                this.new_crew_error,
                ["name", "email", "roles"]
              );
              this.loading_new_crew = false;
            });
        } else {
          this.loading_new_crew = false;
        }
      });
    },
    save_new_list_request() {
      this.loading_new_list_request = true;
      this.$store
        .dispatch(LIST_CREATE, this.new_list)
        .then(() => {
          this.loading_new_list_request = false;
          this.show_add_list_dialog = false;
        })
        .catch((error) => {
          console.log(error);
          this.err_new_list_request = this.decode_error_message(error);
          this.loading_new_list_request = false;
        });
    },
    create_my_rate_review() {
      // TODO: after the rating is created, add it to the top
      this.rating_loading = true;
      review_service
        .post({
          movie_id: this.movie.id,
          rating: this.my_rate_review.rating,
          content: this.my_rate_review.content,
        })
        .then((data) => {
          this.rating_loading = false;
          this.show_review_dialog = false;
          this.my_rate_review.id = data.id;
          this.my_rate_review.content = data.content;
          this.my_rate_review.rating = data.rating;
          this.my_rate_review.rated_at = data.rated_at;
          if (data.content) this.reviews.splice(0, 0, data);
        })
        .catch((error) => {
          console.log(error);
          this.rating_loading = false;
        });
    },
    update_my_rate_review() {
      // TODO: after the rating is update, remove it and insert it on top
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
          this.my_rate_review.rated_at = data.rated_at;
          this.show_review_dialog = false;
          if (data.content) {
            // if content has some text replace/ add it to the reviews
            var index_to_replace = -1;
            this.reviews.forEach((review, index) => {
              if (data.id == review.id) index_to_replace = index;
            });
            if (index_to_replace != -1)
              this.$set(this.reviews, index_to_replace, data);
            else this.reviews.splice(0, 0, data);
          }
        })
        .catch((error) => {
          console.log(error);
          this.rating_loading = false;
        });
    },
    toggle_like(review) {
      if (!this.is_authenticated) {
        this.login_required = true;
        this.login_required_msg = "Login required to like reviews";
        return;
      }
      if (this.if_i_liked(review.liked_by)) {
        review_like_service.delete({}, review.id).then((data) => {
          if (data.success) {
            var to_remove = null;
            review.liked_by.forEach((item, index) => {
              if (item.id == this.my_profile.id) {
                to_remove = index;
              }
            });
            review.liked_by.splice(to_remove, 1);
          }
        });
      } else {
        review_like_service.patch({}, review.id).then((data) => {
          if (data.success) {
            review.liked_by.push({
              id: this.my_profile.id,
              name: this.my_profile.name,
            });
          }
        });
      }
    },
    if_i_liked(liked_by) {
      var liked = false;
      if (!this.my_profile) return liked;

      liked_by.forEach((user) => {
        if (user.id == this.my_profile.id) {
          liked = true;
        }
      });
      return liked;
    },
    get_like_txt(liked_by) {
      if (liked_by.length == 0) return "no likes";
      if (liked_by.length == 1) return "1 like";
      return `${liked_by.length} likes`;
    },
    get_like_btn_color(liked_by) {
      return this.if_i_liked(liked_by) ? "primary" : "default";
    },
    get_roles_str(roles) {
      var names = [];
      roles.forEach((role) => {
        names.push(role.name);
      });
      return names.join(", ");
    },
    is_movie_in_list(list) {
      return list.movies.indexOf(this.movie.id) != -1;
    },
    toggle_movie_from_list(list) {
      this.$store.dispatch(LIST_TOGGLE_MOVIE_REQUEST, {
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
      this.watchlist_loading = true;
      this.$store
        .dispatch(PROFILE_TOGGLE_WATCHLIST, this.movie)
        .then((data) => {
          if (data.success) {
            this.movie.is_watchlisted = !this.movie.is_watchlisted;
          }
          this.watchlist_loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.watchlist_loading = false;
        });
    },
    on_recommend() {
      if (!this.is_authenticated) {
        this.login_required = true;
        this.login_required_msg = "Login required to recommend a movie";
        return;
      }
      if (this.movie.contests.length > 0) {
        this.show_recommend_for_dialog = true;
      } else {
        this.recommend_in_personal();
      }
    },
    recommend_in_contest(contest) {
      if (this.loading_recommends[contest.id]) return;
      this.$set(this.loading_recommends, contest.id, true);
      var action = this.is_recommended_in(contest) ? "delete" : "post";
      contest_service[action](
        { movie: this.movie.id },
        `${contest.id}/recommend`
      )
        .then((data) => {
          this.loading_recommends[contest.id] = false;
          this.$q.notify({
            icon: "mdi-check",
            message:
              action == "post"
                ? "Recommendation Successful"
                : "Recommendation Undone",
            color: "positive",
            caption: `You have recommended ${data.recommended}/${data.max_recommends} Films for ${data.name}`,
          });

          var index = -1;
          contest.recommended_movies.forEach((movie, idx) => {
            if (this.movie.id == movie.id) {
              index = idx;
            }
          });
          if (index == -1) {
            // add
            contest.recommended_movies.push({ id: this.movie.id });
          } else {
            // remove
            contest.recommended_movies.splice(index, 1);
          }
        })
        .catch((error) => {
          this.loading_recommends[contest.id] = false;
          var error_msg = undefined;
          if (error.response && error.response.data)
            error_msg = error.response.data.movie;
          if (!error_msg) error_msg = this.decode_error_message(error);
          this.$q.notify({
            color: "negative",
            icon: "mdi-alert-circle-outline",
            message: error_msg,
          });
        });
    },
    recommend_in_personal() {
      this.recommend_loading = true;
      this.$store
        .dispatch(PROFILE_TOGGLE_RECOMMEND, this.movie)
        .then(() => {
          this.movie.is_recommended = !this.movie.is_recommended;
          this.recommend_loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.recommend_loading = false;
        });
    },
    on_share() {
      this.show_share_dialog = true;
    },
    on_add_to_list() {
      // disable this feature
      this.$q.notify({
        message:
          "This feature will get unlocked once you reach the “Curator” level on our platform",
      });
      return;
      //eslint-disable-next-line
      if (!this.is_authenticated) {
        this.login_required = true;
        this.login_required_msg = "Login is required to save a movie";
        return;
      }
      this.show_list_dialog = true;
    },
    on_follow(profile) {
      if (!this.is_authenticated) {
        this.login_required = true;
        this.login_required_msg = "Login required to follow";
        return;
      }
      if (this.is_following(profile))
        this.$store.dispatch(PROFILE_UNFOLLOW, profile);
      else this.$store.dispatch(PROFILE_FOLLOW, profile);
    },
    is_following(profile) {
      if (this.is_authenticated)
        return this.my_profile.follows.indexOf(profile.profile_id) != -1;
      return false;
    },
    on_add_crew() {
      if (!this.is_authenticated) {
        this.login_required = true;
        this.login_required_msg = "Login required to submit add crew";
        return;
      }
      this.show_crew_dialog = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.rating-text {
  color: #7f7f7f;
}
</style>