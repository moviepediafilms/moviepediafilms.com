<template>
  <q-header reveal elevated class="bg-primary text-dark">
    <!-- <div class="row justify-center q-ma-md">
      <div class="text-center text-uppercase text-h6">Website is under construction</div>
    </div>-->
    <q-toolbar>
      <q-toolbar-title>
        <router-link :to="{name: 'home'}">
          <q-avatar class="q-mr-md">
            <img src="@/assets/logo.png" />
          </q-avatar>
        </router-link>
        <router-link
          :to="{name: 'home'}"
          style="text-decoration: none;"
          class="text-dark text-weight-light"
        >Moviepedia Films</router-link>
      </q-toolbar-title>
      <q-btn flat round color="secondary" class="q-mr-sm" icon="mdi-filter-outline" />
      <q-btn flat round color="secondary" class="q-mr-sm" icon="mdi-bell-outline" />
      <q-btn flat round color="secondary" class="q-mr-sm" icon="mdi-menu">
        <q-menu auto-close content-class="negative">
          <q-list style="min-width: 100px">
            <q-item clickable>
              <q-item-section>Submit a Film</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Filmmaker of the Month</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>MDFF Top 10</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Contest Leaderboard</q-item-section>
            </q-item>
            <q-item clickable :to="{name: 'partner-judges'}">
              <q-item-section>Partner Celebs</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Login/Logout</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>