<template>
  <div class="d-flex justify-start flex-wrap pa-4">
    <v-card
      rounded
      variant="elevated"
      width="344"
      max-width="344"
      density="compact"
      v-for="item in getInprogessList"
      :title="item.title.toLocaleUpperCase()"
      class="elevation-1 ma-2 align-center justify-start bgCard"
    >
      <v-card-subtitle class="mb-2">
        {{ convertdate(item.time) }}<span> - </span>
        {{ convertime(item.time) }}</v-card-subtitle
      >
      <v-img
        height="auto"
        src="../../assets/progressBg.svg"
        cover
        width="344px"
        class="text-white"
      >
        <v-layout full-height class="align-center">
          <v-card-text class="text-subtitle-1">
            {{ item.description }}
          </v-card-text>
        </v-layout>
      </v-img>
      <v-card-actions class="align-self-center justify-end">
        <v-btn
          density="comfortable"
          color="grey-darken-2"
          class="me-2"
          icon="mdi-delete"
          @click="changeStatus(item, 'deleted')"
        />
        <v-btn
          density="comfortable"
          color="green-darken-2"
          icon="mdi-check-all"
          @click="changeStatus(item, 'finished')"
        />
      </v-card-actions>
    </v-card>
    <div v-show="isLoading" class="progDiv">
      <!-- <v-progress-linear
        class="prog2"
        :height="7"
        indeterminate
        color="green"
      ></v-progress-linear> -->

      <v-progress-circular
        class="prog"
        :size="90"
        :width="9"
        color="purple"
        indeterminate
      ></v-progress-circular>
    </div>
  </div>
</template>
<script>
import { useTodoStore } from "../../stores/todoStore";
import { useDisplay } from "vuetify";

export default {
  setup() {
    const datastore = useTodoStore();
    const { xs, mdAndUp, mdAndDown, lgAndUp } = useDisplay();

    return { datastore, xs, mdAndUp, mdAndDown, lgAndUp };
  },
  name: "progressComponent",
  data: () => ({
    isLoading: false,
    selectedItem: null,
  }),
  methods: {
    convertdate(timestap) {
      var date = new Date(timestap);
      var dd = date.toLocaleDateString("en-US");
      return dd;
    },
    convertime(timestap) {
      var date = new Date(timestap);
      var dt = date.toLocaleTimeString("en-US");
      return dt;
    },
    deleteItem(item) {
      this.datastore.deleteTask(item);
    },
    changeStatus(item, newStat) {
      this.datastore.modifyStatus(item, newStat);
    },
  },
  async created() {
    this.isLoading = true;
    await this.datastore.getInprogressTasks();
    setTimeout(() => {
      this.isLoading = false;
    }, 200);
  },
  computed: {
    getInprogessList() {
      return this.datastore.inprogessList;
    },
  },
  watch: {
    getInprogessList: {
      handler(newVal, oldVal) {
        if (newVal == undefined || null) {
          this.isLoading = true;
          setTimeout(() => {
            this.datastore.getInprogressTasks();
            this.isLoading = false;
          }, 200);
        } else {
          this.isLoading = true;
          setTimeout(() => {
            this.getInprogessList;
            this.isLoading = false;
          }, 200);
        }
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
<style scoped>
.bgCard {
  background-color: #f1dfcf10;
}
.progDiv {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #0000002c;
  background-size: cover;
  height: 100%;
  width: 100%;
}
.prog2 {
  position: fixed;
  top: 60px;
  z-index: 999;
}
.prog {
  position: fixed;
  bottom: 50%;
  left: 50%;
  align-self: center;
}
</style>
