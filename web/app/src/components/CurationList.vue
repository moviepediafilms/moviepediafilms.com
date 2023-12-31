// List all movies under a curation (MovieList)
<template>
  <div>
    <div v-if="header">
      <q-avatar size="72px">
        <img :src="info.owner.image" @error="on_user_img_error" />
      </q-avatar>
      <h1 class="text-primary">
        {{ info.owner.name }}
      </h1>
      <div class="text-grey-4 q-pt-xs">
        <template v-if="!info.contest"> Recommends </template>
        <template v-else>
          Recommends for <span class="text-bold">{{ info.name }}</span>
        </template>
      </div>
    </div>
    <div class="col flex items-center justify-between q-mt-md">
      <!-- pages are added to use them from the parent component as contests, to keep the actions on same line -->
      <slot>
        <div></div>
      </slot>
      <div class="text-right">
        <div style="display: inline-block" class="q-mx-md text-grey-5">
          {{ info.like_count }}
          <q-btn icon="mdi-heart" round flat size="sm" @click="on_liked">
          </q-btn>
        </div>

        <q-btn
          size="sm"
          label="Share"
          color="primary"
          rounded
          text-color="dark"
          icon="mdi-share"
          @click="on_share"
        />
      </div>
    </div>
    <div class="q-mt-lg text-left">
      <movies
        ref="list"
        :movies="movies"
        :showMyRoles="false"
        :options="options"
        @remove="on_remove"
        :empty-title="emptyTitle"
        :empty-desc="emptyDesc"
        :empty-icon="emptyIcon"
        :empty-image="emptyImage"
      />
    </div>
    <q-dialog v-model="show_share_dialog">
      <share-card
        :url="base_url + `/list/${list_id}/${list_slug}`"
        content="Check out these films I absolutely loved on Moviepedia Films ♥"
      ></share-card>
    </q-dialog>
  </div>
</template>
<script>
import Movies from "@/components/Movies";
import ShareCard from "@/components/ShareCard";
import { curation_service, contest_service } from "@/services/";
import { PROFILE_TOGGLE_CURATION_LIKE } from "@/store/actions";
import store from "@/store";
import _ from "lodash";
export default {
  name: "list-detail",
  props: {
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    list_id: {
      type: Number,
    },
    header: {
      type: Boolean,
      default: true,
    },
    emptyTitle: {
      type: String,
      default: "Nothing to show here",
    },
    emptyDesc: {
      type: String,
      default: "No movies found!",
    },
    emptyIcon: {
      type: String,
      default: null,
    },
    emptyImage: {
      type: String,
      default: null,
    },
  },
  components: {
    ShareCard,
    Movies,
  },
  metaInfo: {
    title: "Curation",
  },
  data() {
    return {
      show_share_dialog: false,
      movies_per_fetch: 20,
      loading: false,
      info: {
        liked_count: 0,
        movies: [],
        contest: undefined,
        owner: {
          name: "",
          image: "",
        },
        name: "",
      },
      movies: [],
      max_movies_for_page: undefined,
    };
  },
  computed: {
    list_slug() {
      return this.slugify(this.info.name);
    },
    throttled_scroll_handler() {
      return _.throttle(this.scroll_handler, 300);
    },
  },
  watch: {
    list_id() {
      this.movies.splice(0, this.movies.length);
      this.max_movies_for_page = undefined;
      this.fetch_list_info();
    },
  },
  mounted() {
    this.max_movies_for_page = undefined;
    this.fetch_list_info();
  },
  created() {
    window.addEventListener("scroll", this.throttled_scroll_handler);
  },
  destroyed() {
    window.removeEventListener("scroll", this.throttled_scroll_handler);
  },
  methods: {
    scroll_handler() {
      if (this.$refs.list) {
        var list = this.$refs.list.$el;
        var dimens = list.getClientRects()[0];
        if (dimens.bottom < window.innerHeight) {
          this.fetch_movies();
        }
      }
    },
    fetch_list_info() {
      if (this.list_id)
        curation_service
          .get({}, this.list_id)
          .then((data) => {
            this.info = Object.assign({}, this.info, data);
            this.fetch_movies();
          })
          .catch((error) => {
            console.log(error);
          });
    },
    fetch_movies() {
      if (this.loading) return;
      if (
        this.max_movies_for_page == undefined ||
        this.movies.length < this.max_movies_for_page
      ) {
        this.loading = true;
        var query_params = {
          limit: this.movies_per_fetch,
          offset: this.movies.length,
        };
        curation_service
          .get(query_params, `${this.list_id}/movies`)
          .then((data) => {
            this.movies.push(...data.results);
            this.max_movies_for_page = data.count;
            this.loading = false;
          })
          .catch((error) => {
            console.log(error);
            this.loading = false;
          });
      }
    },
    on_liked() {
      store
        .dispatch(PROFILE_TOGGLE_CURATION_LIKE, this.list_id)
        .then((data) => {
          this.info.like_count = data.like_count;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    on_share() {
      this.show_share_dialog = true;
    },
    on_remove(movie) {
      var action = this.info.movies.indexOf(movie.id) == -1 ? "post" : "delete";
      contest_service[action](
        { movie: movie.id },
        `${this.info.contest}/recommend`
      ).then(() => {
        // remove the movie from this.lists.movies
        // Addition cannot happen here
        if (action === "delete") {
          var inx = this.movies.indexOf(movie);
          this.movies.splice(inx, 1);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>