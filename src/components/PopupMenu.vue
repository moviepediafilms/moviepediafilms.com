<template>
  <q-dialog ref="dialog" @hide="$emit('hide')">
    <q-card class="" style="width: 400px; max-width: 70vw">
      <q-card-section>
        <q-list class="">
          <q-item
            @click.stop="on_option_select(option)"
            clickable
            v-ripple
            v-close-popup
            v-for="option in options"
            :key="option.name"
          >
            <q-item-section side v-if="option.icon">
              <q-icon :name="option.icon" size="xs" />
            </q-item-section>
            <q-item-section> {{ option.name }} </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  watch: {
    show() {
      if (this.show) this.$refs.dialog.show();
    },
  },
  methods: {
    on_option_select(option) {
      this.$emit("select", option);
    },
  },
};
</script>