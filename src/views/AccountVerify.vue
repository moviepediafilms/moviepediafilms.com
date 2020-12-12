<template>
  <base-layout>
    <div class="q-mt-md text-center">
      <h1 class="text-primary">Account Verification</h1>
      <div class="q-mt-lg">
        <q-spinner-dots size="48px" color="primary" v-if="loading" />
        <q-icon
          :name="success ? 'mdi-check' : 'mdi-close'"
          :color="success ? 'green' : 'red'"
          size="48px"
          v-else
        />
        <br />
        <div class="text-body1 q-mt-md">{{ message }}</div>
      </div>
    </div>
  </base-layout>
</template>
<script>
import { account_verify_service } from "@/services";
import BaseLayout from "@/layouts/Base";
export default {
  components: { BaseLayout },
  data() {
    return {
      success: undefined,
      message: "Please wait! verifying your account",
      loading: true,
    };
  },
  computed: {
    token() {
      return this.$route.params.token;
    },
  },
  mounted() {
    this.verify_account();
  },
  methods: {
    verify_account() {
      account_verify_service
        .get({}, this.token)
        .then((data) => {
          this.message = data.message;
          this.loading = false;
          this.success = true;
        })
        .catch((error) => {
          this.message = this.decode_error_message(error);
          this.loading = false;
          this.success = false;
        });
    },
  },
};
</script>