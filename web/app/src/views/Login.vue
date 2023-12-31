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
          <q-btn
            color="primary"
            text-color="dark"
            type="submit"
            :disable="loading"
            >Login</q-btn
          >
          <div class="text-overline text-caption">OR</div>
          <q-btn
            color="blue"
            :disable="loading"
            text-color="white"
            icon="mdi-google"
            label="Continue with Google"
            @click="startLogin"
          />
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
import settings from "@/settings";
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
      loading: false,
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
    startLogin() {
      this.loading = true;
      window.gapi.load("auth2", () => {
        window.gapi.auth2.authorize(
          {
            clientId: settings.GOOGLE_CLIENT_ID,
            scope:
              "profile email https://www.googleapis.com/auth/user.phonenumbers.read https://www.googleapis.com/auth/user.gender.read https://www.googleapis.com/auth/user.birthday.read",
            prompt: "select_account",
            response_type: "id_token code",
          },
          (response) => {
            this.loading = false;
            console.log(response);
            if (response.error) {
              console.log(response.error);
              this.error_msg = "An Unexpected error was encountered";
              return;
            }
            this.trigger_login({
              id_token: response.id_token,
              code: response.code,
            });
          }
        );
      });
    },
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
      this.trigger_login(payload);
    },
    trigger_login(payload) {
      if (this.loading) return;
      this.loading = true;
      this.$store
        .dispatch(AUTH_REQUEST, payload)
        .then(() => {
          this.loading = false;
          if (this.has_history && !this.$route.query.next) {
            this.$router.go(-1);
          } else this.$router.push({ name: this.$route.query.next || "home" });
        })
        .catch((error) => {
          this.loading = false;
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