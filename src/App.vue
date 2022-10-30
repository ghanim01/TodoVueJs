<template>
  <v-app>
    <apppNavBar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import apppNavBar from "./components/appNavBarComponent.vue";
import { useDisplay } from "vuetify";

export default {
  name: "App",
  setup() {
    const { xs, mdAndUp, mdAndDown, lgAndUp } = useDisplay();
    return { xs, mdAndUp, mdAndDown, lgAndUp };
  },

  components: {
    apppNavBar,
  },
  data: () => ({}),
};
</script>
