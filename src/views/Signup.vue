<template>
  <base-layout>
    <div class="q-mx-md q-mb-md text-center q-pt-lg">
      <h1 class="text-primary">Love films?</h1>
      <div class="q-mt-md">
        <p v-if="is_update">
          Complete your profile to finish the approval process.
        </p>
        <p v-else>Join us and get connected with the likes of you!</p>
      </div>
      <div class="row justify-center q-mt-lg">
        <div class="col-12 col-sm-6 col-sm-offset-3 q-col-gutter-md">
          <q-form ref="submitForm" @submit="attempt_submit" class="q-gutter-md">
            <q-input
              v-model="signup_data.name"
              type="text"
              required
              filled
              label="Your Name"
              :rules="[
                (val) => (val && val.length > 0) || 'Please fill your name',
              ]"
              :error-message="signup_error.first_name || signup_error.last_name"
              :error="!!(signup_error.first_name || signup_error.last_name)"
            />
            <q-input
              v-model="signup_data.city"
              type="text"
              required
              filled
              label="City"
              hint="To get your current location, click on the location icon"
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
              :disable="!!is_update"
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
              mask="+## ##########"
              unmasked-value
              label="Mobile Number"
              :rules="[(val) => !!val || 'Please provide your contact number']"
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
                (val) => is_valid_date(val) || 'Invalid Date',
                (val) =>
                  is_above_min_age(val) ||
                  'Too early for you to register, wait till you are 13 years old',
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
                      :navigation-max-year-month="minus_18_yrs"
                      default-view="Calendar"
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
        </div>
      </div>
    </div>
  </base-layout>
</template>
<script>
import moment from "moment";
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
      loading: false,
      location_support: true,
      getting_location: false,
      location: undefined,
      signup_error: {
        first_name: "",
        last_name: "",
        email: "",
        city: "",
        mobile: "",
        gender: "",
        dob: "",
        password: "",
        accept: "",
      },
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
        mobile: "91",
        gender: "",
        dob: "",
        password: "",
        cnf_password: "",
        accept: false,
      },
    };
  },
  computed: {
    is_update() {
      return this.token && this.email;
    },
    token() {
      return this.$route.query.token;
    },
    email() {
      return this.$route.query.email;
    },
    profile_id() {
      return this.$route.query.id;
    },
    minus_18_yrs() {
      var tmp_date = new Date();
      var year = tmp_date.getFullYear() - 13;
      var month = tmp_date.getMonth() + 1;
      return `${year}/${month}`;
    },
    signup_payload() {
      var name_segs = this.signup_data.name.split(/[\s,]+/);
      var first_name = "";
      var last_name = "";
      if (name_segs.length > 0) first_name = name_segs.shift();
      if (name_segs.length > 0) last_name = name_segs.join(" ");
      var data = {
        user: {
          first_name: first_name,
          last_name: last_name,
          email: this.signup_data.email,
          password: this.signup_data.password,
        },
        city: this.signup_data.city,
        dob: this.signup_data.dob,
        gender: this.signup_data.gender,
        mobile: this.signup_data.mobile,
      };
      if (this.is_update) {
        delete data["user"]["email"];
      }
      return data;
    },
  },
  mounted() {
    this.set_initial_dob();
    if (this.is_update) {
      this.signup_data.email = this.email;
    }
  },
  methods: {
    is_valid_date(date_str) {
      return moment(date_str, "YYYY-MM-DD").isValid();
    },
    get_last_valid_dob() {
      var min_age = 13;
      var today = new Date();
      return new Date(today.getFullYear() - min_age, today.getMonth() + 1);
    },
    set_initial_dob() {
      var last_valid_date = this.get_last_valid_dob();
      this.signup_data.dob = last_valid_date.toISOString().split("T")[0];
    },
    is_above_min_age(selected_date) {
      var last_valid_date = this.get_last_valid_dob();
      return moment(selected_date).isSameOrBefore(last_valid_date);
    },
    clear_errors() {
      this.signup_error = {
        first_name: "",
        last_name: "",
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
        var payload = Object.assign({ token: this.token }, this.signup_payload);
        var action = this.profile_id ? "patch" : "post";
        var args = this.profile_id
          ? [payload, `${this.profile_id}`]
          : [payload];
        profile_service[action](...args)
          .then(() => {
            // flash a success message then redirect to login
            this.loading = false;
            this.$q.notify({
              duration: 5000,
              message: "You have successfully signed up. An activation link has been sent to your email for verification.",
              multiLine: true,
              icon: "mdi-check",
              color: "green",
              textColor: "white",
            });
            this.$router.push({ name: "login", query: { next: "home" } });
          })
          .catch((error) => {
            var found_field_error = false;
            if (error.response && error.response.data) {
              found_field_error = this.check_fields_for_error(
                error.response.data,
                this.signup_error,
                ["city", "dob", "gender", "mobile"]
              );
              if (error.response.data.user)
                found_field_error = this.check_fields_for_error(
                  error.response.data.user,
                  this.signup_error,
                  ["first_name", "last_name", "email", "password"]
                );
            }
            if (found_field_error) {
              this.error_msg = "Please fix the error(s) above to continue";
            } else this.error_msg = this.decode_error_message(error);
            this.loading = false;
          });
      });
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