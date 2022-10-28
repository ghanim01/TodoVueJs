<template>
  <v-app>
    <apppNavBar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import HomeView from "./views/HomeView.vue";
import apppNavBar from "./components/appNavBarComponent.vue";

export default {
  name: "App",

  components: {
    HomeView,
    apppNavBar,
  },

  data: () => ({}),
};
</script>
