<template>
  <v-app>
    <apppNavBar />
    <v-main class="bgSVG">
      <router-view />
    </v-main>
    <fabComponent />
  </v-app>
</template>
<script>
import apppNavBar from "./components/appNavBarComponent.vue";
import fabComponent from "./components/todoComponents/fabComponent.vue";
import { useDisplay } from "vuetify";

export default {
  name: "App",
  setup() {
    const { xs, mdAndUp, mdAndDown, lgAndUp } = useDisplay();
    return { xs, mdAndUp, mdAndDown, lgAndUp };
  },

  components: {
    apppNavBar,
    fabComponent,
  },
  data: () => ({}),
};
</script>
<style>
.bgSVG {
  background-color: rgba(240, 250, 252, 0.418);
  background-image: url("../src/assets/HomeBg.svg");
  background-repeat: repeat;
}
</style>
