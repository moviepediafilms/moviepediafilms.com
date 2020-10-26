<template>
  <q-list>
    <q-item v-for="item in source" :key="item.id">
      <q-item-section top thumbnail class="q-ml-none">
        <img :src="item.poster" />
      </q-item-section>

      <q-item-section>
        <q-item-label class="">{{ item.title }}</q-item-label>
        <q-item-label caption>{{ item.about }}</q-item-label>
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
  methods: {},
};
</script>