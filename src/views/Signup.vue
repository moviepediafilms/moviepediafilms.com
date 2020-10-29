<template>
  <base-layout>
    <div class="q-ma-md text-center q-pt-lg">
      <h3 class="text-primary">Sign Up</h3>
      <p class="q-mt-sm">Join us to get enaged with likes of you!</p>
      <div class="row justify-center q-mt-lg">
        <div class="col-12 col-sm-6 col-sm-offset-3 q-col-gutter-md">
          <q-form
            ref="submitForm"
            @submit="attempt_submit"
            class="q-gutter-md"
            v-if="!signup_success"
          >
            <q-input
              v-model="signup_data.name"
              type="text"
              required
              filled
              label="Your Name"
              :rules="[
                (val) => (val && val.length > 0) || 'Please fill your name',
              ]"
              :error-message="signup_error.name"
              :error="!!signup_error.name"
            />
            <q-input
              v-model="signup_data.city"
              type="text"
              required
              filled
              label="City"
              hint="To get your current location, click on the icon"
              :rules="[
                (val) => (val && val.length > 0) || 'Please fill your city',
              ]"
              :error-message="signup_error.city"
              :error="!!signup_error.city"
            >
              <template v-slot:append>
                <q-icon
                  :name="
                    getting_location
                      ? 'mdi-loading mdi-spin'
                      : 'mdi-map-marker-outline'
                  "
                  @click="get_current_location"
                  class="cursor-pointer"
                />
              </template>
            </q-input>
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
              :error-message="signup_error.email"
              :error="!!signup_error.email || !!signup_error.username"
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
                (val) => val.length == 10 || '10 digits required',
              ]"
              :error-message="signup_error.mobile"
              :error="!!signup_error.mobile"
            />
            <q-select
              filled
              transition-show="scale"
              transition-hide="scale"
              v-model="signup_data.gender"
              :options="genders"
              emit-value
              map-options
              label="Gender"
              :rules="[
                (val) => (val && val.length > 0) || 'Please select your gender',
              ]"
              :error-message="signup_error.gender"
              :error="!!signup_error.gender"
            />
            <q-input
              filled
              v-model="signup_data.dob"
              mask="####-##-##"
              label="Your Birthday"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Please selected your birthday',
                (val) => val.length == 10 || 'Invalid Date',
              ]"
              :error-message="signup_error.dob"
              :error="!!signup_error.dob"
            >
              <template v-slot:append>
                <q-icon name="mdi-calendar" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="signup_data.dob"
                      text-color="dark"
                      mask="YYYY-MM-DD"
                      default-view="Years"
                    >
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="ok" color="primary" flat />
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
                (val) =>
                  val.length > 5 || 'Password should be atleast 6 characters',
              ]"
              :error-message="signup_error.password"
              :error="!!signup_error.password"
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
                  v-model="signup_data.roles"
                  :val="role.value"
                  :label="role.label"
                  v-for="role in possible_roles"
                  :key="role.value"
                />
              </div>
            </div>
            <div>
              <q-field
                borderless
                v-model="signup_data.accept"
                :rules="[
                  (val) => val == true || 'Please accept terms and conditions',
                ]"
              >
                <div class="self-center">
                  <q-checkbox
                    class="q-mb-0"
                    v-model="signup_data.accept"
                    color="primary"
                  />
                  I accept the
                  <router-link
                    class="text-primary"
                    :to="{ name: 'tos' }"
                    target="_blank"
                    >terms and conditions</router-link
                  >
                </div>
              </q-field>
            </div>
            <div class="text-negative">
              {{ error_msg }}
            </div>
            <q-btn
              label="Register"
              @click="attempt_submit"
              :disabled="loading"
              color="primary"
              text-color="dark"
            />

            <div class="q-mt-lg">
              Already have an account?
              <router-link :to="{ name: 'login' }" class="text-primary"
                >Sign In</router-link
              >
            </div>
          </q-form>
          <q-slide-transition>
            <div v-if="signup_success">
              <q-icon name="mdi-check-circle" color="green-5" size="190px" />

              <p class="q-mt-md">You have successfully signed up!</p>
              <q-btn
                :to="{ name: 'login', query: { next: 'home' } }"
                color="primary"
                text-color="dark"
              >
                Proceed to Login
              </q-btn>
            </div>
          </q-slide-transition>
        </div>
      </div>
    </div>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/Base";
import { location_service, profile_service } from "@/services";
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
      error_msg: "",
      signup_success: false,
      loading: false,
      location_support: true,
      getting_location: false,
      location: undefined,
      signup_error: {
        name: "",
        email: "",
        city: "",
        mobile: "",
        gender: "",
        dob: "",
        password: "",
        accept: "",
      },
      possible_roles: [
        { value: "Actor", label: "Actor" },
        { value: "Director", label: "Director" },
        { value: "Producer", label: "Producer" },
        { value: "Musician", label: "Musician" },
        { value: "Singer", label: "Singer" },
      ],
      genders: [
        { value: null, label: "Select" },
        { value: "M", label: "Male" },
        { value: "F", label: "Female" },
        { value: "O", label: "Rather Not Say" },
      ],
      signup_data: {
        name: "",
        email: "",
        city: "",
        mobile: "",
        gender: "",
        dob: "",
        password: "",
        cnf_password: "",
        roles: [],
        accept: false,
      },
    };
  },
  computed: {
    signup_payload() {
      var role_objs = [];
      this.signup_data.roles.forEach((role_name) => {
        role_objs.push({ name: role_name });
      });
      var name_segs = this.signup_data.name.split(/[\s,]+/);
      var first_name = "";
      var last_name = "";
      if (name_segs.length > 0) first_name = name_segs.shift();
      if (name_segs.length > 0) last_name = name_segs.join(" ");
      return {
        user: {
          first_name: first_name,
          last_name: last_name,
          email: this.signup_data.email,
          password: this.signup_data.password,
          username: this.signup_data.email,
        },
        city: this.signup_data.city,
        dob: this.signup_data.dob,
        gender: this.signup_data.gender,
        mobile: this.signup_data.mobile,
        roles: role_objs,
      };
    },
  },
  methods: {
    clear_errors() {
      this.signup_error = {
        name: "",
        email: "",
        city: "",
        mobile: "",
        gender: "",
        dob: "",
        password: "",
        accept: false,
      };
      this.error_msg = "";
    },
    validate_accept() {
      var error_found = false;
      if (!this.signup_data.accept) {
        this.signup_error.accept = true;
        error_found = true;
      }
      return !error_found;
    },
    attempt_submit() {
      this.clear_errors();
      this.$refs.submitForm.validate().then((valid) => {
        if (!valid) {
          return;
        }
        this.loading = true;
        console.log(this.signup_payload);
        profile_service
          .post(this.signup_payload)
          .then((data) => {
            this.scroll_top();
            console.log(data);
            // flash a success message then route to login
            this.signup_success = true;
            this.loading = false;
          })
          .catch((error) => {
            console.log(error.response.data);
            this.map_signup_error(error.response.data);
            if (!this.error_msg) this.error_msg = error.toJSON().message;
            this.loading = false;
          });
      });
    },
    map_signup_error(err) {
      if (err.user) {
        this.signup_error.email =
          this.first_of(err.user.email) || this.first_of(err.user.username);
        this.signup_error.name =
          this.first_of(err.user.first_name) ||
          this.first_of(err.user.last_name);
        this.signup_error.password = this.first_of(err.user.password);
      }
      this.signup_error.city = this.first_of(err.city);
      this.signup_error.dob = this.first_of(err.dob);
      this.signup_error.gender = this.first_of(err.gender);
      this.signup_error.mobile = this.first_of(err.mobile);
      if (err.non_field_errors)
        this.error_msg = this.first_of(err.non_field_errors);
      if (
        this.signup_error.mobile ||
        this.signup_error.gender ||
        this.signup_error.dob ||
        this.signup_error.city ||
        this.signup_error.password ||
        this.signup_error.name ||
        (this.signup_error.email && !this.error_msg)
      )
        this.error_msg = "Please resolve above errors";
    },
    get_current_location() {
      if (this.getting_location) return;
      //do we support geolocation
      if (!("geolocation" in navigator)) {
        this.location_support = false;
        return;
      }

      this.getting_location = true;
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.location = pos;
          this.convert_location_to_city();
        },
        () => {
          this.getting_location = false;
        }
      );
    },
    convert_location_to_city() {
      // get human readable location using HERE API
      this.getting_location = true;
      location_service
        .get({
          at: `${this.location.coords.latitude},${this.location.coords.longitude}`,
        })
        .then((data) => {
          var address = data.items[0].address;
          this.signup_data.city = `${address.city}, ${address.stateCode}, ${address.countryName}`;
          this.getting_location = false;
        })
        .catch((error) => {
          console.log(error);
          this.getting_location = false;
        });
    },
  },
};
</script>
<style lang="scss">
.q-checkbox__svg {
  color: black;
}
</style>