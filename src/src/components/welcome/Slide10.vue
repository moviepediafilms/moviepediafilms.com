<template>
  <div
    style="background-image: url('/img/10_bg.png')"
    class="q-mt-lg mp-bg q-py-lg"
  >
    <bar-hammer />
    <div class="q-mx-lg">
      <div class="text-center q-mb-sm q-mt-lg">
        <img src="@/assets/icon_stripped.png" width="200px" />
      </div>
      <div class="mp-subtitle q-mb-lg text-center text-primary">
        The First Social Content Discovery Platform
      </div>

      <div class="row q-my-md" v-for="(item, index) in contacts" :key="index">
        <div
          class="col self-center q-mr-lg text-right align-center mp-subtitle"
          ref="content"
        >
          {{ item.text }}
        </div>

        <div
          ref="icons"
          class="flex justify-center items-center circular-border"
          style="height: 70px; width: 70px"
        >
          <div
            class="flex justify-center items-center circular-border"
            style="height: 60px; width: 60px"
          >
            <q-btn
              round
              :icon="item.icon"
              text-color="dark"
              color="primary"
              size="md"
              @click="on_action(item)"
            />
            <a :href="item.href" :ref="item.action" target="_blank" />
          </div>
        </div>
      </div>
      <div class="mp-title2 text-weight-bold text-primary">Contact Us</div>
    </div>
    <play-x3-bar />
  </div>
</template>
<script>
import BarHammer from "@/components/animated/BarHammer";
import PlayX3Bar from "@/components/animated/PlayX3Bar";
export default {
  components: { BarHammer, PlayX3Bar },
  data() {
    return {
      contacts: [
        {
          text: "+91 8400334876",
          href: "tel:+918400334876",
          icon: "mdi-phone",
          action: "phone",
        },
        {
          text: "contactus@moviepediafilms.com",
          href: "mailto:contactus@moviepediafilms.com",
          icon: "mdi-email",
          action: "email",
        },
        {
          text: "+91 9711487501",
          href: "https://wa.me/919711487501",
          icon: "mdi-whatsapp",
          action: "whatsapp",
        },
      ],
    };
  },
  computed: {},
  mounted() {
    setTimeout(this.add_animation, 100);
  },
  methods: {
    add_animation() {
      this.$refs.icons.forEach((icon, index) => {
        this.$gsap.from(icon, {
          scale: 0,
          duration: 0.3 + 0.3 * index,
          ease: "back",
          scrollTrigger: icon,
        });
      });
      this.$refs.content.forEach((text) => {
        this.$gsap.from(text, {
          opacity: 0,
          duration: 0.5,
          scrollTrigger: text,
        });
      });
    },
    on_action(item) {
      this.$refs[item.action][0].click();
    },
  },
};
</script>
<style scoped>
.circular-border {
  border: 1px solid #a2a2a2;
  border-radius: 50%;
  margin: auto;
}
</style>