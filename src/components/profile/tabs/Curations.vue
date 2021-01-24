<template>
  <div>
    <q-list v-if="lists.length > 0">
      <q-item
        class="q-ma-none"
        v-ripple
        clickable
        @click="$emit('select', list)"
        v-for="list in lists"
        :key="list.id"
      >
        <q-item-section>
          <q-item-label class="text-title">
            {{ list.name }}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label class="text-center">
            <div class="text-title">{{ list.movies.length || 0 }}</div>
            <div class="text-caption text-uppercase" style="font-size: 0.7em">
              Movies
            </div>
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label class="text-center">
            <div class="text-title">{{ list.like_count || 0 }}</div>
            <div class="text-caption text-uppercase" style="font-size: 0.7em">
              Likes
            </div>
          </q-item-label>
        </q-item-section>
        <q-item-section side v-if="!list.frozen">
          <q-btn
            size="sm"
            flat
            round
            icon="mdi-dots-vertical"
            @click.stop="on_show_menu(list)"
          >
          </q-btn>
        </q-item-section>
      </q-item>
    </q-list>
    <empty-state
      title="Nothing to show here."
      desc="Curation is an art, use the <span class='mdi mdi-check-box-multiple-outline'></span> button wisely"
      image="/img/empty/3.svg"
      v-else
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
import { LIST_DELETE } from "@/store/actions";
import PopupMenu from "@/components/PopupMenu";
export default {
  components: {
    PopupMenu,
  },
  props: {
    lists: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      active_list: null,
      show_menu: false,
      options: [
        // { name: "Rename", icon: "mdi-border-color", emit: "rename" },
        { name: "Delete", icon: "mdi-trash-can", emit: "delete" },
      ],
    };
  },
  methods: {
    on_option_select(option) {
      if (option.emit === "delete") this.on_delete();
      if (option.emit === "rename") this.on_rename();
    },
    on_show_menu(list) {
      this.active_list = list;
      this.show_menu = true;
    },
    on_delete() {
      this.$store.dispatch(LIST_DELETE, this.active_list);
    },
    on_rename() {},
  },
};
</script>