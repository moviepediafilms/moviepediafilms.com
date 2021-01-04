<template>
  <transition name="fade">
    <div class="bg-dark">
      <q-layout view="hHh lPr fFf">
        <navbar-component></navbar-component>
        <q-page-container>
          <div class="row">
            <div class="col-12 col-md-6 offset-md-3">
              <slot></slot>
            </div>
          </div>
          <footer-component></footer-component>
        </q-page-container>
        <bottom-navbar-component></bottom-navbar-component>
      </q-layout>
    </div>
  </transition>
</template>

<script>
import FooterComponent from "@/components/Footer";
import NavbarComponent from "@/components/Navbar";
import BottomNavbarComponent from "@/components/BottomNavbar";
export default {
  name: "baselayout",
  metaInfo() {
    return {
      meta: [
        {
          name: "description",
          content:
            "At Moviepedia Films, we are building the 'first social content discovery platform' where both filmmakers and their audience get rewarded for what they do best- create & curate.",
        },
        {
          itemProp: "description",
          content:
            "At Moviepedia Films, we are building the 'first social content discovery platform' where both filmmakers and their audience get rewarded for what they do best- create & curate.",
        },
        { name: "author", content: "Moviepedia Films" },
        { itemProp: "author", content: "Moviepedia Films" },
        {
          itemProp: "image",
          content: "https://moviepediafilms.com/tile150.png",
        },

        { property: "og:site_name", content: "Moviepedia Films" },
        { property: "og:type", content: "website" },
        { itemProp: "og:type", content: "website" },
        {
          property: "og:title",
          content:
            "Moviepedia Films | The First Social Content Discovery Platform",
        },
        {
          itemProp: "og:title",
          content:
            "Moviepedia Films | The First Social Content Discovery Platform",
        },
        {
          property: "og:description",
          content:
            "At Moviepedia Films, we are building the 'first social content discovery platform' where both filmmakers and their audience get rewarded for what they do best- create & curate.",
        },
        {
          itemProp: "og:description",
          content:
            "At Moviepedia Films, we are building the 'first social content discovery platform' where both filmmakers and their audience get rewarded for what they do best- create & curate.",
        },
        { property: "og:url", content: "https://moviepediafilms.com/" },
        { itemProp: "og:url", content: "https://moviepediafilms.com/" },
        {
          property: "og:image",
          content: "https://moviepediafilms.com/tile-wide-dark.jpeg",
        },
        {
          itemProp: "og:image",
          content: "https://moviepediafilms.com/tile-wide-dark.jpeg",
        },
        { property: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image:alt", content: "Moviepedia Films Logo" },

        // { name: "twitter:site", content: "@website-username" },
        // { property: "fb:pages", content: "" },
        // { property: "fb:app_id", content: "your_app_id" },
      ],
    };
  },
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