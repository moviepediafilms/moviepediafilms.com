<template>
  <q-footer reveal elevated outside-arrows mobile-arrows class="text-white">
    <q-tabs v-model="tab" class="bg-primary text-dark shadow-2" dense>
      <q-route-tab
        name="submit"
        icon="mdi-plus mdi-18px"
        label="Submit"
        no-caps
        :to="{ name: 'submit' }"
      />
      <q-route-tab
        name="top-creator"
        icon="mdi-trophy-variant-outline mdi-18px"
        label="Top Creators"
        no-caps
        :to="{ name: 'top-creator' }"
      />
      <q-route-tab
        name="top-curators"
        icon="mdi-trophy-variant-outline mdi-18px"
        label="Top Curators"
        no-caps
        :to="{ name: 'top-curator' }"
      />
      <q-route-tab
        name="profile"
        icon="mdi-account-outline mdi-18px"
        label="Profile"
        no-caps
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