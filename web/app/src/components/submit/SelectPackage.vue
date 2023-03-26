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
            {{ pack.name }}
            <br />
            <small class="text-caption">INR {{ pack.amount / 100 }}</small>
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
import { order_service, package_service } from "@/services";
export default {
  props: {
    commit: {
      type: Number,
      default: 0,
    },
    movieId: {
      type: Number,
    },
  },
  data() {
    return {
      loading: false,
      order: null,
      orders: [],
      packages: [],
      error_msg: "",
      success_msg: "",
      active_pack_id: 3,
      packs: [],
    };
  },
  computed: {},
  watch: {
    commit() {
      this.submit_selected_package();
    },
    loading() {
      this.$emit("loading", this.loading);
    },
    packages() {
      this.packs.splice(0, this.packs.length);
      console.log(this.packages);
      this.packages.forEach((item) => {
        item["content"] = this.parse_content(item["description"]);
        this.packs.push(item);
      });
      console.log(this.packs);
    },
  },
  mounted() {
    // TODO: do loading
    this.fetch_created_orders();
    this.fetch_active_packages();
  },
  methods: {
    parse_content(content) {
      var features = [];
      if (!content) return features;
      content.split("\n").forEach((entry) => {
        var head = entry.substring(0, 1).toLowerCase();
        var tail = entry.substring(2);
        var feature = {
          included: head == "y" ? true : false,
          text: tail,
        };
        features.push(feature);
      });
      return features;
    },
    fetch_active_packages() {
      package_service.get({ active: true }).then((data) => {
        this.packages.push(...data.results);
      });
    },
    fetch_created_orders() {
      order_service
        .get({ state: "C", movies__id: this.movieId })
        .then((res) => {
          this.orders.push(...res.results);
          this.select_order();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    select_order() {
      var order_without_package = null;
      this.order = null;
      this.orders.forEach((order) => {
        if (order.package == this.active_pack_id) this.order = order;
        if (order.package == null) order_without_package = order;
      });
      var no_order_for_selected_pack = !this.order;
      if (no_order_for_selected_pack && order_without_package) {
        this.order = order_without_package;
      }
    },
    submit_selected_package() {
      this.error_msg = "";

      var order_exists = this.order && this.order.id;
      var package_selected =
        order_exists && this.order.package == this.active_pack_id;

      var order_has_package = order_exists && !!this.order.package;

      if (order_exists && package_selected) {
        //  - order is created and package is selected - no operation needed

        this.$emit("complete", this.order);
      } else if (!order_exists) {
        //  - order not even created - create an order with selected package and movie
        this.loading = true;
        order_service
          .post({
            movie: this.movieId,
            package: this.active_pack_id,
          })
          .then((res) => {
            this.loading = false;
            this.$emit("complete", res);
          })
          .catch((err) => {
            this.loading = false;
            console.log(err);
            this.error_msg = "Package selected failed! Please try again";
          });
      } else if (!order_has_package) {
        //  - order is without package - patch the order with selected package
        this.loading = true;
        order_service
          .patch(
            {
              package: this.active_pack_id,
            },
            this.order.id
          )
          .then((res) => {
            this.loading = false;
            this.$emit("complete", res);
          })
          .catch((err) => {
            this.loading = false;
            console.log(err);
            this.error_msg = "Package selected failed! Please try again";
          });
      }
    },
    on_change_active_pack(pack) {
      this.active_pack_id = pack.id;
      this.select_order();
    },
  },
};
</script>
