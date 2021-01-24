<template>
  <div class="mp-bg q-pb-lg">
    <div class="q-mx-lg q-mt-lg">
      <div class="mp-title2 text-primary text-weight-bold text-center">
        Our Partner Celebrities
      </div>
      <celeb-item
        ref="celebs"
        v-for="(celeb, index) in celebs"
        :name="celeb.name"
        :title="celeb.title"
        :image="celeb.image"
        :key="index"
      ></celeb-item>
    </div>
  </div>
</template>
<script>
import CelebItem from "@/components/welcome/CelebItem";
export default {
  components: {
    CelebItem,
  },
  data() {
    return {
      celebs: [
        {
          name: "Mihir Desai",
          title: "Filmmaker, Mirzapur",
          image: "/img/judges/mihir.jpg",
        },
        {
          name: "Vipin Sharma",
          title: "Actor, Gangs of Wasseypur",
          image: "/img/judges/vipin.jpg",
        },
        {
          name: "Sindhu S. Murthy",
          title: "Actor, Brahman Naman",
          image: "/img/judges/sindhu.jpg",
        },
        {
          name: "Niharika L. Dutt",
          title: "Actor, Paatal Lok",
          image: "/img/judges/niharika.jpg",
        },
        {
          name: "Dar Gai",
          title: "Filmmaker, Namdev Bhau",
          image: "/img/judges/dar.jpg",
        },
        {
          name: "Shubham Gaur",
          title: "Casting Director, Ludo",
          image: "/img/judges/shubham.jpg",
        },
        {
          name: "Deeptesh Das",
          title: "Actor, Paatal Lok",
          image: "/img/judges/deeptesh.jpg",
        },
        {
          name: "Ashish Aryan",
          title: "Filmmaker, Kanpuriye",
          image: "/img/judges/ashish.jpg",
        },
      ],
    };
  },
  mounted() {
    setTimeout(this.add_animation, 100);
  },
  methods: {
    add_animation() {
      this.$refs.celebs.forEach((celb) => {
        this.$gsap.from(celb.$el, {
          yPercent: 150,
          opacity: 0,
          duration: 0.7,
          stagger: true,
          ease: "back",
          scrollTrigger: {
            trigger: celb.$el,
            start: "top 85%",
          },
        });
      });
    },
  },
};
</script>
