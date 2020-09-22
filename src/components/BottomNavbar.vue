<template>
  <q-footer reveal elevated outside-arrows mobile-arrows class="text-white">
    <q-tabs v-model="tab" class="bg-primary text-dark shadow-2">
      <q-tab name="submit" icon="mdi-plus" label="Submit" />

      <q-tab name="top" icon="mdi-trophy-variant-outline" label="Top Creator" />
      <q-route-tab name="profile" icon="mdi-account-outline" label="Profile" to="/profile" exact />
    </q-tabs>
  </q-footer>
</template>
<script>
export default {
  data() {
    return {
      tab: "",
    };
  },
};
</script>