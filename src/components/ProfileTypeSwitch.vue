<template>
  <q-toggle
    flat
    text
    class="text-grey-6"
    color="primary"
    size="xs"
    @input="on_toggle"
    :value="filmmaker"
    :label="filmmaker ? 'Filmmaker' : 'Audience'"
  />
</template>
<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    filmmaker: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    on_toggle() {
      if (!this.disabled) this.$emit("toggle");
      else console.log("show popup about why its disabled");
    },
  },
};
</script>