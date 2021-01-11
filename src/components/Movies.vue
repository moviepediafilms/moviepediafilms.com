<template>
  <div>
    <div class="row q-col-gutter-sm" v-if="movies.length > 0">
      <div
        class="col-4 col-sm-3 col-md-3"
        v-for="item in movies"
        :key="item.id"
      >
        <movie
          :movie="movie"
          v-for="movie in movies"
          :key="movie.id"
          :enableOptions="options.length >= 0"
        />
      </div>
    </div>
    <empty-state
      v-else
      :title="emptyTitle"
      :desc="emptyDesc"
      :icon="emptyIcon"
      :image="emptyImage"
    />
    <popup-menu
      :options="options"
      :show="show_menu"
      @hide="show_menu = false"
      @select="on_option_select"
    />
  </div>
</template>
<script>
import Movie from "@/components/movie/Movie";
import PopupMenu from "@/components/PopupMenu";
export default {
  components: {
    PopupMenu,
    Movie,
  },
  props: {
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
    movies: {
      type: Array,
      default() {
        return [];
      },
    },
    options: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      active_movie: null,
      show_menu: false,
    };
  },
  methods: {
    on_item_click(item) {
      this.$emit("item-selected", item);
    },
    on_menu_click(movie) {
      this.active_movie = movie;
      this.show_menu = true;
    },
    on_option_select(option) {
      this.$emit(option.emit, this.active_movie);
    },
  },
};
</script>
<style lang="scss" scoped>
.q-item__section--side {
  padding-left: 0;
}
</style>