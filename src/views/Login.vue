<template>
  <base-layout>
    <div class="q-ma-md text-center q-pt-lg">
      <h3 class="text-primary">Login</h3>
      <p class="q-mt-sm">Enter your credentials to get started!</p>

      <q-form class="row justify-center q-mt-lg" @submit="attempt_login">
        <div class="q-gutter-md" style="width: 350px">
          <q-input
            v-model="login_data.email"
            type="email"
            required
            filled
            label="Your Email"
            :error-message="login_error.email"
            :error="!!login_error.email"
            :rules="[
              (val) => (val && val.length > 0) || 'Please enter your email',
            ]"
          />
          <q-input
            v-model="login_data.password"
            label="Password"
            filled
            :error-message="login_error.password"
            :error="!!login_error.password"
            :type="isPwd ? 'password' : 'text'"
            :rules="[
              (val) => (val && val.length > 0) || 'Please enter your password',
            ]"
          >
            <template v-slot:append>
              <q-icon
                size="xs"
                :name="isPwd ? 'mdi-eye-off' : 'mdi-eye'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <div class="text-negative">
            {{ error_msg }}
          </div>
          <q-btn color="primary" text-color="dark" type="submit">Login</q-btn>

          <div>
            Don't have an account?
            <b
              ><router-link class="text-primary" :to="{ name: 'signup' }"
                >Create One</router-link
              ></b
            >
          </div>
          <div>
            <router-link
              :to="{ name: 'forgot-password' }"
              class="text-weight-bold text-primary"
              >Forgot password ?</router-link
            >
          </div>
        </div>
      </q-form>
    </div>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/Base";
import { AUTH_REQUEST } from "@/store/actions";
export default {
  name: "login-page",
  components: {
    BaseLayout,
  },
  metaInfo: {
    title: "Login",
  },
  data() {
    return {
      isPwd: true,
      error_msg: "",
      login_error: {
        email: "",
        password: "",
      },
      login_data: {
        email: "",
        password: "",
      },
    };
  },
  computed: {
    has_history() {
      return window.history.length > 2;
    },
  },
  methods: {
    clear_errors() {
      this.login_error.email = "";
      this.login_error.password = "";
      this.error_msg = "";
    },
    attempt_login() {
      this.clear_errors();
      var payload = {
        username: this.login_data.email.toLowerCase(),
        password: this.login_data.password,
      };
      this.$store
        .dispatch(AUTH_REQUEST, payload)
        .then(() => {
          if (this.has_history && !this.$route.query.next) {
            this.$router.go(-1);
          } else this.$router.push({ name: this.$route.query.next || "home" });
        })
        .catch((error) => {
          var got_err_msg = false;
          if (error.response && error.response.data) {
            got_err_msg = this.check_fields_for_error(
              error.response.data,
              this.login_error,
              ["email", "password"]
            );
          }
          if (!got_err_msg) this.error_msg = this.decode_error_message(error);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>