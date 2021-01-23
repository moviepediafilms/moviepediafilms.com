<template>
  <div class="full-height q-pa-xs">
    <q-skeleton
      type="rect"
      animation="fade"
      :width="width + 'px'"
      :height="height + 'px'"
    />
    <div class="q-mt-sm">
      <q-skeleton
        width="35px"
        height="20px"
        type="rect"
        animation="fade"
        style="display: inline-block"
      />
      <q-skeleton
        type="rect"
        animation="fade"
        width="55px"
        height="20px"
        style="display: inline-block; float: right"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    height: {
      type: Number,
      default: 195,
    },
    width: {
      type: Number,
      default: 110,
    },
  },
};
</script>