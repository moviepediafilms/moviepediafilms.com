<template>
  <q-card class="bg-primary text-dark" style="width: 700px; max-width: 80vw">
    <q-card-section class="text-center q-pb-sm">
      <div class="text-body1">Share with</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <div class="row justify-center">
        <a
          target="_blank"
          :href="
            'https://facebook.com/sharer/sharer.php?u=' + url + ' ' + content
          "
          class="text-decoration-off color-facebook q-mx-md"
        >
          <q-icon name="mdi-facebook" size="lg" />
        </a>
        <a
          target="_blank"
          :href="'https://twitter.com/intent/tweet?url=' + url + ' ' + content"
          class="text-decoration-off color-twitter q-mx-md"
        >
          <q-icon name="mdi-twitter" size="lg" />
        </a>
        <a
          target="_blank"
          :href="'https://api.whatsapp.com/send?text=' + url + ' ' + content"
          class="text-decoration-off color-whatsapp q-mx-md"
        >
          <q-icon name="mdi-whatsapp" size="lg" />
        </a>
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
export default {
  props: {
    url: {
      type: String,
    },
    content: {
      type: String,
    },
  },
};
</script>