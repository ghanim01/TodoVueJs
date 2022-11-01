<template>
  <div class="d-flex justify-start align-center flex-wrap pa-4">
    <v-card
      rounded
      variant="elevated"
      width="344"
      max-width="344"
      density="compact"
      v-for="item in createdList"
      :width="lgAndUp ? '344px' : 'auto'"
      class="elevation-1 ma-2 align-center justify-start bgCard"
    >
      <v-card-title
        class="text-subtitle-1 font-weight-medium text-blue-darken-4"
      >
        {{ item.title.toLocaleUpperCase() }}
      </v-card-title>
      <v-card-subtitle
        class="pt-1 headline font-weight-medium text-blue-darken-2 mb-2"
      >
        {{ convertdate(item.time) + " - " + convertime(item.time) }}
      </v-card-subtitle>
      <v-img
        height="auto"
        src="../../assets/todoBg.svg"
        width="344px"
        cover
        class="text-white"
      >
        <v-layout full-height class="align-center">
          <v-card-text
            class="d-flex text-subtitle-2 font-weight-medium flex-wrap"
          >
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
          color="orange-darken-4"
          icon="mdi-progress-clock"
          @click="changeStatus(item, 'inprogress')"
        />
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import { computed, onUpdated, onMounted, ref } from "vue";
import { useTodoStore } from "../../stores/todoStore";
import { useDisplay } from "vuetify";

export default {
  setup() {
    const datastore = useTodoStore();
    const { xs, mdAndUp, mdAndDown, lgAndUp } = useDisplay();
    const createdList = ref({});
    onMounted(async () => {
      await datastore.getCreatedTasks();
      const res = datastore.createdListGetter;
      createdList.value = res;
    });
    onUpdated(() => {
      datastore.getCreatedTasks();
    });
    return { createdList, datastore, xs, mdAndUp, mdAndDown, lgAndUp };
  },
  name: "todoComponent",
  data: () => ({}),
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
};
</script>
<style scoped>
.bgCard {
  background-color: #acd9ff15;
}
</style>
