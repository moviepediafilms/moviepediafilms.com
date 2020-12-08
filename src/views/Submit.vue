<template>
  <base-layout>
    <div class="q-ma-md text-center q-pt-lg">
      <h3 class="text-primary">Submission</h3>
      <q-stepper
        v-model="step"
        color="primary"
        vertical
        dense
        animated
        flat
        class="q-pa-none q-ma-none"
      >
        <q-step
          :name="1"
          title="What’s in it for you?"
          icon="mdi-numeric-1"
          ref="step1"
          :done="step > 1"
          :header-nav="step > 1"
        >
          <q-list padding>
            <template v-for="(value_prop, idx) in value_props">
              <q-item :key="`${idx}_item`" class="q-px-none">
                <q-item-section side top>
                  <q-icon :name="value_prop.icon" size="28px" color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-left text-grey-5">
                    {{ value_prop.text }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <!-- <q-separator spaced inset :key="`${idx}_sep`" /> -->
            </template>
          </q-list>

          <q-stepper-navigation>
            <q-btn
              @click="navigate_forward"
              color="primary"
              text-color="dark"
              label="get started"
            />
          </q-stepper-navigation>
        </q-step>

        <q-step
          :name="2"
          title="Tell us about your film"
          icon="mdi-numeric-2"
          :done="step > 2"
          ref="step2"
          :header-nav="step > 2"
        >
          <q-form ref="submit" class="q-gutter-y-md" @submit="attempt_submit">
            <div>
              <q-input
                type="text"
                v-model="submit_data.title"
                label="Movie Title"
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Please enter movie title',
                  (val) =>
                    (val && val.match(/^[\x00-\x7F]*$/)) ||
                    'Please use alpha numeric characters only',
                ]"
                :error-message="submit_error.title"
                :error="!!submit_error.title"
                filled
              ></q-input>
            </div>
            <div>
              <q-input
                type="url"
                v-model="submit_data.link"
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Please provide movie link',
                ]"
                hint="should be publicly accessible"
                label="Link"
                :error-message="submit_error.link"
                :error="!!submit_error.link"
                filled
              ></q-input>
            </div>
            <div>
              <q-select
                filled
                use-input
                v-model="submit_data.lang"
                :options="filtered_lang"
                @filter="lang_filter_fn"
                option-label="name"
                :hint="
                  submit_data.lang
                    ? submit_data.lang.name === 'English'
                      ? ''
                      : 'Subtitles required for film'
                    : ''
                "
                label="Language"
                :rules="[
                  (val) => val || 'Please select language used in movie',
                ]"
                :error-message="submit_error.lang"
                :error="!!submit_error.lang"
              />
            </div>

            <div>
              <q-input
                type="number"
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Please enter movie runtime',
                  (val) =>
                    parseInt(val) > 0 || 'Please enter valid movie runtime',
                  (val) =>
                    parseInt(val) <= 60 || 'That\'s too long for a short film',
                ]"
                v-model="submit_data.runtime"
                label="Runtime (in minutes)"
                :error-message="submit_error.runtime"
                :error="!!submit_error.runtime"
                filled
              ></q-input>
            </div>
            <div>
              <q-file
                v-model="original_poster"
                label="Poster"
                accept=".jpg, image/*"
                max-file-size="6000000"
                hint="Portrait poster of the movie"
                filled
                clearable
                @rejected="poster_rejected"
                :error-message="submit_error.poster"
                :error="!!submit_error.poster"
              ></q-file>
            </div>
            <q-field
              borderless
              label="Select Genre"
              color="white"
              stack-label
              v-model="submit_data.genres"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Please select at-least one genre',
                (val) => (val && val.length < 4) || 'You can select max of 3',
              ]"
              :error-message="submit_error.genre"
              :error="!!submit_error.genre"
            >
              <div class="q-gutter-xs text-left q-ma-none">
                <q-checkbox
                  v-model="submit_data.genres"
                  :val="genre"
                  :label="genre.name"
                  v-for="genre in genres"
                  :key="genre.name"
                />
              </div>
            </q-field>
            <div>
              <q-select
                filled
                multiple
                use-chips
                v-model="submit_data.roles"
                :options="roles"
                option-label="name"
                label="Your role(s) in film"
                :rules="[
                  (val) => val.length > 0 || 'Please select at least one',
                ]"
                :error-message="submit_error.roles"
                :error="!!submit_error.roles"
              />
            </div>
            <p class="q-mt-xs" v-if="show_director_fields">
              Tell us about the Director of the film!
            </p>
            <div v-if="show_director_fields">
              <q-input
                type="text"
                v-model="submit_data.director.name"
                label="Name"
                :rules="[(val) => !!val || 'Please enter director\'s name']"
                filled
                :error-message="submit_error.director.name"
                :error="!!submit_error.director.name"
              ></q-input>
            </div>
            <div v-if="show_director_fields">
              <q-input
                type="email"
                v-model="submit_data.director.email"
                :rules="[(val) => !!val || 'Please enter director\'s email']"
                label="Email"
                filled
                :error-message="submit_error.director.email"
                :error="!!submit_error.director.email"
              ></q-input>
            </div>
            <div v-if="show_director_fields">
              <q-input
                type="tel"
                v-model="submit_data.director.contact"
                mask="+## ##########"
                :rules="[
                  (val) => !!val || 'Please enter director\'s contact number',
                ]"
                label="Mobile"
                filled
                :error-message="submit_error.director.contact"
                :error="!!submit_error.director.contact"
              ></q-input>
            </div>
            <div class="text-negative">
              {{ error_msg }}
            </div>
          </q-form>
          <q-stepper-navigation>
            <q-btn
              @click="attempt_submit"
              color="primary"
              :loading="loading"
              text-color="dark"
              :disable="loading"
              label="Next"
            />
            <q-btn
              flat
              @click="navigate_back"
              color="primary"
              label="back"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </q-step>

        <q-step
          :name="3"
          title="Select Package"
          icon="mdi-numeric-3"
          :header-nav="step > 3"
          ref="step3"
        >
          <div class="last-step">
            <q-item
              v-for="(pack, index) in packs"
              :key="pack.id"
              clickable
              v-ripple
              @click="on_change_active_pack(pack)"
              :class="index > 0 ? 'q-mt-lg' : 'q-mt-md'"
              class="q-pa-md pack-border"
              active-class="selected-pack-border"
              :active="active_pack_id == pack.id"
            >
              <q-item-section>
                <q-item-label>
                  <h5 class="text-primary">
                    {{ pack.title }}
                    <br />
                    <small class="text-caption">{{ pack.price }}</small>
                  </h5>
                </q-item-label>
                <q-item-label class="q-pt-sm">
                  <q-item
                    dense
                    v-for="(item, idx) in pack.content"
                    :key="idx"
                    class="text-left q-pa-xs text-grey-5"
                  >
                    <q-item-section side top class="q-pr-sm">
                      <q-icon
                        :color="item.included ? 'green' : 'red'"
                        class="q-mr-xs"
                        :name="item.included ? 'mdi-check' : 'mdi-close'"
                      ></q-icon>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>
                        {{ item.text }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-item-label>
              </q-item-section>
            </q-item>
            <div class="text-negative">
              {{ error_msg }}
            </div>
            <div class="text-positive">
              {{ success_msg }}
            </div>
          </div>
          <q-stepper-navigation>
            <q-btn
              color="primary"
              text-color="dark"
              :loading="loading"
              :disable="loading"
              @click="select_package"
              label="Pay"
            />
            <q-btn
              flat
              @click="navigate_back"
              color="primary"
              label="Back"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </q-step>
      </q-stepper>
      <q-dialog :value="show_sign_in" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar size="56px" icon="mdi-account-circle-outline"></q-avatar>
            <span class="">Please Sign in to submit a movie</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              flat
              label="to login"
              :to="{ name: 'login' }"
              color="primary"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="poster_crop_dialog" ref="crop_dialog">
        <q-card style="width: 400px; max-width: 90vw">
          <q-card-section class="text-center">
            <div class="text-h6 q-mb-lg">Crop Poster</div>

            <vue-cropper
              ref="cropper"
              :aspect-ratio="9 / 16"
              :src="poster_image_url"
              alt="Movie Poster"
            >
            </vue-cropper>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat color="primary" label="Done" @click="crop_poster" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </base-layout>
</template>

<script>
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import langs from "@/extras/langs";
import BaseLayout from "@/layouts/Base";
import { submission_service, payment_service } from "@/services";
export default {
  name: "submit-page",
  components: {
    BaseLayout,
    VueCropper,
  },
  metaInfo: {
    title: "Submit",
  },
  data() {
    return {
      step: 1,
      active_pack_id: 2,
      packs: [
        {
          id: 2,
          title: "Premium Pack",
          price: "INR 399 + INR 99",
          content: [
            { text: "Filmmaker of the Month", included: true },
            { text: "Facebook Marketing", included: true },
            { text: "E-mail Campaigns", included: true },
            { text: "Celebrity Recommendation", included: true },
            { text: "Instagram Promotion", included: true },
            { text: "Moviepedia Feature Review", included: true },
          ],
          active: false,
        },
        {
          id: 1,
          title: "Standard Pack",
          price: "INR 399",
          content: [
            { text: "Filmmaker of the Month", included: true },
            { text: "Facebook Marketing", included: true },
            { text: "E-mail Campaigns", included: true },
            { text: "Celebrity Recommendation", included: false },
            { text: "Instagram Promotion", included: false },
            { text: "Moviepedia Feature Review", included: false },
          ],
          active: false,
        },
      ],
      submitted_movie: undefined,
      value_props: [
        {
          icon: "mdi-account-group",
          color: "light-green",
          text:
            "We provide you the platform to set up your own OTT profile, supporting fundraising to screening of your films.",
        },
        {
          icon: "mdi-youtube",
          color: "red-8",
          text:
            "Build a consistent audience for your YouTube releases. We drive a traffic of over 160,000 cinephiles to your content.",
        },
        {
          icon: "mdi-account-star",
          color: "blue",
          text:
            "Your film reaches the network of our ‘Partner Celebs’ and stands a chance to get recommended across our network.",
        },
        {
          icon: "mdi-trophy",
          color: "amber",
          text:
            "You stand a chance to win the ‘Filmmaker of the Month’ title, cash prize of over Rs.15,000 and an extended feature period on the platform.",
        },
        {
          icon: "mdi-bullseye-arrow",
          color: "deep-purple",
          text:
            "We curate your profile as a filmmaker and connect you with the audience. We strive to manage your reputation as a filmmaker.",
        },
        {
          icon: "mdi-check-decagram",
          color: "light-blue",
          text:
            "We simplify the fundraising for your projects. We connect you with film enthusiasts to get your projects funded.",
        },
      ],
      languages: Object.values(langs),
      filtered_lang: [],
      genres: [
        { name: "Action" },
        { name: "Crime" },
        { name: "Comedy" },
        { name: "Romance" },
        { name: "Drama" },
        { name: "Horror" },
        { name: "Mystery" },
        { name: "Thriller" },
        { name: "Others" },
      ],
      roles: [
        { name: "Actor" },
        { name: "Director" },
        { name: "Producer" },
        { name: "Singer" },
        { name: "Musician" },
      ],
      loading: false,
      submit_error: {
        title: "",
        link: "",
        lang: "",
        runtime: "",
        poster: "",
        roles: "",
        genres: "",
        director: {
          name: "",
          email: "",
          contact: "",
        },
      },
      original_poster: undefined,
      poster: undefined,
      poster_crop_dialog: false,
      error_msg: "",
      success_msg: "",
      submit_data: {
        title: "",
        link: "",
        lang: undefined,
        runtime: "",
        poster: "",
        roles: [],
        genres: [],
        director: {
          name: "",
          email: "",
          contact: "91",
        },
      },
    };
  },
  mounted() {
    this.filtered_lang = this.languages;
    let script = document.createElement("script");
    script.setAttribute("src", "https://checkout.razorpay.com/v1/checkout.js");
    document.head.appendChild(script);
  },
  computed: {
    show_sign_in() {
      return this.step > 1 && !this.is_authenticated;
    },
    show_director_fields() {
      var show = true;
      this.submit_data.roles.forEach((role) => {
        if (role.name === "Director") show = false;
      });
      return show;
    },
    language_names() {
      var names = [];
      for (var lang in this.languages) {
        names.push(lang.name);
      }
      return names;
    },
    selected_pack() {
      var selected = null;
      this.packs.forEach((pack) => {
        if (pack.id == this.active_pack_id) selected = pack;
      });
      return { name: selected.title };
    },
    poster_image_url() {
      if (this.original_poster)
        return URL.createObjectURL(this.original_poster);
      return this.original_poster;
    },
  },
  watch: {
    poster_crop_dialog(value) {
      if (!value && !this.submit_data.poster) {
        this.original_poster = undefined;
      }
    },
    original_poster(value) {
      if (value) {
        this.submit_data.poster = undefined;
        this.poster_crop_dialog = true;
      }
    },
    step() {
      var element = this.$refs[`step${this.step}`];
      var top = element.offsetTop;
      window.scrollTo(0, top);
    },
  },
  methods: {
    navigate_forward() {
      this.step = this.step + 1;
    },
    navigate_back() {
      this.step = this.step - 1;
    },
    map_error_fields(error) {
      var has_errors1 = false;
      var has_errors2 = false;
      if (error.response && error.response.data) {
        if (error.response.data.payload)
          has_errors1 = this.check_fields_for_error(
            error.response.data.payload,
            this.submit_error,
            ["poster", "title", "link", "runtime", "genres"]
          );
        if (error.response.data.payload.director) {
          this.submit_error.director = {};
          has_errors2 = this.check_fields_for_error(
            error.response.data.director,
            this.submit_error.director,
            ["name", "email", "contact"]
          );
        }
      }
      return has_errors1 || has_errors2;
    },
    build_director_data() {
      var director = JSON.parse(JSON.stringify(this.submit_data.director));
      if (director.name || director.email || director.contact.length > 2) {
        var name = director.name;
        if (name) {
          var name_segs = name.split(/[\s,]+/);
          director.last_name = "";
          if (name_segs.length > 0) director.first_name = name_segs.shift();
          if (name_segs.length > 0) director.last_name = name_segs.join(" ");
          delete director["name"];
        }
        return director;
      }
    },
    build_form_data() {
      //  copy the submit_data
      const data = JSON.parse(JSON.stringify(this.submit_data));
      delete data["poster"];

      const form_data = new FormData();
      form_data.append("poster", this.submit_data.poster, "poster.png");

      data.director = this.build_director_data(data.director);
      // undefined values are ommited by JSON.stringify, hence director key will be removed in value is undefined
      form_data.append("payload", JSON.stringify(data));
      return form_data;
    },
    clear_errors() {
      this.submit_error = {
        title: "",
        link: "",
        lang: "",
        runtime: "",
        poster: "",
        roles: "",
        genres: "",
        director: {
          name: "",
          email: "",
          contact: "",
        },
      };
      this.error_msg = "";
    },
    attempt_submit() {
      this.clear_errors();
      this.$refs.submit.validate().then((valid) => {
        if (!valid) {
          return;
        }
        this.loading = true;

        var form_data = this.build_form_data();
        // if the movie was earlier submitted, perform an PATCH call otherwwise do a POST
        var action = this.submitted_movie ? "patch" : "post";
        var movie_id = this.submitted_movie ? this.submitted_movie.id : "";
        // movie_id will be ignored if its a POST
        submission_service[action](form_data, movie_id)
          .then((res_data) => {
            this.submitted_movie = res_data;
            this.loading = false;
            this.navigate_forward();
          })
          .catch((err) => {
            this.loading = false;
            var found_field_error = this.map_error_fields(err);
            if (found_field_error) {
              this.error_msg = "Please resolve above errors";
            } else this.error_msg = this.decode_error_message(err);
          });
      });
    },
    poster_rejected() {
      this.submit_error.poster = "size too big!! keep it under 6MB";
    },
    crop_poster() {
      this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
        this.submit_data.poster = blob;
        this.poster_crop_dialog = false;
      }, "image/png");
    },
    add_lang(val, done) {
      if (val.length > 0) {
        var new_lang = { name: val };
        if (!this.filtered_lang.includes(new_lang)) {
          this.filtered_lang.push(new_lang);
        }
        done(new_lang, "toggle");
      }
    },
    lang_filter_fn(val, update) {
      update(() => {
        if (val === "") {
          this.filtered_lang = this.languages;
        } else {
          const needle = val.toLowerCase();
          this.filtered_lang = this.languages.filter(
            (v) => v.name.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    },
    select_package() {
      this.clear_errors();
      if (this.submitted_movie.order.order_id) {
        // this should never happend, the package is already selected and select_package was called
        this.attempt_payment();
        return;
      }
      this.loading = true;
      var form_data = new FormData();
      var payload = JSON.stringify({
        package: this.selected_pack,
        director: this.build_director_data(),
      });
      // while updating movie submission, if we ommit director field the server makes the assumption
      //  that the logged in user is the director, to fix this we have to pass director in every update
      form_data.append("payload", payload);
      console.log(payload);
      submission_service
        .patch(form_data, this.submitted_movie.id)
        .then((res_data) => {
          this.submitted_movie = res_data;
          this.loading = false;
          this.attempt_payment();
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
          this.error_msg = "Package selected failed! Please try again";
        });
    },
    rzp_response_handler(rzp_response) {
      if (rzp_response.error) {
        this.error_msg = `Payment failed! ${rzp_response.description}`;
      } else {
        payment_service
          .post(rzp_response)
          .then((data) => {
            if (data.success) {
              // redirect user
              this.success_msg = "Payment Successful";
              setTimeout(() => {
                this.$router.push({ name: "home" });
              }, 500);
            } else {
              this.error_msg = "Fail to verify Payment";
            }
          })
          .catch((error) => {
            console.log(error);
            this.error_msg = this.decode_error_message(error);
          });
      }
    },
    on_change_active_pack(pack) {
      if (!this.submitted_movie.order.order_id) this.active_pack_id = pack.id;
      else {
        this.$q.notify({
          message:
            "You cannot change your package now! please contact support if you are facing issue with payment",
          color: "negative",
          textColor: "white",
          icon: "mdi-alert-circle-outline",
          timeout: 5000,
          actions: [
            {
              label: "OK",
              color: "white",
            },
          ],
        });
      }
    },
    attempt_payment() {
      let options = {
        key: process.env.VUE_APP_RZP_API_KEY,
        currency: "INR",
        name: this.website_title,
        order_id: this.submitted_movie.order.order_id,
        amount: this.submitted_movie.order.amount,
        handler: this.rzp_response_handler,
        prefill: {
          name: this.my_profile.name,
          email: this.my_profile.email,
          contact: this.my_profile.mobile,
        },
        offers: ["offer_Fkl0Kfpdx70wq8", "offer_Fkkx6hkOZTDRER"],
      };
      console.log(options);
      //eslint-disable-next-line
      new Razorpay(options).open();
    },
  },
};
</script>
<style lang="scss">
.q-stepper__step-inner {
  padding-left: 50px !important;
}
.pack-border {
  border: 1px solid #232323;
  border-radius: 5px;
}
.pack-border.selected-pack-border {
  border: 1px solid #f7cd23;
  border-radius: 5px;
}
</style>