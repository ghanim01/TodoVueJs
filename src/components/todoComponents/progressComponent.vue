<template>
  <div class="d-flex justify-start flex-wrap pa-4">
    <v-card
      rounded
      variant="elevated"
      width="344"
      max-width="344"
      density="compact"
      v-for="item in inprogressList"
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
  </div>
</template>
<script>
import { onUpdated, onMounted, ref } from "vue";
import { useTodoStore } from "../../stores/todoStore";
export default {
  setup() {
    const datastore = useTodoStore();

    const inprogressList = ref([]);
    onMounted(async () => {
      await datastore.getInprogressTasks();
      const res = datastore.inprogressListGetter;
      inprogressList.value = res;
    });
    onUpdated(() => {
      datastore.getInprogressTasks();
    });
    return { inprogressList, datastore };
  },
  name: "progressComponent",
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
  background-color: #f1dfcf10;
}
</style>
