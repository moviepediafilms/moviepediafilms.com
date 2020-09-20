<template>
  <div class="bg-dark">
    <q-layout view="hHh lPr fFf">
      <navbar-component></navbar-component>
      <q-page-container class>
        <slot />
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
  components: {
    FooterComponent,
    NavbarComponent,
    BottomNavbarComponent,
  },
};
</script>
<style lang="scss">
</style>