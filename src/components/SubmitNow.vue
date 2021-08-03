<template>
  <q-btn
    color="primary"
    rounded
    text-color="dark"
    class="text-uppercase q-px-md q-py-xs text-dark mp-btn"
    :to="{ name: 'submit' }"
    translate=""
    ><div class="">
      <div style="line-height: 1">Submit</div>
      <div style="line-height: 1" class="text-right q-pr-sm">Film</div>
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
  letter-spacing: 6px;
}
</style>