<template>
  <q-card class="text-dark text-left bg-primary q-mb-md">
    <q-card-section class="q-pa-md">
      <q-card-section class="q-pa-none">
        <div class="flex items-center">
          <q-avatar
            style="display: inline-block"
            class="q-mr-sm"
            size="30px"
            v-ripple
            @click="
              $router.push({
                name: 'profile',
                params: { id: user.id },
              })
            "
          >
            <img :src="user.image" @error="on_user_img_error" />
          </q-avatar>
          <h3 class="" style="display: inline-block">
            {{ user.name }}
          </h3>
        </div>
        <div class="text-body2 q-mr-sm q-mt-sm">
          {{ user.name }} has sent you a crew request for "{{ movieTitle }}" as
          {{ role.name }}
        </div>
      </q-card-section>
      <q-card-actions class="q-pa-none q-pt-sm" align="right">
        <q-btn
          flat
          label="Decline"
          :loading="declineLoading"
          :disable="approveLoading || declineLoading"
          icon="mdi-close"
          @click="$emit('decline')"
        />
        <q-btn
          flat
          label="Approve"
          :loading="approveLoading"
          :disable="approveLoading || declineLoading"
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
    approveLoading: {
      type: Boolean,
      default: false,
    },
    movieTitle: {
      type: String,
    },
    declineLoading: {
      type: Boolean,
      default: false,
    },
    id: {
      type: Number,
    },
    role: {
      type: Object,
    },
    user: {
      type: Object,
    },
  },
};
</script>