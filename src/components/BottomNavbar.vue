<template>
  <q-footer reveal elevated outside-arrows mobile-arrows class="text-white">
    <div class="flex justify-around">
      <q-tabs v-model="tab" class="bg-primary text-dark" dense>
        <q-route-tab
          name="submit"
          icon="mdi-plus mdi-18px"
          label="Submit"
          no-caps
          :to="{ name: 'submit' }"
        />

        <q-route-tab
          name="top-creator"
          icon="mdi-movie-open-outline mdi-18px"
          label="Top Creators"
          no-caps
          :to="{ name: 'top-creator' }"
        />
        <q-route-tab
          name="mdff"
          icon="mdi-ticket mdi-18px"
          label="MDFF"
          no-caps
          :to="{ name: 'mdff' }"
        />
        <!-- <q-route-tab
          name="top-curators"
          icon="mdi-bullhorn-outline mdi-18px"
          label="Top Curators"
          no-caps
          :to="{ name: 'top-curator' }"
        /> -->
        <q-route-tab
          name="profile"
          icon="mdi-account-outline mdi-18px"
          label="Profile"
          no-caps
          :to="{ name: 'profile', params: { id: 'me' } }"
          exact
        />
      </q-tabs>
    </div>
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