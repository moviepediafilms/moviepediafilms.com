<template>
  <q-dialog :value="show" @hide="$emit('hide')" :persistent="persistent">
    <q-card>
      <q-card-section class="row items-center">
        <div class="text-center negative">
          <q-icon color="red" size="50px" :name="icon" />
          <div class="q-mt-sm">{{ message }}</div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="to login"
          :to="{ name: 'login' }"
          color="primary"
          v-close-popup
        />
      </q-card-actions>
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
    message: {
      type: String,
      default: "You need to sign in before doing that",
    },
    icon: {
      type: String,
      default: "mdi-alert-circle-outline",
    },
    persistent: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
};
</script>