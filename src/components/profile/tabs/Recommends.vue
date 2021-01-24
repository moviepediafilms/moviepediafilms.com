<template>
  <div>
    <curation-list
      :list_id="selected_recommend_list.id"
      :header="false"
      :options="menu_options"
    >
      <q-btn-dropdown
        split
        rounded
        size="sm"
        padding="sm"
        color="primary"
        text-color="dark"
        :label="selected_recommend_list.name"
      >
        <q-list>
          <q-item
            clickable
            v-close-popup
            v-for="(recommend_list, index) in recommend_lists"
            :key="index"
            @click="on_recommend_list_selected(recommend_list)"
          >
            <q-item-section>
              <q-item-label>{{ recommend_list.name }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </curation-list>
  </div>
</template>
<script>
import CurationList from "@/components/CurationList";
import { curation_service } from "@/services";
export default {
  props: {
    profile: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    CurationList,
  },
  data() {
    return {
      // list of movielists of the profile
      recommend_lists: [],
      selected_recommend_list: {},
    };
  },
  computed: {
    menu_options() {
      if (this.is_my_profile)
        return [{ name: "Remove", icon: "mdi-trash-can", emit: "remove" }];
      return [];
    },
    is_my_profile() {
      return this.profile.id == this.my_profile.id;
    },
  },
  watch: {
    profile() {
      this.fetch_contest_recommend_lists();
    },
  },
  created() {
    this.fetch_contest_recommend_lists();
  },
  methods: {
    on_recommend_list_selected(recommend_list) {
      this.selected_recommend_list = recommend_list;
    },
    fetch_contest_recommend_lists() {
      if (this.profile.id)
        curation_service
          .get({ owner__id: this.profile.id, contest__isnull: "false" })
          .then((data) => {
            this.recommend_lists = data.results;
            this.selected_recommend_list = this.recommend_lists[0];
          })
          .catch((error) => {
            console.log(error);
          });
    },
  },
};
</script>