<template>
  <base-layout>
    <div class="q-pa-md row q-gutter-lg justify-center">
      <q-card
        class="judge-card text-center bg-grey-10"
        v-for="judge in judges"
        :key="judge.id"
      >
        <img :src="judge.image" />

        <q-card-section>
          <div class="text-h6 text-primary">{{ judge.name }}</div>
          <div class="q-mt-sm text-subtitle2">{{ judge.title }}</div>
        </q-card-section>
        <q-card-section class="q-pt-none judge-about">{{
          judge.about
        }}</q-card-section>

        <q-separator inset />
        <q-card-actions class="self-end" align="right">
          <q-btn
            color="primary"
            flat
            :to="{ name: 'judge-recommendation', params: { id: judge.id } }"
            >Recommended Movies</q-btn
          >
          <q-btn color="primary" flat>Follow</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/Base";
export default {
  name: "partner-judges",
  components: {
    BaseLayout,
  },
  data() {
    return {
      judges: [
        {
          title: "Actor",
          recommendations: [{ name: "Dhudh" }, { name: "Dhoom" }],
          id: 1,
          name: "Sindhu Sreenivasa Murthy",
          image:
            "https://res.cloudinary.com/moviepedia/image/upload/w_380,h_270/v1600785908/judges_thumbs/20200922_201207_0000_t2rtbd.png",
          about:
            "Sindhu Sreenivasa Murthy is an actress and casting director, known for Bisht, Please! (2017), Brahman Naman (2016) and French Biriyani (2020). She also works actively in the theatre industry. She is best known for her work in the play Open.",
        },
        {
          title: "Actor",
          recommendations: [{ name: "Dhudh" }, { name: "Dhoom" }],
          id: 2,
          name: "Vipin Sharma",
          image:
            "https://res.cloudinary.com/moviepedia/image/upload/w_380,h_270/v1600784097/judges_thumbs/20200922_182607_0000_dwlpn2.png",
          about:
            "Vipin Sharma is an Indian film actor known for his works predominantly in Hindi cinema. He is an alumnus of National School of Drama, New Delhi, India and the Canadian Film Centre, Toronto, Ontario, Canada.",
        },
        {
          title: "Actor",
          recommendations: [{ name: "Dhudh" }, { name: "Dhoom" }],
          id: 3,
          name: "Niharika Lyra Dutt",
          image:
            "https://res.cloudinary.com/moviepedia/image/upload/w_380,h_270/v1600784095/judges_thumbs/20200922_182642_0000_ispwzr.png",
          about:
            "Niharika Lyra Dutt is an actor and a model.The actor featured in the 2018 Amazon Prime's web series Die Trying. She's also appeared in Amazon's hit web series, Pataal Lok. Her acting prowess has been hailed by the critics and audience alike.",
        },
        {
          title: "Director",
          recommendations: [{ name: "Dhudh" }, { name: "Dhoom" }],
          id: 4,
          name: "Bejoy Nambiar",
          image:
            "https://res.cloudinary.com/moviepedia/image/upload/w_380,h_270/v1600784095/judges_thumbs/20200922_182626_0000_osijza.png",
          about:
            "Bejoy Nambiar (born 12 April 1979) is an Indian film director, and screenwriter who is known for his feature film debut film, Shaitan (2011). His second feature film was a bilingual gangster-comedy film called David. His latest Bollywood film was Wazir (2016), starring Amitabh Bachchan and Farhan Akhtar.",
        },
        {
          title: "Casting Director",
          recommendations: [{ name: "Dhudh" }, { name: "Dhoom" }],
          id: 5,
          name: "Shubham Gaur",
          image:
            "https://res.cloudinary.com/moviepedia/image/upload/v1600785910/judges_thumbs/20200922_193412_0000_s8zlxk.png",
          about:
            "Shubham has worked as a non-fiction writer in UTV And NDTV imagine for 2 yrs. It has been 10 years since he's been working as casting director in Mumbai. Some of his work includes The Lunchbox, Sense8, The Jungle Book, etc.",
        },
        {
          title: "Founder, Humans of Cinema",
          recommendations: [{ name: "Dhudh" }, { name: "Dhoom" }],
          id: 6,
          name: "Harshit Bansal",
          image:
            "https://res.cloudinary.com/moviepedia/image/upload/v1600785909/judges_thumbs/20200922_193347_0000_r2wgnw.png",
          about:
            "Harshit is the founder and curator of 'Humans of Cinema', a digital film appreciation platform where cinephiles have conversations around their favorite films and the impact of cinema. He also hosts a film podcast where he chats with film artists about their craft and their love for cinema.",
        },
        {
          title: "Writer",
          recommendations: [{ name: "Dhudh" }, { name: "Dhoom" }],
          id: 7,
          name: "Pawan Sony",
          image:
            "https://res.cloudinary.com/moviepedia/image/upload/v1600785909/judges_thumbs/20200922_193654_0000_yb5ann.png",
          about:
            "Pawan Sony has written for films like Stree (dir. Amar Kaushik) Dil Dosti Etc. (dir. Manish Tiwary), Sixteen (dir. Raj Purohit) and many more. He has published a graphic novel called Bhishma published by Holy Cow.",
        },
        {
          title: "Creative Writer/Director",
          recommendations: [{ name: "Dhudh" }, { name: "Dhoom" }],
          id: 8,
          name: "Suganndha Mehrotra",
          image:
            "https://res.cloudinary.com/moviepedia/image/upload/v1600785908/judges_thumbs/20200922_194405_0000_fl7epl.png",
          about:
            "Suganndha has worked as an Assistant Director for R. Balki in Paa and Second Assistant Director for Neeraj Pandey in films like Special 26, Baby. She has also worked as an Executive Producer in Homeshop18",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.judge-card {
  max-width: 300px;
}
.judge-about {
}
</style>