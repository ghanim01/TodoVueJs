import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useViewStore = defineStore({
  id: "viewStore",
  state: () => ({
    view: useStorage("view", ""),
    fab: useStorage("fab", false),
  }),
  getters: {
    defaultViewGetter() {
      return this.view;
    },
    fabGetter() {
      return this.fab;
    },
  },
  actions: {
    changeDefaultView(DV) {
      this.view = DV;
    },
    changeFab(x) {
      this.view = x;
    },
  },
});
