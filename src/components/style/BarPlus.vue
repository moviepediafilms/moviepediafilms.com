<template>
  <div class="flex justify-end items-center">
    <transition
      appear
      name="custom-classes-transition"
      enter-active-class="animated animate__fadeInLeftBig"
      mode="out-in"
      :duration="200"
    >
      <div class="col q-mr-sm">
        <div style="border-top: 2px solid white; width: 100%"></div>
      </div>
    </transition>
    <transition
      appear
      name="custom-classes-transition"
      enter-active-class="animated animate__fadeIn"
      mode="out-in"
      :duration="200"
    >
      <div class="color-bg-white">
        <q-icon name="mdi-plus" color="primary" size="32px" class="q-mr-md" />
      </div>
    </transition>
  </div>
</template>