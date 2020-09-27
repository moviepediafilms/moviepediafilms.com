<template>
  <base-layout>
    <div class="q-ma-md text-center q-pt-lg">
      <h3 class="text-primary">Forgot Password</h3>

      <p class="q-mt-md">Enter your email address to reset your password</p>
      <q-form>
        <div class="row justify-center q-mt-sm">
          <div class="q-gutter-md" style="width: 350px">
            <q-input
              type="email"
              label="Your Email"
              v-model="reset_data.email"
              :rules="[
                (val) => (val && val.length > 0) || 'Please fill your email',
              ]"
            />
            <vue-recaptcha
              sitekey="6Le8yqMZAAAAAP29DeBG_lUiFMJSsliCzUvEPJTk"
              @verify="verify_recapcha"
              :loadRecaptchaScript="true"
              theme="dark"
            ></vue-recaptcha>
            <q-btn
              label="Reset Password"
              type="submit"
              color="primary"
              text-color="dark"
            />
          </div>
        </div>
      </q-form>
    </div>
  </base-layout>
</template>
<script>
import VueRecaptcha from "vue-recaptcha";
import BaseLayout from "@/layouts/Base";
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
      reset_data: {
        email: null,
      },
      capcha_verified: false,
    };
  },
  mounted() {},
  methods: {
    verify_recapcha(response) {
      if (response) {
        this.capcha_verified = true;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>