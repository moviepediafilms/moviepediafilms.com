<template>
  <q-footer reveal elevated outside-arrows mobile-arrows class="text-white">
    <q-tabs v-model="tab" class="bg-primary text-dark shadow-2">
      <q-route-tab
        name="submit"
        icon="mdi-plus"
        label="Submit"
        :to="{ name: 'submit' }"
      />
      <q-route-tab
        name="top"
        icon="mdi-trophy-variant-outline"
        label="Top Creators"
        :to="{ name: 'top-creator' }"
      />
      <q-route-tab
        name="profile"
        icon="mdi-account-outline"
        label="Profile"
        :to="{ name: 'profile', params: { id: 'me' } }"
        exact
      />
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