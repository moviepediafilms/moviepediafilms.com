<template>
  <base-layout>
    <div class="row mdff-bg justify-center">
      <select-btn class="self-center mt-custom" />
    </div>
  </base-layout>
</template>
  
  <script>
import BaseLayout from "@/layouts/Base";
import SelectBtn from "@/components/SelectBtn";
export default {
  name: "tos-page",
  components: {
    BaseLayout,
    SelectBtn,
  },
  metaInfo: {
    title: "MDFF 2",
  },
};
</script>
<style scoped>
.mdff-bg {
  background-image: url("https://res.cloudinary.com/moviepedia/image/upload/v1627963809/bg/mdff2_bg.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  height: 706px;
}
.mt-custom {
  margin-top: 300px;
}
</style>