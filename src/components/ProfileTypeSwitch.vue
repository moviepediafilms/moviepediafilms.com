<template>
  <div>
    <q-btn-toggle
      size="xs"
      rounded
      v-model="btn_value"
      toggle-color="primary"
      class="text-white"
      toggle-text-color="dark"
      @input="on_toggle"
      :options="[
        { label: 'Curator', value: filmmaker },
        { label: 'Creator', value: !filmmaker },
      ]"
    /><br />
    <q-toggle
      flat
      text
      class="text-grey-6"
      color="primary"
      size="xs"
      @input="on_toggle"
      :value="filmmaker"
      :label="filmmaker ? 'Creator' : 'Curator'"
      v-if="false"
    />
  </div>
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
  data() {
    return {
      btn_value: false,
    };
  },
  watch: {
    btn_value() {
      // if (!this.disabled) this.$emit("toggle");
      // else console.log("show popup about why its disabled");
    },
  },
  methods: {
    on_toggle() {
      console.log("toglling");
      if (!this.disabled) this.$emit("toggle");
      else {
        // reverse the use action
        this.btn_value = !this.btn_value;
        this.$q.notify({
          color: "negative",
          textColor: "white",
          timeout: 5000,
          message: "Submit films to unlock Creator profile",
        });
      }
    },
  },
};
</script>