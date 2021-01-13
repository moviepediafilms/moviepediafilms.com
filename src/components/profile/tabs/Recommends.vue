<template>
  <curation-list
    :list_id="list_id"
    :header="false"
    :options="menu_options"
    @remove="on_remove"
  />
</template>
<script>
import CurationList from "@/components/CurationList";
import { LIST_TOGGLE_MOVIE_REQUEST } from "@/store/actions";
export default {
  props: {
    profile: {
      type: Object,
      default() {
        return {};
      },
    },
    list_id: {
      type: Number,
    },
  },
  components: {
    CurationList,
  },
  data() {
    return {};
  },
  computed: {
    menu_options() {
      if (this.is_my_profile)
        return [{ name: "Remove", icon: "mdi-trash-can", emit: "remove" }];
      return [];
    },
    is_my_profile() {
      return this.profile.id == this.my_profile.id;
    },
  },
  methods: {
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
  },
};
</script>