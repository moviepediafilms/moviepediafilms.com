<template>
  <div>
    <div class="row q-col-gutter-sm">
      <div
        class="col-4 col-sm-3 col-md-3"
        v-for="item in movies"
        :key="item.id"
      >
        <q-card flat v-ripple @click="on_item_click(item)">
          <q-img :ratio="9 / 16" :src="`${media_base}${item.poster}`">
            <div class="absolute-top-right bg-transparent" style="padding: 0">
              <q-btn
                round
                flat
                icon="mdi-dots-vertical"
                @click.stop="on_menu_click(item)"
                v-if="options.length > 0"
              />
            </div>
            <template v-slot:error>
              <div class="absolute-full flex flex-center bg-primary text-dark">
                <div class="text-h3">{{ item.title }}</div>
                <div class="text-caption">
                  <q-icon name="mdi-close" color="negative" size="24px" />Cannot
                  load image
                </div>
              </div>
            </template>
          </q-img>
          <div>
            <div class="ellipsis">
              {{ item.title }}
            </div>
            <q-badge color="positive" v-if="item.is_live">Live</q-badge>
            <q-badge
              color="grey-5"
              class="q-ml-xs"
              text-color="dark"
              v-if="item.contest"
              >{{ item.contest }}</q-badge
            >
          </div>
        </q-card>
      </div>
    </div>
    <popup-menu
      :options="options"
      :show="show_menu"
      @hide="show_menu = false"
      @select="on_option_select"
    />
  </div>
</template>
<script>
import PopupMenu from "@/components/PopupMenu";
export default {
  components: {
    PopupMenu,
  },
  props: {
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