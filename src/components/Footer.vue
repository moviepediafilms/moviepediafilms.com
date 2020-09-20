<template>
  <footer class="bg-grey-10 q-py-xl q-px-md q-mt-lg">
    <div class="row">
      <div class="col-12 col-md-4 q-mt-md text-center align-middle">
        <a href="/">
          <img height="100px" src="@/assets/icon_white.png" />
          <br />
        </a>
        <br />
        <span class="text-uppercase text-weight-bold text-primary">
          Moviepedia
          Films
        </span>
        <br />
      </div>
      <div class="col-12 col-md-4 q-mt-md text-center align-middle">
        <p class="text-uppercase text-weight-bold text-primary">About Us</p>
        <span class="text-muted">
          Moviepedia, as a community of film-makers, film enthusiasts, actors, scriptwriters, etc. is constantly growing. We already share
          similar interests with over 160,000 people across the globe, spreading the nuances of art. We take keen pleasure in curating and
          reviewing films and provide independent filmmakers with a distinguished platform to showcase their vision.
          We are organizing the Moviepedia Digital Film Festival 2020,
          to not only screen the top 10 films but also make the experience interactive and engaging.
          This platform is home to the perseverance, hard work and passion of independent filmmakers, budding artists, and storytellers out there.
        </span>
        <br />
      </div>
      <div class="col-12 col-md-4 q-mt-md text-center">
        <p class="text-uppercase text-weight-bold text-primary">Contact Us</p>
        <div class="text-center social-links text-muted">
          <a target="_blank" href="https://facebook.com/MoviepediaOfficial" class="social-link">
            <i class="fab fa-facebook-f fa-fw"></i>
            MoviepediaOfficial
          </a>
          <a
            target="_blank"
            href="https://instagram.com/movie.pedia"
            class="text-decoration-none text-reset social-link"
          >
            <i class="fab fa-instagram fa-fw"></i> movie.pedia
          </a>
          <a
            target="_blank"
            href="https://www.youtube.com/channel/UCBuP4H9TLLM13quoXQvJ3Ag"
            class="text-decoration-none text-reset social-link"
          >
            <i class="fab fa-youtube fa-fw"></i> Moviepedia
            Official
          </a>

          <a
            data-rel="external"
            href="tel:8400334876"
            class="text-decoration-none text-reset social-link"
          >
            <i class="fas fa-phone fa-fw"></i> +91 8400334876
          </a>
          <a
            data-rel="external"
            href="mailto:contactus@moviepediafilms.com"
            class="text-decoration-none social-link"
          >
            <i class="far fa-envelope fa-fw"></i>
            contactus@moviepediafilms.com
          </a>
        </div>
        <p class="text-uppercase text-weight-bold text-primary q-mt-md">Other Links</p>
        <router-link :to="{name: 'refund-policy'}" class="other-link">Refund Policy</router-link>

        <router-link :to="{name: 'privacy-policy'}" class="other-link">Privacy Policy</router-link>

        <router-link :to="{name: 'tos'}" class="other-link">Terms of Services</router-link>
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
  display: block;
  &:hover {
    color: #f7cd23;
    font-weight: 800;
  }
}
.social-links .social-link {
  padding: 5px 0;
  text-decoration: none;
  color: #afafaf;
  display: block;
  &:hover {
    color: #f7cd23;
    font-weight: 800;
  }
}
</style>