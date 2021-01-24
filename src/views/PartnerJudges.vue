<template>
  <base-layout>
    <div class="q-pa-md row q-col-gutter-lg justify-center">
      <div class="col-10 col-md-6" v-for="judge in judges" :key="judge.id">
        <q-card class="judge-card text-center bg-grey-10">
          <q-img
            :data-id="judge.id"
            :src="judge.image || '/default_poster.jpg'"
            style="height: 200px; max-width: 100%"
            @click="
              $router.push({
                name: 'judge-recommendation',
                params: { id: judge.id },
              })
            "
            v-ripple
            @error="set_to_show_alt"
          >
            <template v-slot:error>
              <div class="absolute-full flex flex-center bg-primary text-dark">
                <div class="text-h2">{{ judge.name }}</div>
                <div>
                  <q-icon name="mdi-close" color="red" /> Image not avaiable
                </div>
              </div>
            </template>
          </q-img>

          <q-card-section>
            <div class="text-h4 text-primary">{{ judge.name }}</div>
            <div class="q-mt-sm text-subtitle2">{{ judge.title }}</div>
          </q-card-section>
          <q-card-section class="q-pt-none judge-about">{{
            judge.about
          }}</q-card-section>

          <q-separator inset />
          <q-card-actions class="self-end" align="right">
            <q-btn
              color="primary"
              flat
              :to="{ name: 'judge-recommendation', params: { id: judge.id } }"
              >Recommended Films</q-btn
            >
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/Base";
import { profile_service } from "@/services";

export default {
  name: "partner-judges",
  metaInfo: {
    title: "Partner Judges",
  },
  components: {
    BaseLayout,
  },
  data() {
    return {
      show_alt_images: {},
      judges: [],
    };
  },
  mounted() {
    this.fetch_celebs();
  },
  methods: {
    fetch_celebs() {
      profile_service
        .get({ is_celeb: true })
        .then((data) => {
          this.judges.push(...data.results);
        })
        .catch((error) => {
          this.$q.notify({
            message: this.decode_error_message(error),
            color: "negative",
            icon: "mdi-close",
            textColor: "white",
          });
        });
    },
    set_to_show_alt(event) {
      this.show_alt_images[event.target.dataset.id] = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.judge-card {
  // max-width: 300px;
}
.judge-about {
}
</style>