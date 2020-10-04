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
              @click="step = 2"
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
                ]"
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
                filled
              ></q-input>
            </div>
            <div>
              <q-select
                filled
                use-input
                use-chips
                v-model="submit_data.lang"
                hide-dropdown-icon
                :options="filtered_lang"
                @filter="lang_filter_fn"
                @new-value="add_lang"
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
                    parseInt(val) < 30 || 'That\'s too long for a short film',
                ]"
                v-model="submit_data.runtime"
                label="Runtime (in minutes)"
                filled
              ></q-input>
            </div>
            <div>
              <q-file
                v-model="poster"
                label="Poster"
                accept=".jpg, image/*"
                max-file-size="2000000"
                hint="Portrait poster of the movie, less than 2MB"
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
            <div class="text-left">
              <q-field
                borderless
                v-model="submit_data.is_director"
                :rules="[
                  (val) => val == true || val == false || 'Please specify this',
                ]"
              >
                <q-toggle
                  v-model="submit_data.is_director"
                  label="I'm the director"
                />
              </q-field>
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
              ></q-input>
            </div>
            <div v-if="show_director_fields">
              <q-input
                type="email"
                v-model="submit_data.director.email"
                :rules="[(val) => !!val || 'Please enter director\'s email']"
                label="Email"
                filled
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
              ></q-input>
            </div>
            <div>
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
              @click="step = 1"
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
        >
          <div class="last-step">
            <q-item
              v-for="(pack, index) in packs"
              :key="pack.id"
              clickable
              v-ripple
              @click="active_pack_id = pack.id"
              :class="index > 0 ? 'q-mt-lg' : 'q-mt-md'"
              class="q-pa-md pack-border"
              active-class="selected-pack-border"
              :active="active_pack_id == pack.id"
            >
              <q-item-section>
                <q-item-label>
                  <h5 class="text-primary">
                    {{ pack.title }}
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
          </div>
          <q-stepper-navigation>
            <q-btn
              color="primary"
              text-color="dark"
              :loading="loading"
              :disable="loading"
              @click="attempt_payment"
              label="Pay"
            />
            <q-btn
              flat
              @click="step = 2"
              color="primary"
              label="Back"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </q-step>
      </q-stepper>
    </div>
  </base-layout>
</template>

<script>
import BaseLayout from "@/layouts/Base";
import { submission_service } from "@/services";
export default {
  name: "submit-page",
  components: {
    BaseLayout,
  },
  metaInfo: {
    title: "Submit",
  },
  data() {
    return {
      step: 3,
      active_pack_id: 1,
      packs: [
        {
          id: 1,
          title: "Standard Pack | INR 375",
          content: [
            { text: "Interactive Film Screening", included: true },
            { text: "Filmmaker of the Month Competition", included: true },
            { text: "Celebrity Recommendation", included: true },
            { text: "Content Analytics", included: true },
            { text: "Instagram Promotion", included: false },
            { text: "Facebook Marketing", included: false },
            { text: "E-mail Film Campaigns", included: false },
            { text: "Moviepedia’s Expert Film Review", included: false },
          ],
          active: false,
        },
        {
          id: 2,
          title: "Premium Pack | INR 375 + INR 99",

          content: [
            { text: "Interactive Film Screening", included: true },
            { text: "Filmmaker of the Month Competition", included: true },
            { text: "Celebrity Recommendation", included: true },
            { text: "Content Analytics", included: true },
            { text: "Instagram Promotion", included: true },
            { text: "Facebook Marketing", included: true },
            { text: "E-mail Film Campaigns", included: true },
            { text: "Moviepedia’s Expert Film Review", included: true },
          ],
          active: false,
        },
      ],
      movie_submitted: false,
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
            "You stand a chance to win the ‘Filmmaker of the Month’ title, cash prize of over Rs. 5000 and an extended feature period on the platform.",
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
        {
          icon: "mdi-chart-timeline-variant",
          color: "white",
          text:
            "We provide deep analytics support on your content performance and trends.",
        },
        {
          icon: "mdi-currency-usd",
          color: "green",
          text:
            "You stand a chance to get your content noticed by top OTT buyers. We ensure the best price for your content rights.",
        },
      ],
      languages: [
        { name: "English" },
        { name: "Hindi" },
        { name: "Tamil" },
        { name: "Telugu" },
        { name: "Malayalam" },
        { name: "Bengali" },
        { name: "Others please typing in", disable: true },
      ],
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

      loading: false,
      submit_error: {
        poster: "",
      },
      poster: undefined,
      error_msg: "",
      submit_data: {
        title: "Dhundh",
        link: "http://google.com",
        lang: undefined,
        runtime: "12",
        poster: "",
        is_director: true,
        genres: [],
        director: {
          name: "",
          email: "",
          contact: "",
        },
      },
      order: {
        order_id: "order_FkkOwEvNcU2Une",
        amount: 29900,
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
    show_director_fields() {
      if (this.submit_data.is_director == undefined) return false;
      return !this.submit_data.is_director;
    },
    language_names() {
      var names = [];
      for (var lang in this.languages) {
        names.push(lang.name);
      }
      return names;
    },
  },
  watch: {
    poster(poster_file) {
      this.submit_error.poster = "";
      this.submit_data.poster = poster_file;
    },
  },
  methods: {
    attempt_submit() {
      if (this.movie_submitted) {
        this.step = 3;
        return;
      }
      this.$refs.submit.validate().then((valid) => {
        if (!valid) {
          console.log("form invalid");
          return;
        }
        console.log("attempt_submit");
        this.loading = true;

        const form_data = new FormData();
        form_data.append("poster", this.submit_data.poster);
        form_data.append("payload", JSON.stringify(this.submit_data));
        submission_service
          .post(form_data)
          .then((res_data) => {
            console.log(res_data);
            this.order = res_data.order;
            this.movie_submitted = true;
            this.loading = false;
            this.step = 3;
          })
          .catch((err) => {
            console.log(err);
            this.loading = false;
            if (!this.error_msg) this.error_msg = err.toJSON().message;
          });
      });
    },
    poster_rejected() {
      this.submit_error.poster = "size too big!! keep it under 2MB";
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
    rzp_response_handler(rzp_response) {
      console.log(rzp_response);
    },
    attempt_payment() {
      let options = {
        key: process.env.VUE_APP_RZP_API_KEY,
        currency: "INR",
        name: this.website_title,
        order_id: this.order.order_id,
        amount: this.order.amount,
        handler: this.rzp_response_handler,
        prefill: {
          name: this.user_profile.name,
          email: this.user_profile.email,
          contact: this.user_profile.mobile,
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