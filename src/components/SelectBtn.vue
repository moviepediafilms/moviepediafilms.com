<template>
  <q-btn
    color="primary"
    rounded
    text-color="dark"
    class="text-uppercase q-px-md q-py-xs text-dark mp-btn"
    :to="{ name: 'movies-by-genre', params: { genre: '5' } }"
    translate=""
    ><div class="">
      <div class="spaced" style="line-height: 1">Moviepedia</div>
      <div style="line-height: 1">Select</div>
    </div>
  </q-btn>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style scoped>
.mp-btn {
  font-family: "Prompt", "-apple-system", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  letter-spacing: 2px;
}
.spaced {
  letter-spacing: 6px;
}
</style>