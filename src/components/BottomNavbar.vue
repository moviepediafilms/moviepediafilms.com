<template>
  <q-footer reveal elevated outside-arrows mobile-arrows class="text-white">
    <q-tabs v-model="tab" class="bg-primary text-dark shadow-2">
      <q-tab name="submit" icon="fa fa-md fa-plus" label="Submit" />
      <q-tab name="play" icon="fa fa-md fa-play" label="Play & Win" />
      <q-tab name="top" icon="fa fa-md fa-user" label="Top Creator" />
      <q-route-tab name="profile" icon="fa fa-md fa-user" label="Profile" to="/profile" exact />
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