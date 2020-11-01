<template>
  <q-toggle
    flat
    text
    class="text-grey-6"
    color="primary"
    size="xs"
    @input="toggle_view"
    :disable="!is_director"
    :value="show_filmmaker_profile"
    :label="show_filmmaker_profile ? 'Filmmaker' : 'Audience'"
  />
</template>
<script>
import { PROFILE_VIEW_TOGGLE } from "@/store/actions";
import { mapState } from "vuex";
export default {
  data() {
    return {
      dialog_profile_type: false,
    };
  },
  computed: {
    ...mapState("profile", {
      show_filmmaker_profile: (state) => state.show_filmmaker_profile,
    }),
  },
  methods: {
    toggle_view() {
      this.$store.dispatch(PROFILE_VIEW_TOGGLE);
    },
  },
};
</script>