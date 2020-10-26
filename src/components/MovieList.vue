<template>
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
        <q-item-label class="">{{ item.title }}</q-item-label>
        <q-item-label caption>{{ item.about }}</q-item-label>
      </q-item-section>
      <q-item-section side @click.stop="show_menu">
        <q-btn round flat icon="mdi-dots-vertical" />
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script>
export default {
  props: ["source"],
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {
    on_item_click(item) {
      this.$emit("item-selected", item);
    },
    show_menu() {
      console.log("Menu clicked");
    },
  },
};
</script>