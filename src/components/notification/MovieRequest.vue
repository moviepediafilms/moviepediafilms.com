<template>
  <q-card
    class="bg-poster text-light text-left q-mb-md"
    :style="'background-image: url(' + media_base + poster + ');'"
  >
    <q-card-section class="bg-overlay">
      <q-card-section class="q-pa-none">
        <h3 class="text-h3 text-weight-bold">
          <q-icon name="mdi-movie " class="q-mr-sm" />{{ title }}
        </h3>
        <div class="q-mt-sm">
          One of your crew members has submitted a film and marked you as
          director. Approve the submission to confirm so that we can go ahead
          with the screening process.
        </div>
      </q-card-section>
      <q-card-actions class="q-pa-none q-mt-sm" align="right">
        <q-btn
          flat
          label="Decline"
          :loading="loadingDeclined"
          :disable="loadingDeclined || loadingApproved"
          icon="mdi-close"
          @click="$emit('decline')"
        />
        <q-btn
          flat
          label="Approve"
          :loading="loadingApproved"
          :disable="loadingDeclined || loadingApproved"
          icon="mdi-check"
          @click="$emit('approve')"
        />
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>
<script>
export default {
  props: {
    id: { type: Number },
    title: { type: String },
    poster: { type: String },
    loadingApproved: {
      type: Boolean,
      default: false,
    },
    loadingDeclined: { type: Boolean, default: false },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss">
.bg-poster {
  background-color: #f7cd23;
  background-size: cover;
  background-position: center;
  background-position: center center;
}
.bg-overlay {
  background-color: rgba(0, 0, 0, 0.4);
}
</style>