<template>
  <div>
    <div v-if="header">
      <h1 class="text-primary">
        {{ info.name }}
      </h1>
      <h3>
        <small class="text-grey-4">by {{ info.owner.name }}</small>
      </h3>
    </div>
    <div
      class="col flex items-center justify-between q-mt-md"
      v-if="info.movies > 0"
    >
      <q-btn-dropdown
        split
        rounded
        size="sm"
        padding="sm"
        color="primary"
        text-color="dark"
        :label="selected_page_txt"
      >
        <q-list>
          <q-item
            clickable
            v-close-popup
            v-for="(page, index) in info.pages"
            :key="index"
            @click="on_page_selected(page)"
          >
            <q-item-section>
              <q-item-label>{{
                `${page.pub_year}-${page.pub_month}`
              }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
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
        :options="menu_options"
        @remove="on_remove"
        @item-selected="on_select"
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
import { list_service } from "@/services/";
import _ from "lodash";
import { LIST_TOGGLE_MOVIE_REQUEST } from "@/store/actions";
export default {
  name: "list-detail",
  props: {
    list_id: {
      type: Number,
    },
    header: {
      type: Boolean,
      default: true,
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
      info: {
        liked_count: 0,
        movies: 0,
        owner: {
          name: "",
          image: "",
        },
        name: "",
        pages: [],
      },
      selected_page: {},
      movies: [],
      max_movies_for_page: undefined,
      menu_options: [{ name: "Remove", icon: "mdi-trash-can", emit: "remove" }],
    };
  },
  computed: {
    list_slug() {
      return this.slugify(this.info.name);
    },
    throttled_scroll_handler() {
      return _.throttle(this.scroll_handler, 300);
    },
    selected_page_txt() {
      return `${this.selected_page.pub_year}-${this.selected_page.pub_month}`;
    },
  },
  watch: {
    list_id() {
      this.fetch_list_info();
    },
    selected_page() {
      this.max_movies_for_page = undefined;
      this.movies.splice(0, this.movies.length);
      this.fetch_movies();
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
      list_service
        .get({}, this.list_id)
        .then((data) => {
          this.info = data;
          this.selected_page = data.pages[0];
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetch_movies() {
      if (
        this.max_movies_for_page == undefined ||
        this.movies.length < this.max_movies_for_page
      ) {
        var query_params = {
          year: this.selected_page.pub_year,
          month: this.selected_page.pub_month,
          limit: this.movies_per_fetch,
          offset: this.movies.length,
        };
        console.log(query_params);
        list_service
          .get(query_params, `${this.list_id}/movies`)
          .then((data) => {
            this.movies.push(...data.results);
            this.max_movies_for_page = data.count;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    on_remove(movie) {
      this.$store
        .dispatch(LIST_TOGGLE_MOVIE_REQUEST, {
          list: { id: this.list.id, movies: this.movie_ids },
          movie_id: movie.id,
        })
        .then((data) => {
          // remove the movie from this.lists.movies
          // Addition is handled automatically
          var movies_to_remove = [];
          this.list.movies.forEach((movie, index) => {
            if (data.movies.indexOf(movie.id) == -1) {
              movies_to_remove.push(index);
            }
          });
          movies_to_remove.forEach((index) => {
            this.list.movies.splice(index, 1);
          });
        });
    },
    on_select(movie) {
      this.$router.push({
        name: "movie-detail",
        params: { id: movie.id, slug: this.slugify(movie.title) },
      });
    },
    on_page_selected(page) {
      this.selected_page = page;
    },
    on_liked() {
      list_service
        .patch({}, this.list_id)
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    on_share() {
      this.show_share_dialog = true;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>