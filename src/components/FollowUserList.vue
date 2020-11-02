<template>
  <q-list>
    <follow-user-item
      :user="user"
      :actions="actions"
      v-for="user in users"
      :key="user.id"
      @action="on_action"
    />
  </q-list>
</template>
<script>
import FollowUserItem from "@/components/FollowUserItem";
export default {
  props: {
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
  components: { FollowUserItem },
  methods: {
    on_action(val) {
      this.$emit(val.action.emit, val.user);
    },
  },
};
</script>