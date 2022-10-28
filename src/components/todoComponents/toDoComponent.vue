<template>
  <div class="d-flex justify-start flex-wrap pa-4">
    <v-card
      variant="elevated"
      density="compact"
      rounded
      width="344"
      max-width="344"
      v-for="item in createdList"
      :title="item.title.toLocaleUpperCase()"
      :subtitle="convertdate(item.time)"
      class="elevation-1 ma-2 align-center justify-start bgCard"
    >
      <v-img
        height="auto"
        src="../../assets/todoBg.svg"
        cover
        class="text-white"
        min-width="344"
      >
        <v-layout full-height class="align-center">
          <v-card-text class="d-flex text-subtitle-1 flex-wrap">
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
import { onUpdated, onMounted, ref } from "vue";
import { useTodoStore } from "../../stores/todoStore";
export default {
  setup() {
    const datastore = useTodoStore();

    const createdList = ref([]);
    onMounted(async () => {
      await datastore.getCreatedTasks();
      const res = datastore.createdListGetter;
      createdList.value = res;
    });
    onUpdated(() => {
      datastore.getCreatedTasks();
    });
    return { createdList, datastore };
  },
  name: "todoComponent",
  data: () => ({}),
  methods: {
    convertdate(timestap) {
      var date = new Date(timestap * 1000);
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      var seconds = "0" + date.getSeconds();
      var formattedTime =
        hours + ":" + minutes.slice(-2) + ":" + seconds.slice(-2);
      return date, formattedTime;
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
  display: grid !important;
}
</style>
