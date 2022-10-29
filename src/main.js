import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { createPinia } from "pinia";
import { loadFonts } from "./plugins/webfontloader";
import "./style.css";
import router from "./router";

const pinia = createPinia();

loadFonts();

createApp(App).use(router).use(pinia).use(vuetify).mount("#app");
