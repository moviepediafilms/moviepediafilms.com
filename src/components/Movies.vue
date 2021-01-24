<template>
  <div>
    <div class="row q-col-gutter-sm" v-if="movies.length > 0">
      <div
        class="col-4 col-sm-3 col-md-3"
        v-for="movie in movies"
        :key="movie.id"
      >
        <movie
          :menuBtn="options.length > 0"
          :emitSelection="emitSelection"
          :showMyRoles="showMyRoles"
          :movie="movie"
          @select="on_select(movie)"
          @showOptions="on_show_options(movie)"
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
    emitSelection: {
      type: Boolean,
      default: false,
    },
    showMyRoles: {
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
    on_option_select(option) {
      this.$emit(option.emit, this.active_movie);
    },
    on_select(movie) {
      this.$emit("select", movie);
    },
    on_show_options(movie) {
      this.active_movie = movie;
      this.show_menu = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.q-item__section--side {
  padding-left: 0;
}
</style>