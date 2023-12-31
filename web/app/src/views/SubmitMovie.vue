<template>
  <base-layout>
    <div class="q-mx-md q-mb-md text-center q-pt-md">
      <h1 class="text-primary">Submission</h1>
      <q-stepper
        v-model="step"
        color="primary"
        vertical
        dense
        animated
        flat
        class="q-pa-none q-ma-none q-mt-md"
      >
        <q-step
          :name="1"
          title="What’s in it for you?"
          icon="mdi-numeric-1"
          ref="step1"
          :done="step > 1"
          :header-nav="step > 1"
        >
          <value-props />

          <q-stepper-navigation>
            <q-btn
              :disable="!has_released"
              @click="navigate_forward"
              color="primary"
              text-color="dark"
              :label="get_started_btn_txt"
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
          <submit-form
            :init-data="submit_data_copy"
            :trigger-submit="trigger_submit"
            @loading="on_loading"
            @complete="on_movie_submit_complete"
          />
          <q-stepper-navigation>
            <q-btn
              @click="trigger_submit += 1"
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
              :disable="forward_only"
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
          <select-package
            :commit="commit_package"
            :init-order="submitted_movie.order"
            :movie-id="submitted_movie.id"
            @loading="on_loading"
            @complete="on_package_select_complete"
          />

          <q-stepper-navigation>
            <q-btn
              color="primary"
              text-color="dark"
              :loading="loading"
              :disable="loading"
              @click="commit_package += 1"
              label="Pay"
            />
            <q-btn
              flat
              @click="navigate_back"
              :disable="forward_only"
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
    </div>
  </base-layout>
</template>

<script>
import moment from "moment";
import BaseLayout from "@/layouts/Base";
import { payment_service, submission_service } from "@/services";
import ValueProps from "@/components/submit/ValueProps.vue";
import SubmitForm from "@/components/submit/SubmitForm.vue";
import SelectPackage from "@/components/submit/SelectPackage.vue";

export default {
  name: "submit-page",
  components: {
    BaseLayout,
    ValueProps,
    SubmitForm,
    SelectPackage,
  },
  metaInfo: {
    title: "Submit Movie",
  },
  data() {
    return {
      get_started_btn_txt: "submissions begin in 00:00:00",
      release_datetime: moment("2020-12-20T16:00:00+05:30"),
      order: {},
      forward_only: false,
      trigger_submit: 0,
      commit_package: 0,
      step: 1,
      submitted_movie: {},
      loading: false,
      error_msg: "",
      success_msg: "",
      submit_data_copy: {},
    };
  },
  mounted() {
    let script = document.createElement("script");
    script.setAttribute("src", "https://checkout.razorpay.com/v1/checkout.js");
    document.head.appendChild(script);
    this.fetch_submission();
    this.start_countdown();
  },
  computed: {
    show_sign_in() {
      return this.step > 1 && !this.is_authenticated;
    },
    movie_id() {
      return this.$route.params.movie_id;
    },
    has_released() {
      return moment().isAfter(this.release_datetime);
    },
  },
  watch: {
    step() {
      var element = this.$refs[`step${this.step}`];
      var top = element.offsetTop;
      window.scrollTo(0, top);
    },
  },
  methods: {
    start_countdown() {
      if (this.has_released) {
        this.get_started_btn_txt = "get started";
      } else {
        setTimeout(() => {
          var now = moment();
          var sec = this.release_datetime.diff(now, "seconds");
          var hrs = parseInt(sec / 3600);
          sec = sec - hrs * 3600;
          var min = parseInt(sec / 60);
          sec = sec - min * 60;

          this.get_started_btn_txt = `submissions begin in ${hrs}:${min}:${sec}`;
          this.start_countdown();
        }, 1000);
      }
    },
    fetch_submission() {
      if (this.movie_id) {
        this.loading = true;
        submission_service
          .get({}, this.movie_id)
          .then((movie) => {
            this.submitted_movie = movie;
            this.step = 3;
            this.forward_only = true;
            this.loading = false;
          })
          .catch((error) => {
            console.log(error);
            this.error_msg = "failed to load submission";
            this.loading = false;
          });
      }
    },
    navigate_forward() {
      this.step = this.step + 1;
    },
    navigate_back() {
      this.step = this.step - 1;
    },
    on_movie_submit_complete(submit_data, movie) {
      this.submit_data_copy = submit_data;
      this.submitted_movie = movie;
      this.loading = false;
      this.navigate_forward();
    },
    on_loading(loading) {
      this.loading = loading;
    },
    on_package_select_complete(data) {
      this.order = data;
      this.attempt_payment();
    },
    rzp_response_handler(rzp_response) {
      this.loading = false;
      if (rzp_response.error) {
        this.error_msg = `Payment failed! ${rzp_response.description}`;
      } else {
        payment_service
          .post(rzp_response)
          .then((data) => {
            var message =
              "Your payment was successful. Your film is pending for approval and we'll email you as soon as it's ready for screening.";
            var icon = "mdi-check";
            var color = "positive";
            if (data.success) {
              this.$router.push({
                name: "profile",
                params: {
                  id: "me",
                },
              });
            } else {
              message =
                "Payment Failed. Any amount if debited will be refunded in 5-7 business days.";
              icon = "mdi-close";
              color = "negative";
            }
            this.$q.notify({
              icon: icon,
              message: message,
              multiLine: true,
              color: color,
              textColor: "white",
            });
            this.loading = false;
          })
          .catch((error) => {
            console.log(error);
            this.error_msg = this.decode_error_message(error);
            this.loading = false;
          });
      }
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
          name: this.my_profile.name,
          email: this.my_profile.email,
          contact: this.my_profile.mobile,
        },
        offers: ["offer_Fkl0Kfpdx70wq8", "offer_Fkkx6hkOZTDRER"],
      };
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