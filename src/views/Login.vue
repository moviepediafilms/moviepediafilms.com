<template>
  <base-layout>
    <div class="q-ma-md text-center q-pt-lg">
      <h3 class="text-primary">Login</h3>
      <p class="q-mt-sm">Enter your credentials to get started!</p>
      <div class="row justify-center q-mt-lg">
        <div class="q-gutter-md" style="width: 350px">
          <q-input
            v-model="login_data.email"
            type="email"
            required
            filled
            label="Your Email"
            :rules="[
              (val) => (val && val.length > 0) || 'Please enter your email',
            ]"
          />
          <q-input
            v-model="login_data.password"
            label="Password"
            filled
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
          <q-btn
            color="primary"
            text-color="dark"
            @click.prevent="attempt_login"
            >Login</q-btn
          >
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
      </div>
    </div>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/Base";
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
      login_data: {
        email: "",
        password: "",
      },
    };
  },
  mounted() {},
  methods: {
    attempt_login() {},
  },
};
</script>
<style lang="scss" scoped>
</style>