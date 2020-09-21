<template>
  <base-layout>
    <div class="q-pa-md row q-gutter-lg justify-center">
      <q-card class="judge-card text-center" v-for="judge in judges" :key="judge.id">
        <img :src="judge.image" />
        <q-card-section>
          <div class="text-h6 text-primary">{{judge.name}}</div>
          <div class="q-mt-sm text-subtitle2">{{judge.title}}</div>
        </q-card-section>
        <q-card-section class="q-pt-none">{{judge.about}}</q-card-section>
        <q-separator inset />

        <q-card-actions align="right">
          <q-btn
            color="primary"
            flat
            :to="{name: 'judge-recommendation', params: { id: judge.id }}"
          >Recommended Movies</q-btn>
          <q-btn color="primary" flat>Follow</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/Base";
export default {
  name: "partner-judges",
  components: {
    BaseLayout,
  },
  data() {
    return {
      judges: [
        {
          title: "Director",
          recommendations: [{ name: "Dhudh" }, { name: "Dhoom" }],
          id: 1,
          name: "Anurag Kashyap",
          image: "https://cdn.quasar.dev/img/mountains.jpg",
          about:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {
          title: "Award Winning Actor",
          recommendations: [{ name: "Dhudh" }, { name: "Dhoom" }],
          id: 2,
          name: "Anurag Kashyap",
          image: "https://cdn.quasar.dev/img/mountains.jpg",
          about:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {
          title: "Director, Actor",
          recommendations: [{ name: "Dhudh" }, { name: "Dhoom" }],
          id: 3,
          name: "Anurag Kashyap",
          image: "https://cdn.quasar.dev/img/mountains.jpg",
          about:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.judge-card {
  max-width: 350px;
}
</style>