import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useViewStore = defineStore({
  id: "viewStore",
  state: () => ({
    view: useStorage("view", ""),
    fab: useStorage("fab", null),
    drawer: useStorage("drawer", null),
  }),
  getters: {
    defaultViewGetter() {
      return this.view;
    },
    fabGetter() {
      return this.fab;
    },
    drawerGetter() {
      return this.drawer;
    },
  },
  actions: {
    changeDefaultView(DV) {
      this.view = DV;
    },
    changeFab(x) {
      this.fab = x;
    },
    changeDrawer(x) {
      this.drawer = x;
    },
  },
});
