<template>
  <div>
    <q-list>
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
            <div class="text-title">{{ list.movies.length }}</div>
            <div class="text-caption text-uppercase" style="font-size: 0.7em">
              Movies
            </div>
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label class="text-center">
            <div class="text-title">{{ list.like_count }}</div>
            <div class="text-caption text-uppercase" style="font-size: 0.7em">
              Likes
            </div>
          </q-item-label>
        </q-item-section>
        <q-item-section side>
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
    <popup-menu
      :options="options"
      :show="show_menu"
      @hide="show_menu = false"
      @select="on_option_select"
      @remove="on_remove"
      @rename="on_rename"
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
        { name: "Rename", icon: "mdi-border-color", emit: "rename" },
        { name: "Delete", icon: "mdi-trash-can", emit: "delete" },
      ],
    };
  },
  methods: {
    on_option_select(option) {
      console.log(option, "selected");
    },
    on_show_menu(list) {
      this.active_list = list;
      this.show_menu = true;
    },
    on_remove() {
      console.log("delete", this.active_list);
    },
    on_rename() {
      console.log("rename", this.active_list);
    },
  },
};
</script>