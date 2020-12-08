<template>
  <base-layout>
    <div class="q-pa-md">
      <div class="text-primary text-center q-mb-lg text-h1">My Submissions</div>
      <div class="text-center text-primary" v-if="loading">
        <q-spinner-dots size="48px" />
      </div>
      <div v-else>
        <div class="row q-col-gutter-xl" v-if="submissions.length > 0">
          <div class="col-12 col-md-6">
            <q-card
              class="q-ma-md"
              v-for="movie in submissions"
              :key="movie.id"
            >
              <q-card-section horizontal>
                <q-img class="col-5" :src="media_base + movie.poster" />

                <q-card-section>
                  <div class="text-h4 text-primary">
                    {{ movie.title }}
                  </div>
                  <div class="q-mt-sm">
                    Payment ID:
                    {{
                      movie.order.payment_id ||
                      movie.order.order_id ||
                      "Not Found"
                    }}
                  </div>
                  <div></div>
                  <q-card-actions>
                    <q-btn
                      size="sm"
                      :label="`Complete Payment ${movie.order.amount / 100}`"
                      color="primary"
                      text-color="dark"
                      v-if="movie.order.order_id && !movie.order.payment_id"
                    />
                    <q-btn
                      size="sm"
                      class="q-mt-sm"
                      label="Select Package"
                      color="primary"
                      text-color="dark"
                      v-if="!movie.order.order_id"
                    />
                  </q-card-actions>
                </q-card-section>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <empty-state
          title="Nothing here to see"
          desc="Submit movie now!"
          icon="mdi-emoticon-sad"
          v-else
        />
      </div>
    </div>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/Base";
import { profile_service } from "@/services";
export default {
  components: {
    BaseLayout,
  },
  data() {
    return {
      loading: true,
      submissions: [],
    };
  },
  mounted() {
    this.get_submissions();
  },
  methods: {
    get_submissions() {
      profile_service
        .get({}, `${this.my_profile.id}/submissions`)
        .then((data) => {
          this.submissions.push(...data.results);
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          this.error_msg = this.decode_error_message(error);
        });
    },
  },
};
</script>