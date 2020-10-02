<template>
  <base-layout>
    <div class="q-ma-md text-center q-pt-lg">
      <h3 class="text-primary">Submission</h3>
      <q-stepper v-model="step" color="primary" vertical animated flat>
        <q-step
          :name="1"
          title="What you gain ?"
          icon="mdi-numeric-1"
          :done="step > 1"
          :header-nav="step > 1"
        >
          <q-list padding>
            <template v-for="(value_prop, idx) in value_props">
              <q-item :key="`${idx}_item`">
                <q-item-section>
                  <q-item-label caption class="text-left">
                    {{ value_prop }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-separator spaced inset :key="`${idx}_sep`" />
            </template>
          </q-list>

          <q-stepper-navigation>
            <q-btn
              @click="
                () => {
                  done1 = true;
                  step = 2;
                }
              "
              color="primary"
              text-color="dark"
              no-caps
              label="Ok! Let's roll"
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
          <q-form class="q-gutter-y-md">
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
                hint="should be publicly accessible, YouTube, Google Drive are few examples where you can host them"
                label="Link"
                filled
              ></q-input>
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
            <!-- multi-select  -->
            <q-input
              type="url"
              v-model="submit_data.award"
              label="Awards (if any)"
              autogrow
              hint="One award link per line, link should be publicly accessible"
              filled
            ></q-input>
            <div>
              <q-file
                v-model="submit_data.poster"
                label="Poster"
                accept=".jpg, image/*"
                max-file-size="2000000"
                hint="Landscape poster of the movie"
                filled
              ></q-file>
            </div>
            <div class="text-left">
              <q-toggle
                v-model="submit_data.is_director"
                label="I'm the director"
              />
            </div>
            <p v-if="show_director_fields" class="text-caption">
              Tell us about the director of the film!
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
                type="text"
                v-model="submit_data.director.email"
                :rules="[(val) => !!val || 'Please enter director\'s email']"
                label="Email"
                filled
              ></q-input>
            </div>
            <div v-if="show_director_fields">
              <q-input
                type="text"
                v-model="submit_data.director.contact"
                :rules="[
                  (val) => !!val || 'Please enter director\'s contact number',
                ]"
                label="Contact Number"
                filled
              ></q-input>
            </div>
          </q-form>

          <q-stepper-navigation>
            <q-btn
              @click="
                () => {
                  done2 = true;
                  step = 3;
                }
              "
              color="primary"
              text-color="dark"
              label="Next"
            />
            <q-btn
              flat
              @click="step = 1"
              color="primary"
              label="Back"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </q-step>

        <q-step
          :name="3"
          title="Make Payment"
          icon="mdi-numeric-3"
          :header-nav="step > 3"
        >
          <q-stepper-navigation>
            <q-btn
              color="primary"
              text-color="dark"
              @click="done3 = true"
              label="Finish"
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
      value_props: [
        "Your film stands a chance to get recommended by industry veterans",
        "You can win the the Film Maker of the Month Title",
        "You can direct all views to your YouTube channel and boost revenue",
        "No exclusive rights required",
        "No commission charged on revenue",
        "You get hands on analytics support on your content performance",
        "Your reputation as a film maker enhances and you can raise funds for your upcoming projects from our audience",
        "Interact with your audience directly",
      ],
      step: 2,
      submit_data: {
        title: "",
        email: "",
        is_director: undefined,
        director: {
          name: "",
          email: "",
          contact: "",
        },
      },
    };
  },
  computed: {
    show_director_fields() {
      if (this.submit_data.is_director == undefined) return false;
      return !this.submit_data.is_director;
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
</style>