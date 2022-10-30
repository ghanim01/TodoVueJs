<template>
  <v-app>
    <apppNavBar />
    <v-main class="bgSVG">
      <router-view />
    </v-main>
    <v-btn
      id="fabAni"
      ripple
      size="large"
      class="fabStyle rotate-center"
      icon="mdi-plus-thick"
      color="blue-darken-4"
    ></v-btn>
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
  data: () => ({
    fab: null,
  }),
  methods: {
    fabClick() {
      document.getElementById("fabAni").className = "rotate-center";
    },
  },
};
</script>
<style>
@-webkit-keyframes rotate-center {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotate-center {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.fabStyle {
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 25px;
}
.rotate-center {
  -webkit-animation: rotate-center 0.6s ease-in-out both;
  animation: rotate-center 0.6s ease-in-out both;
}
.bgSVG {
  background-color: rgba(240, 250, 252, 0.418);
  background-image: url("../src/assets/HomeBg.svg");
  background-repeat: repeat;
}
</style>
