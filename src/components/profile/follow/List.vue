<template>
  <div>
    <q-list v-if="users.length > 0">
      <follow-item
        :user="user"
        :actions="actions"
        v-for="user in users"
        :key="user.id"
        @action="on_action"
      />
    </q-list>
    <empty-state
      :title="emptyTitle"
      :desc="emptyDesc"
      :icon="emptyIcon"
      :image="emptyImage"
      v-else
    />
  </div>
</template>
<script>
import FollowItem from "@/components/profile/follow/Item";
export default {
  props: {
    emptyTitle: {
      type: String,
    },
    emptyDesc: {
      type: String,
    },
    emptyIcon: {
      type: String,
    },
    emptyImage: {
      type: String,
    },
    users: {
      type: Array,
      default() {
        return [];
      },
    },
    actions: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: { FollowItem },
  methods: {
    on_action(val) {
      this.$emit(val.action.emit, val.user);
    },
  },
};
</script>