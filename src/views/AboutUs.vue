<template>
  <base-layout>
    <div class="q-ma-md q-pt-lg">
      <h4 class="text-primary mt-5 text-uppercase text-center">About Us</h4>
      <div class="text-h5 text-primary q-mt-lg q-mb-sm">Tagline</div>
      <p>Let the films do the talking.</p>
      <div class="text-h5 text-primary q-mt-lg q-mb-sm">Vision</div>
      <p>
        We aspire to democratize access to independent films and redefine
        filmmaking.
      </p>
      <div class="text-h5 text-primary q-mt-lg q-mb-sm">Mission</div>
      <p>
        Our mission is to facilitate filmmaking processes and ensure that the
        best films move their audience. We strive to impact the lives of 10
        million filmmakers.
      </p>
      <p>
        Films have been the most effective medium of story-telling, impacting
        lives across the globe. A good story usually transcends boundaries.
        There’s a treasure trove of such films remaining obscure on the
        internet. Filmmakers, story-tellers burn their midnight oil for the
        reach while cinephiles get a headache browsing content. At Moviepedia
        Films, we strive to bridge this gap. We connect the creators with the
        enthusiasts. We ensure that a filmmaker’s time is spent more on the art
        while we seamlessly manage the daily hassles.
      </p>
      <div class="text-h5 text-primary q-mt-lg q-mb-sm">What do we do?</div>
      <p>
        We curate films from across the globe. We use new-age technology to help
        our filmmakers reach out to a large pool of cinephiles to showcase their
        stories. We bridge the gap between enthusiasts and creators. Both can
        connect on any topic filmmaking. We ensure that every person gets to see
        refreshing films every day, which are otherwise hidden gems.
      </p>
      <div class="text-h5 text-primary q-mt-lg q-mb-sm">Who are we?</div>
      <p>
        We are a bunch of film enthusiasts, binge-watching all the great
        content. We find a strong connection with the art of storytelling. We
        feel that a story can change the world. We derive our philosophy of life
        from films that move us. We are a community of filmmakers, actors,
        scriptwriters. We intend to spread the nuances of art across the world.
      </p>
      <div class="text-h5 text-primary q-mt-lg q-mb-sm">Why us?</div>
      <p>
        There’s a bunch of middle-man standing between a filmmaker and the
        audience. We ensure that good stories reach out to their audience with
        the minimum hassle. We also do not ask filmmakers to give us their
        content rights. Instead, we make the process of filmmaking simpler.
      </p>
      <div class="text-h5 text-primary q-mt-lg q-mb-sm">
        What’s there for you?
      </div>
      <p>
        You get hand-picked films recommended by industry veterans at Moviepedia
        Films, personalized just for you. We don’t charge you for the content.
        We connect you with your favorite filmmakers to contribute to their
        upcoming film projects. It doesn’t end there. You get to be the much
        coveted ‘Co-Producer’ of the film. From pre-production to
        post-production, you can stay involved in the process of filmmaking.
      </p>
      <p>
        Are you a filmmaker? If the answer is yes, do check out how we can serve
        you
        <router-link
          class="text-decoration-none text-primary"
          :to="{ name: 'submit' }"
          >Submit Film Page</router-link
        >
      </p>

      <div class="text-h5 text-primary q-mt-lg q-mb-sm">Careers</div>
      <div class="text-h5 text-primary q-mt-md q-mb-sm">Culture</div>
      <p>
        At Moviepedia Films, we draw inspiration from films. We firmly believe
        films are liberating, refreshing, and can impact billions of lives. To
        find such hidden gems, which are otherwise getting obscured on the
        internet, involves tireless efforts and a passion for creative arts.
        Another thing, it’s all about ‘US’ and never ‘me’ at Moviepedia Films.
      </p>
      <div class="text-h5 text-primary q-mt-lg q-mb-sm">Values</div>
      <p>
        We are a people-first organization. Empathy forms the core. Be it a
        filmmaker or an employee or the audience, we ensure the best experience
        for our people. We are passionate and self-motivated, aiming to touch a
        billion lives. Our idea was born to bridge the transparency voids.
        Transparency is our top of the head priority. We emphasize mutual
        respect and empower each other.
      </p>
      <div class="text-h5 text-primary q-mt-lg q-mb-sm">Available roles</div>
      <p></p>
      <div class="text-h5 text-primary q-mt-sm q-mb-sm">Content Expert</div>
      <p>
        If you have the ability to binge-watch shows, then you’re at the right
        place. You’ve to sit back, watch movies, and share your critical views.
        You’d be responsible for analyzing the content and decide whether it
        fits the kind of content that we put up.
      </p>
      <p>
        Do you think you’re the one? If yes, send us your application at
        <a
          class="text-decoration-none text-primary"
          href="mailto:contactus@moviepediafilms.com"
          target="_blank"
          >contactus@moviepediafilms.com</a
        >
      </p>
    </div>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/Base";
export default {
  name: "tos-page",
  components: {
    BaseLayout,
  },
  metaInfo: {
    title: "About Us",
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
</style>