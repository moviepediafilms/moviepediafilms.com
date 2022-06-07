<template>
  <q-item
    v-ripple
    clickable
    @click="
      $router.push({
        name: 'profile',
        params: {
          id: user.id,
        },
      })
    "
  >
    <q-item-section avatar>
      <q-avatar>
        <img :src="user.image" @error="on_user_img_error" />
      </q-avatar>
    </q-item-section>
    <q-item-section no-wrap class="ellipsis text-left">
      {{ user.name }}
      <br />
      <span class="text-caption text-grey-6">{{ user.city }}</span>
    </q-item-section>

    <q-item-section side v-for="action in enabled_actions" :key="action.name">
      <q-btn
        outline
        :color="action.color || 'grey-4'"
        :icon="action.icon"
        padding="sm"
        size="xs"
        :label="action.name"
        @click.stop="$emit('action', { action: action, user: user })"
      />
    </q-item-section>
  </q-item>
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
      default() {
        return {};
      },
    },
    actions: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    enabled_actions() {
      return this.actions.filter((a) => !a.disable || a.disable(this.user));
    },
  },
  methods: {},
};
</script>