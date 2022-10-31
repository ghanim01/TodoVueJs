import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { createPinia } from "pinia";
import { loadFonts } from "./plugins/webfontloader";
import "./style.css";
import { createRouter, createWebHashHistory } from "vue-router";
import homeView from "./views/HomeView.vue";
import alternativeView from "./views/alternativeHome.vue";
import toDoComponent from "./components/todoComponents/toDoComponent.vue";
import progressComponent from "./components/todoComponents/progressComponent.vue";
import finishedComponent from "./components/todoComponents/finishedComponent.vue";
import deletedComponent from "./components/todoComponents/deletedComponent.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/alternative",
      name: "alternative",
      component: alternativeView,
    },
    {
      path: "/",
      name: "home",
      component: homeView,
      children: [
        {
          path: "",
          name: "gohome",
          redirect: "/todolist",
        },

        {
          path: "/todolist",
          name: "todolist",
          component: toDoComponent,
        },
        {
          path: "/progresslist",
          name: "progresslist",
          component: progressComponent,
        },
        {
          path: "/finishedlist",
          name: "finishedlist",
          component: finishedComponent,
        },
        {
          path: "/deletedlist",
          name: "deletedlist",
          component: deletedComponent,
        },
      ],
    },
  ],
});

const pinia = createPinia();

loadFonts();

const app = createApp(App);

app.use(router).use(pinia).use(vuetify).mount("#app");
