<template>
  <q-card class="bg-primary text-light text-left q-mb-md">
    <q-card-section horizontal>
      <q-card-section>
        <h3 class="text-dark">
          <q-icon name="mdi-check" class="q-mr-sm" color="green" />{{ title }}
        </h3>
        <div class="text-grey-9 q-mt-sm">
          <read-more
            :text="content"
            class="readmore readmore-dark"
            more-str="read more"
            link="#"
            less-str="read less"
            :max-chars="200"
          ></read-more>
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
  },
};
</script>