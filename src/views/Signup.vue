<template>
  <base-layout>
    <div class="q-ma-md text-center q-pt-lg">
      <h4 class="text-primary">Sign Up</h4>
      <p class="q-mt-sm">Join us to get enaged with likes of you!</p>
      <div class="row justify-center q-mt-lg">
        <div class="col-12 col-sm-6 col-sm-offset-3 q-col-gutter-md">
          <q-form @submit="signup" @reset="reset" class="q-gutter-md">
            <q-input
              v-model="signup_data.name"
              type="text"
              required
              filled
              label="Your Name"
              :rules="[
                (val) => (val && val.length > 0) || 'Please fill your name',
              ]"
            />
            <q-input
              v-model="signup_data.city"
              type="text"
              required
              filled
              label="City"
              :rules="[
                (val) => (val && val.length > 0) || 'Please fill your city',
              ]"
            />
            <q-input
              v-model="signup_data.email"
              type="email"
              required
              filled
              autocomplete="email"
              label="Your Email"
              :rules="[
                (val) => (val && val.length > 0) || 'Please fill your email',
              ]"
            />
            <q-input
              v-model="signup_data.mobile"
              type="tel"
              required
              filled
              mask="+91 ### ### ####"
              unmasked-value
              label="Mobile Number"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Please fill your contact number',
              ]"
            />
            <q-select
              filled
              transition-show="scale"
              transition-hide="scale"
              v-model="signup_data.sex"
              :options="genders"
              emit-value
              map-options
              label="Gender"
              :rules="[
                (val) => (val && val.length > 0) || 'Please select your gender',
              ]"
            />
            <q-input
              filled
              v-model="signup_data.dob"
              label="Your Birthday"
              mask="date"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Please select your date of birth',
              ]"
            >
              <template v-slot:append>
                <q-icon name="mdi-calendar" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="signup_data.dob"
                      text-color="dark"
                      default-view="Years"
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input
              v-model="signup_data.password"
              label="Password"
              filled
              autocomplete="new-password"
              type="password"
              :rules="[
                (val) => (val && val.length > 0) || 'Please enter a password',
              ]"
            />
            <q-input
              v-model="signup_data.cnf_password"
              label="Confirm Password"
              filled
              autocomplete="new-password"
              type="password"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Please confirm your password',
                (val) =>
                  val === signup_data.password || 'Your passwords do not match',
              ]"
            />
            <div>
              Who are you?<br />
              <small>you can select more than one or none at all</small>
              <div class="q-gutter-sm q-mt-none">
                <q-checkbox
                  v-model="signup_data.role"
                  :val="role.value"
                  :label="role.label"
                  v-for="role in possible_roles"
                  :key="role.value"
                />
              </div>
            </div>
            <div>
              <q-checkbox v-model="signup_data.accept" color="primary" />
              I accept the
              <router-link
                class="text-primary"
                :to="{ name: 'tos' }"
                target="_blank"
                >terms and conditions</router-link
              >
            </div>
            <div>
              <q-btn
                label="Register"
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
import BaseLayout from "@/layouts/Base";
export default {
  name: "sign-up-page",
  components: {
    BaseLayout,
  },
  metaInfo: {
    title: "Sign up",
  },
  data() {
    return {
      possible_roles: [
        { value: "actor", label: "Actor" },
        { value: "director", label: "Director" },
        { value: "producer", label: "Producer" },
        { value: "musician", label: "Musician" },
        { value: "singer", label: "Singer" },
      ],
      genders: [
        { value: null, label: "Select" },
        { value: "m", label: "Male" },
        { value: "f", label: "Female" },
        { value: "o", label: "Rather Not Say" },
      ],
      signup_data: {
        name: null,
        city: null,
        email: null,
        mobile: null,
        sex: null,
        dob: null,
        password: null,
        cnf_password: null,
        role: [],
        accept: false,
      },
    };
  },
  mounted() {},
  methods: {
    signup() {},
    reset() {},
  },
};
</script>
<style lang="scss">
.q-checkbox__svg {
  color: black;
}
</style>