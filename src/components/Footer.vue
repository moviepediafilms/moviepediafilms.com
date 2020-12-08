<template>
  <footer class="bg-grey-10 q-py-xl q-px-md q-mt-lg">
    <div class="row">
      <div class="col-12 col-md-4 q-mt-md text-center align-middle">
        <router-link :to="{ name: 'home' }">
          <img height="100px" src="@/assets/icon.png" />
        </router-link>
        <br />
        <span class="text-uppercase text-primary text-h1">
          Moviepedia Films
        </span>
      </div>
      <div class="col-12 col-md-4 q-mt-lg text-center align-middle">
        <p class="text-uppercase text-primary text-h4">About Us</p>
        <span class="text-muted">
          Moviepedia, as a community of film-makers, film enthusiasts, actors,
          scriptwriters, etc. is constantly growing. We already share similar
          interests with over 160,000 people across the globe, spreading the
          nuances of art. We take keen pleasure in curating and reviewing films
          and provide independent filmmakers with a distinguished platform to
          showcase their vision. This platform is home to the perseverance, hard
          work and passion of independent filmmakers, budding artists, and
          storytellers out there.
        </span>
        <br />
      </div>
      <div class="col-12 col-md-4 q-mt-md text-center">
        <p class="text-uppercase text-primary text-h4">Contact Us</p>
        <div class="text-center social-links text-muted q-gutter-md">
          <a
            target="_blank"
            href="https://facebook.com/MoviepediaOfficial"
            class="social-link"
          >
            <q-icon name="mdi-facebook" class="q-mr-sm" size="sm"></q-icon>
          </a>
          <a
            target="_blank"
            href="https://instagram.com/movie.pedia"
            class="text-reset social-link"
          >
            <q-icon name="mdi-instagram" class="q-mr-sm" size="sm"></q-icon>
          </a>
          <a
            target="_blank"
            href="https://www.youtube.com/channel/UCBuP4H9TLLM13quoXQvJ3Ag"
            class="text-reset social-link"
          >
            <q-icon name="mdi-youtube" class="q-mr-sm" size="sm"></q-icon>
          </a>

          <a
            data-rel="external"
            href="tel:8400334876"
            class="text-reset social-link"
          >
            <q-icon name="mdi-phone" class="q-mr-sm" size="sm"></q-icon>
          </a>
          <a
            data-rel="external"
            href="mailto:contactus@moviepediafilms.com"
            class="social-link"
          >
            <q-icon name="mdi-email" class="q-mr-sm" size="sm"></q-icon>
          </a>
        </div>
        <p class="text-uppercase text-primary q-mt-lg text-h4">Other Links</p>
        <router-link :to="{ name: 'refund-policy' }" class="other-link">
          Refund Policy
        </router-link>
        <router-link :to="{ name: 'privacy-policy' }" class="other-link">
          Privacy Policy
        </router-link>
        <router-link :to="{ name: 'tos' }" class="other-link">
          Terms of Services
        </router-link>
        <router-link :to="{ name: 'about' }" class="other-link">
          About Us
        </router-link>
        <router-link :to="{ name: 'rules-and-regulations' }" class="other-link">
          Rules &amp; Regulations
        </router-link>
      </div>
    </div>
  </footer>
</template>
<style lang="scss" scoped>
footer {
  color: #afafaf;
}
.other-link {
  padding: 5px 0;
  text-decoration: none;
  color: #afafaf;
  display: inline-block;
  padding-right: 5px;
  padding-left: 5px;
  &:hover {
    color: #f7cd23;
    font-weight: 800;
  }
}
.social-links .social-link {
  padding: 5px 0;
  text-decoration: none;
  color: #afafaf;
  display: inline-block;
  &:hover {
    color: #f7cd23;
    font-weight: 800;
  }
}
</style>