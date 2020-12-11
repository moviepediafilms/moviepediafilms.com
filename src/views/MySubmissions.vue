<template>
  <base-layout>
    <div class="q-pa-md">
      <div class="text-primary text-center q-mb-lg text-h1">My Submissions</div>
      <div class="text-center text-primary" v-if="loading">
        <q-spinner-dots size="48px" />
      </div>
      <div v-else>
        <div class="row q-col-gutter-md" v-if="submissions.length > 0">
          <div
            class="col-12 col-md-6"
            v-for="movie in submissions"
            :key="movie.id"
          >
            <div class="row">
              <q-card class="col q-ma-md">
                <movie-image
                  class="col-6"
                  :title="movie.title"
                  :state="movie.state"
                  :show-state="true"
                  :poster="movie.poster"
                />
              </q-card>
              <div class="col flex align-middle items-center">
                <div>
                  <div class="text-h2 text-primary">
                    {{ movie.title }}
                  </div>

                  <div class="q-mt-sm" v-if="movie.package">
                    {{ movie.package }}
                  </div>
                  <div class="q-mt-sm" v-if="movie.order && movie.order.amount">
                    INR {{ in_rupees(movie.order.amount) }}
                  </div>

                  <div class="q-mt-sm" v-if="movie.order.payment_id">
                    Payment ID:
                    {{ movie.order.payment_id }}
                  </div>
                  <q-btn
                    size="sm"
                    label="Proceed to Payment"
                    color="primary"
                    class="q-mt-md"
                    text-color="dark"
                    :to="{ name: 'submit', params: { movie_id: movie.id } }"
                    v-if="movie.order.order_id && !movie.order.payment_id"
                  />
                  <q-btn
                    size="sm"
                    class="q-mt-md"
                    label="Select Package"
                    color="primary"
                    text-color="dark"
                    :to="{ name: 'submit', params: { movie_id: movie.id } }"
                    v-if="!movie.order.order_id"
                  />
                </div>
              </div>
            </div>
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
import MovieImage from "@/components/MovieImage";
import { profile_service } from "@/services";
export default {
  components: {
    BaseLayout,
    MovieImage,
  },
  data() {
    return {
      loading: true,
      submissions: [],
    };
  },
  computed: {},
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