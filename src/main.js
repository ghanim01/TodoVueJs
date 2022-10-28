import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import vuetify from "./plugins/vuetify";
import { createPinia } from "pinia";
import { loadFonts } from "./plugins/webfontloader";
import "./style.css";
import home from "/src/views/HomeView.vue";

const pinia = createPinia();
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: home,
    },
  ],
});

loadFonts();

createApp(App).use(router).use(pinia).use(vuetify).mount("#app");
