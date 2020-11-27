<template>
  <div class="flex items-center justify-start q-mt-lg">
    <transition
      appear
      name="custom-classes-transition"
      enter-active-class="animated animate__fadeInLeftBig"
      mode="out-in"
      :duration="200"
    >
      <div class="q-ml-lg">
        <q-icon name="mdi-play" size="24px" />
        <q-icon name="mdi-play" size="24px" />
        <q-icon name="mdi-play" size="24px" color="primary" />
      </div>
    </transition>
    <transition
      appear
      name="custom-classes-transition"
      enter-active-class="animated animate__fadeInLeft"
      mode="out-in"
      :duration="200"
    >
      <div class="col q-ml-lg">
        <div style="border-top: 1px solid white"></div>
      </div>
    </transition>
  </div>
</template>