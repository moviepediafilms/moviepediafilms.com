<template>
  <base-layout>
    <div class="q-pa-md">
      <div class="text-primary text-center q-mb-lg text-h1">My Submissions</div>
      <div class="text-center text-primary" v-if="loading">
        <q-spinner-dots size="48px" />
      </div>
      <div v-else>
        <div class="row q-gutter-md" v-if="submissions.length > 0">
          <div class="col-12" v-for="movie in submissions" :key="movie.id">
            <div class="row">
              <q-card class="col-3 q-ma-md">
                <movie-image
                  class="col-4"
                  :title="movie.title"
                  :state="movie.state"
                  :show-state="true"
                  :poster="movie.poster"
                />
              </q-card>
              <div class="col">
                <div>
                  <div class="text-h3 text-primary">
                    {{ movie.title }}
                  </div>

                  <div
                    class="q-mt-lg"
                    :key="order.id"
                    v-for="order in movie.orders"
                  >
                    <div class="q-mt-xs" v-if="order.package">
                      <div class="text-h4 text-primary">
                        {{ package_id_to_obj[order.package].name }}
                      </div>
                    </div>
                    <div class="q-mt-xs" v-if="order.amount">
                      INR {{ in_rupees(order.amount) }}
                    </div>
                    <div class="q-mt-xs">
                      Status:
                      <template v-if="order.payment_id"> Paid </template>
                      <template v-else> Not Paid </template>
                    </div>
                    <div class="q-mt-xs" v-if="order.payment_id">
                      Payment ID:
                      {{ order.payment_id }}
                    </div>

                    <q-btn
                      size="sm"
                      label="Pay"
                      color="primary"
                      class="q-mt-xs"
                      text-color="dark"
                      :to="{ name: 'submit', params: { movie_id: movie.id } }"
                      v-if="has_active_package(order) && is_not_paid(order)"
                    />
                    <q-btn
                      size="sm"
                      class="q-mt-md"
                      label="Select Package"
                      color="primary"
                      text-color="dark"
                      :to="{ name: 'submit', params: { movie_id: movie.id } }"
                      v-if="!order.order_id"
                    />
                  </div>
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
import MovieImage from "@/components/movie/Image";
import { profile_service, package_service } from "@/services";
export default {
  metaInfo: {
    title: "Submissions",
  },
  components: {
    BaseLayout,
    MovieImage,
  },
  data() {
    return {
      loading: true,
      submissions: [],
      packages: [],
    };
  },
  computed: {
    package_id_to_obj() {
      var map = {};
      this.packages.forEach((pack) => {
        map[pack.id] = pack;
      });
      return map;
    },
  },
  created() {
    this.get_packages();
    this.get_submissions();
  },
  methods: {
    has_active_package(order) {
      return this.package_id_to_obj[order.package].active;
    },
    is_not_paid(order) {
      return order.order_id && !order.payment_id;
    },
    get_packages() {
      package_service.get().then((data) => {
        this.packages.splice(0, this.packages.length);
        this.packages.push(...data.results);
      });
    },
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