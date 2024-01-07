<template>
  <div>
    <q-list padding>
      <template v-for="(prop, idx) in items">
        <q-item :key="`${idx}_item`" class="q-px-none">
          <q-item-section side top>
            <q-icon :name="prop.icon" size="28px" color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-left text-grey-5">
              {{ prop.text }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-list>
    <div class="text-body1 q-my-sm text-grey-5">
      <div class="text-title text-grey-4">
        MDFF x IIM Rohtak : {{ rs }} 499 per submission
      </div>
      <div class="q-mt-sm text-body2 hidden">
        (if this one doesn't get featured, your next film submission is on us)
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: "mdi-account-group",
          color: "light-green",
          text: "Get your film screened at IIM Rohtak.",
        },
        // {
        //   icon: "mdi-youtube",
        //   color: "red-8",
        //   text: "Build a consistent audience for your YouTube releases. We drive a traffic of over 160,000 cinephiles to your content.",
        // },
        {
          icon: "mdi-account-star",
          color: "blue",
          text: "You stand a chance to win cash rewards worth Rs.40,000.",
        },
        {
          icon: "mdi-trophy",
          color: "amber",
          text: "Your film stands a chance to get recommended by our jury of judges from the industry.",
        },
        {
          icon: "mdi-bullseye-arrow",
          color: "deep-purple",
          text: "We curate your profile as a filmmaker and connect you with the audience.",
        },
        // {
        //   icon: "mdi-check-decagram",
        //   color: "light-blue",
        //   text: "We simplify the fundraising for your projects. We connect you with film enthusiasts to get your projects funded.",
        // },
      ],
    };
  },
};
</script>