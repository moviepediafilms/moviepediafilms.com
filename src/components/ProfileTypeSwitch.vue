<template>
  <div>
    <q-btn-toggle
      size="sm"
      rounded
      v-model="btn_value"
      toggle-color="primary"
      class="text-white q-mt-md"
      toggle-text-color="dark"
      @input="on_toggle"
      :options="[
        { label: 'Curator', value: filmmaker },
        { label: 'Creator', value: !filmmaker },
      ]"
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
      if (!this.disabled) this.$emit("toggle");
      else {
        // reverse the use action
        this.btn_value = !this.btn_value;
        this.$q.notify({
          color: "negative",
          textColor: "white",
          timeout: 5000,
          icon: "mdi-alert-circle",
          message:
            "Creator Profile will be unlocked 24 hours after you submit a movie as director on our platform.",
        });
      }
    },
  },
};
</script>