<template>
  <div class="bg-dark">
    <q-layout view="hHh lPr fFf">
      <navbar-component></navbar-component>
      <q-page-container>
        <slot></slot>
        <footer-component></footer-component>
      </q-page-container>
      <bottom-navbar-component></bottom-navbar-component>
    </q-layout>
  </div>
</template>

<script>
import FooterComponent from "@/components/Footer";
import NavbarComponent from "@/components/Navbar";
import BottomNavbarComponent from "@/components/BottomNavbar";
export default {
  name: "baselayout",
  data() {
    return {};
  },
  components: {
    FooterComponent,
    NavbarComponent,
    BottomNavbarComponent,
  },
  methods: {
    btns(enable_btns) {
      console.log("action buttons called with data", enable_btns);
    },
  },
};
</script>
<style lang="scss">
</style>