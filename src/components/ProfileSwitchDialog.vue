<template>
  <div>
    <q-dialog v-model="is_visible">
      <q-card class="" style="width: 400px; max-width: 80vw">
        <q-card-section>
          <div class="text-h3 text-primary text-center">
            {{ active }} Profile
          </div>
        </q-card-section>
        <q-card-section>
          This is your profile as {{ active }},
          <template v-if="is_director">
            you also have a profile as {{ other }}</template
          >
          <template v-else
            >your Filmmaker profile will be unlocked once you submitting a
            film</template
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" v-close-popup />
          <q-btn
            flat
            color="primary"
            :label="`my ${other} profile`"
            @click="$emit('switch-profile')"
            v-close-popup
            v-if="is_director"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "audience",
    },
  },
  data() {
    return {
      is_visible: false,
      type_text_map: {
        audience: "Audience",
        filmmaker: "Filmmaker",
      },
    };
  },
  computed: {
    active() {
      return this.type_text_map[this.type];
    },
    other() {
      return this.type_text_map[this.other_type];
    },
    other_type() {
      return this.type === "audience" ? "filmmaker" : "audience";
    },
  },
  watch: {
    show() {
      this.is_visible = this.show;
    },
    is_visible() {
      if (!this.is_visible) this.$emit("hide");
    },
  },
};
</script>