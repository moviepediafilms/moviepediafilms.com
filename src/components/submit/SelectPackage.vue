<template>
  <div class="last-step">
    <q-item
      v-for="(pack, index) in packs"
      :key="pack.id"
      clickable
      v-ripple
      @click="on_change_active_pack(pack)"
      :class="index > 0 ? 'q-mt-lg' : 'q-mt-md'"
      class="q-pa-md pack-border"
      active-class="selected-pack-border"
      :active="active_pack_id == pack.id"
    >
      <q-item-section>
        <q-item-label>
          <h3 class="text-primary">
            {{ pack.title }}
            <br />
            <small class="text-caption">{{ pack.price }}</small>
          </h3>
        </q-item-label>
        <q-item-label class="q-pt-sm">
          <q-item
            dense
            v-for="(item, idx) in pack.content"
            :key="idx"
            class="text-left q-pa-xs text-grey-5"
          >
            <q-item-section side top class="q-pr-sm">
              <q-icon
                :color="item.included ? 'green' : 'red'"
                class="q-mr-xs"
                :name="item.included ? 'mdi-check' : 'mdi-close'"
              ></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                {{ item.text }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-item-label>
      </q-item-section>
    </q-item>
    <div class="text-negative">
      {{ error_msg }}
    </div>
    <div class="text-positive">
      {{ success_msg }}
    </div>
  </div>
</template>
<script>
import { submission_service } from "@/services";
export default {
  props: {
    commit: {
      type: Number,
      default: 0,
    },
    initOrder: {
      type: Object,
      default() {
        return {};
      },
    },
    movieId: {
      type: Number,
    },
  },
  data() {
    return {
      loading: false,
      order: {},
      error_msg: "",
      success_msg: "",
      active_pack_id: 2,
      packs: [
        {
          id: 3,
          title: "MDFF - Season2",
          price: "INR 499",
          content: [{ text: "Entry in MDFF Season 2", included: true }],
          active: false,
        },
        {
          id: 2,
          title: "Premium Pack",
          price: "INR 499",
          content: [
            { text: "Creator of the Month", included: true },
            { text: "Facebook Marketing", included: true },
            { text: "E-mail Campaigns", included: true },
            { text: "Celebrity Recommendation", included: true },
            { text: "Instagram Promotion", included: true },
            { text: "Moviepedia Feature Review", included: true },
          ],
          active: false,
        },
      ],
    };
  },
  computed: {
    selected_pack() {
      var selected = null;
      this.packs.forEach((pack) => {
        if (pack.id == this.active_pack_id) selected = pack;
      });
      return { name: selected.title };
    },
  },
  watch: {
    commit() {
      this.select_package();
    },
    loading() {
      this.$emit("loading", this.loading);
    },
  },
  mounted() {
    Object.assign(this.order, this.initOrder);
  },
  methods: {
    select_package() {
      this.error_msg = "";
      if (this.order.order_id) {
        // this should never happend, the package is already selected and select_package was called
        this.$emit("complete", this.order);
        return;
      }
      this.loading = true;
      var form_data = new FormData();
      form_data.append(
        "payload",
        JSON.stringify({
          package: this.selected_pack,
        })
      );
      submission_service
        .patch(form_data, this.movieId)
        .then((movie) => {
          this.loading = false;
          this.order = movie.order;
          this.$emit("complete", this.order);
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
          this.error_msg = "Package selected failed! Please try again";
        });
    },
    on_change_active_pack(pack) {
      if (!this.order.order_id) this.active_pack_id = pack.id;
      else {
        this.$q.notify({
          message:
            "You cannot change your package now! Please contact support if you are facing issues with payment.",
          color: "negative",
          textColor: "white",
          icon: "mdi-alert-circle-outline",
          timeout: 5000,
          actions: [
            {
              label: "OK",
              color: "white",
            },
          ],
        });
      }
    },
  },
};
</script>