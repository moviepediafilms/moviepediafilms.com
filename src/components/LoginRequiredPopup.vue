<template>
  <q-dialog :value="show" @hide="$emit('hide')">
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar size="56px" :icon="icon"></q-avatar>
        <span>{{ message }}</span>
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
      default: "mdi-account-circle-outline",
    },
  },
  data() {
    return {};
  },
};
</script>