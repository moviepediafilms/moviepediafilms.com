<template>
  <base-layout>
    <div class="q-ma-md text-center q-pt-md">
      <h1 class="text-primary">Forgot Password</h1>

      <p class="q-mt-md">Enter your email address to reset your password</p>
      <div class="col">
        <div class="row justify-center q-mt-sm">
          <q-form @submit="submit" ref="submit_form">
            <div class="q-gutter-md" style="width: 350px">
              <q-input
                type="email"
                label="Your Email"
                v-model="reset_data.email"
                :rules="[
                  (val) => (val && val.length > 0) || 'Please enter your email',
                ]"
                :error="!!reset_error.email"
                :error-message="reset_error.email"
              />
              <div>
                <q-field
                  borderless
                  type="text"
                  v-model="reset_data.recaptcha"
                  :error="!!reset_error.recaptcha"
                  :error-message="reset_error.recaptcha"
                  :rules="[
                    (val) =>
                      (val && val.length > 0) ||
                      'Please verify that you are not a robot',
                  ]"
                >
                  <vue-recaptcha
                    ref="recaptcha"
                    sitekey="6Le8yqMZAAAAAP29DeBG_lUiFMJSsliCzUvEPJTk"
                    @verify="verify_recaptcha"
                    :loadRecaptchaScript="true"
                    theme="dark"
                    class="captcha"
                  >
                  </vue-recaptcha>
                </q-field>

                <div class="text-negative q-mt-md" v-if="error_msg">
                  {{ error_msg }}
                </div>
              </div>
              <q-btn
                label="Reset Password"
                type="submit"
                color="primary"
                text-color="dark"
              />
            </div>
          </q-form>
        </div>
      </div>
    </div>
  </base-layout>
</template>
<script>
import VueRecaptcha from "vue-recaptcha";
import BaseLayout from "@/layouts/Base";
import { account_service } from "@/services";
export default {
  name: "forgot-password-page",
  components: {
    BaseLayout,
    VueRecaptcha,
  },
  metaInfo: {
    title: "Forgot Password",
  },
  data() {
    return {
      error_msg: undefined,
      reset_data: {
        email: null,
        recaptcha: null,
      },
      reset_error: {
        email: null,
        recaptcha: null,
      },
    };
  },
  methods: {
    clear_errors() {
      this.error_msg = "";
      this.reset_error.email = "";
      this.reset_error.recaptcha = "";
    },
    submit() {
      this.clear_errors();
      this.$refs.submit_form.validate().then((result) => {
        if (result) {
          account_service
            .post(this.reset_data, "forgot")
            .then((data) => {
              console.log(data);
              this.$q.notify({
                icon: "mdi-check",
                duration: 5000,
                color: "positive",
                textColor: "white",
                message:
                  "If your account exists with this email address, you will recieve a link to reset your password.",
              });
              this.$router.push({ name: "login", query: { next: "home" } });
            })
            .catch((error) => {
              // clear recapcha, server verification will error with duplicate if not cleared
              this.$refs.recaptcha.reset();
              this.reset_data.recaptcha = "";
              if (error.response && error.response.data)
                if (
                  this.check_fields_for_error(
                    error.response.data,
                    this.reset_error,
                    ["email", "recaptcha"]
                  )
                ) {
                  this.error_msg = "Please fix the error(s) above to continue";
                } else {
                  this.error_msg = this.decode_error_message(error);
                }
            });
        }
      });
    },
    verify_recaptcha(response) {
      if (response) {
        this.reset_data.recaptcha = response;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.captcha {
  display: inline-flex;
}
</style>