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
import CelebItem from "@/components/home/CelebItem";
export default {
  components: {
    CelebItem,
  },
  data() {
    return {
      celebs: [
        {
          name: "Mihir Desai",
          title: "Filmmaker, Mizapur",
          image: "/default_avatar.png",
        },
        {
          name: "Vipin Sharma",
          title: "Actor, Gangs of Wasseypur",
          image: "/default_avatar.png",
        },
        {
          name: "Sindhu S. Murthy",
          title: "Actor, Brahman Naman",
          image: "/default_avatar.png",
        },
        {
          name: "Niharika L. Dutt",
          title: "Actor, Paatal Lok",
          image: "/default_avatar.png",
        },
        {
          name: "Dar Gai",
          title: "Filmmaker, Namdev Bhau",
          image: "/default_avatar.png",
        },
        {
          name: "Shubham Gaur",
          title: "Casting Director, Ludo",
          image: "/default_avatar.png",
        },
        {
          name: "Deeptesh Das",
          title: "Actor, Paatal Lok",
          image: "/default_avatar.png",
        },
        {
          name: "Ashish Aryan",
          title: "Filmmaker, Kanpuriye",
          image: "/default_avatar.png",
        },
      ],
    };
  },
  mounted() {
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
};
</script>
