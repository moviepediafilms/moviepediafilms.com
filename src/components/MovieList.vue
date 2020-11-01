<template>
  <div>
    <q-list>
      <q-item
        v-for="item in source"
        :key="item.id"
        clickable
        v-ripple
        class="q-ma-none"
      >
        <q-item-section top thumbnail @click="on_item_click(item)">
          <img :src="item.poster" />
        </q-item-section>
        <q-item-section @click="on_item_click(item)">
          <q-item-label class="text-sm">{{ item.title }}</q-item-label>
          <q-item-label caption>{{ item.about }}</q-item-label>
        </q-item-section>
        <q-item-section side @click.stop="on_menu_click(item)">
          <q-btn round flat icon="mdi-dots-vertical" />
        </q-item-section>
      </q-item>
    </q-list>
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
    source: {
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