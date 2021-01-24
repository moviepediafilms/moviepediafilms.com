<template>
  <base-layout>
    <div class="q-ma-lg text-center q-pt-md">
      <h1 class="text-primary">Reset Password</h1>
      <div class="col q-mt-lg">
        <q-form @submit="submit">
          <q-input
            type="password"
            label="Password"
            v-model="reset_data.password"
            :rules="[
              (val) => (val && val.length > 0) || 'Please enter password',
              (val) =>
                val.length >= 6 || 'Password must be at least 6 characters',
            ]"
            :error="!!reset_error.password"
            :error-message="reset_error.password"
          />
          <q-input
            type="password"
            label="Confirm Password"
            v-model="reset_data.cnf_password"
            :rules="[
              (val) => (val && val.length > 0) || 'Please enter password',
              (val) => val === reset_data.password || 'Passwords do not match',
            ]"
            :error="!!reset_error.cnf_password"
            :error-message="reset_error.cnf_password"
          />
          <q-btn
            class="q-mt-md"
            type="submit"
            label="Reset password"
            color="primary"
            text-color="dark"
          />
        </q-form>
      </div>
    </div>
  </base-layout>
</template>
<script>
import { account_service } from "@/services";
import BaseLayout from "@/layouts/Base";
export default {
  metaInfo: {
    title: "Reset Password",
  },
  components: { BaseLayout },
  data() {
    return {
      reset_data: {
        password: "",
        cnf_password: "",
      },
      reset_error: {
        password: "",
        cnf_password: "",
      },
    };
  },
  computed: {
    token() {
      return this.$route.params.token;
    },
  },
  methods: {
    clear_error() {
      this.error_msg = "";
      this.reset_error.password = "";
      this.reset_error.cnf_password = "";
    },
    submit() {
      this.clear_error();
      account_service
        .post(this.reset_data, `${this.token}/reset`)
        .then(() => {
          this.$q.notify({
            message: "Your password has been changed successfully!",
            color: "positive",
            icon: "mdi-check",
            textColor: "white",
          });
          this.$router.push({ name: "login", query: { next: "home" } });
        })
        .catch((error) => {
          console.log(error);
          if (error.response && error.response.data) {
            if (
              this.check_fields_for_error(
                error.response.data,
                this.reset_error,
                ["password", "cnf_password"]
              )
            ) {
              this.error_msg = "Please fix the error(s) above to continue";
            }
          }
          if (!this.error_msg)
            this.error_msg = this.decode_error_message(error);
        });
    },
  },
};
</script>