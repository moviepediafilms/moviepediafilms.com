<template>
  <base-layout>
    <div class="q-ma-md text-center q-pt-lg">
      <h3 class="text-primary">RETURNS & REFUNDS</h3>
      <p class="q-mt-md text-body1">
        Submission fee once paid will not be refunded under any circumstances.
        If the submitted entry does not match the basic parameters set by the
        Moviepedia Content Curation Panel, the user will get one more chance to
        submit a different entry by using credits given by Moviepedia Films.
      </p>
      <p class="text-body1 q-mt-sm">
        However, if the director rejects a film submitted by his crew member or
        does not approve within one week from the date of respective submission,
        amount paid on such film will be refunded, only post submission and
        verification of valid identity proof (Government of India) of the
        respective director and the person who had made the specific film
        submission. The payment will be made through bank account-based
        transaction.
      </p>
    </div>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/Base";
export default {
  name: "refund-page",
  components: {
    BaseLayout,
  },
  metaInfo: {
    title: "Refunds",
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
</style>