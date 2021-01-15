<template>
  <base-layout>
    <div class="q-mt-md text-center">
      <h1 class="text-primary">Account Verification</h1>
      <div class="q-mt-lg">
        <q-spinner-dots size="48px" color="primary" v-if="loading" />
        <transition appear v-on:enter="enter" v-else>
          <q-icon
            :name="success ? 'mdi-check' : 'mdi-close'"
            :color="success ? 'green' : 'red'"
            size="48px"
          />
        </transition>
        <br />
        <div class="text-body1 q-mt-md">{{ message }}</div>
        <q-btn
          class="q-mt-md"
          label="Login"
          color="primary"
          text-color="dark"
          :to="{ name: 'login', query: { next: 'home' } }"
          v-if="success"
        />
        <div class="q-mt-md" v-else>
          Click <a class="text-primary" @click="resend = true">here</a> to
          resend activation email.
        </div>
      </div>
      <q-dialog v-model="resend">
        <q-card style="width: 400px; max-width: 70vw" class="text-center">
          <q-card-section>
            <h3 class="text-primary">Resend Activation Link</h3>
          </q-card-section>
          <q-card-section>
            <q-input
              type="email"
              v-model="email"
              :rules="[(val) => !!val || 'Please enter your email']"
              label="Your Email"
              filled
            ></q-input>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="default" v-close-popup />
            <q-btn
              flat
              label="Send"
              color="primary"
              :disable="!email"
              @click="resend_activation"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </base-layout>
</template>
<script>
import { account_service } from "@/services";
import BaseLayout from "@/layouts/Base";
export default {
  metaInfo: {
    title: "Account Verification",
  },
  components: { BaseLayout },
  data() {
    return {
      email: "",
      resend: false,
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
    enter(el) {
      this.$gsap.from(el, {
        scale: 0,
        ease: "back",
        duration: 0.6,
      });
    },
    resend_activation() {
      account_service
        .post({ email: this.email }, "resend")
        .then(() => {
          this.$q.notify({
            icon: "mdi-check",
            color: "positive",
            duration: 5000,
            textColor: "white",
            message:
              "If your account exists on our system, you will receive an email with an activation link.",
          });
        })
        .catch((error) => {
          var message = "";
          if (error.response && error.response.data)
            message = this.first_of(error.response.data.email);
          this.$q.notify({
            icon: "mdi-alert-circle",
            color: "negative",
            duration: 5000,
            textColor: "white",
            message: message || this.decode_error_message(error),
          });
        });
    },
    verify_account() {
      account_service
        .get({}, `${this.token}/verify`)
        .then((data) => {
          this.success = data.success;
          this.loading = false;

          if (data.success) {
            this.message = "Account Activated! Please login to proceed.";
          } else {
            this.message =
              "Account activation failed! Your activation link has expired.";
          }
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