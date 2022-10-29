<template>
  <div class="d-flex justify-start flex-wrap pa-4">
    <v-card
      rounded
      variant="elevated"
      density="compact"
      v-for="item in deletedList"
      :subtitle="convertdate(item.time)"
      class="elevation-1 ma-2 align-center justify-start bgCard"
      width="344"
      max-width="344"
      :title="item.title.toLocaleUpperCase()"
    >
      <v-img
        height="auto"
        src="../../assets/deletedBg.svg"
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
          color="grey-darken-1"
          variant="text"
          denisty="compact"
          rounded
          stacked
          size="small"
          class="me-2"
          append-icon="mdi-delete-forever"
          @click.stop="vdialogToggle(item)"
        >
          <v-tooltip activator="parent" location="bottom"
            >Delete Forever</v-tooltip
          ></v-btn
        >
        <v-btn
          color="orange-darken-4"
          variant="text"
          denisty="compact"
          size="small"
          stacked
          rounded
          class="me-2"
          append-icon="mdi-progress-clock"
          @click.prevent="changeStatus(item, 'inprogress')"
          ><v-tooltip activator="parent" location="bottom"
            >Move to Inprogress</v-tooltip
          ></v-btn
        >
        <v-btn
          color="green-darken-2"
          variant="text"
          denisty="compact"
          size="small"
          stacked
          rounded
          append-icon="mdi-check-all"
          @click.prevent="changeStatus(item, 'finished')"
          ><v-tooltip activator="parent" location="bottom"
            >Move to Finished</v-tooltip
          ></v-btn
        >
      </v-card-actions>
    </v-card>
    <v-dialog
      transition="dialog-bottom-transition"
      persistent
      width="auto"
      min-width="600px"
      ref="vdialog"
      v-model="vdialog"
    >
      <v-card variant="elevated" rounded>
        <v-toolbar
          color="red-darken-4"
          density="comfortable"
          class="align-center"
        >
          <v-toolbar-title>Delete task forever Task</v-toolbar-title>
        </v-toolbar>
        <v-card-title primary-title class="py-8 text-center">
          Are you sure you want to delete this task for ever?
        </v-card-title>
        <v-card-actions class="justify-center mb-2">
          <v-btn
            class="px-10 mx-2"
            variant="tonal"
            color="red-darken-3"
            @click="deleteItem()"
            >Yes</v-btn
          >
          <v-btn
            class="px-10 mx-2"
            variant="tonal"
            color="grey-darken-3"
            @click="this.vdialog = false"
            >No</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { onUpdated, onMounted, ref } from "vue";
import { useTodoStore } from "../../stores/todoStore";
export default {
  setup() {
    const datastore = useTodoStore();

    const deletedList = ref([]);
    onMounted(async () => {
      await datastore.getDeletedTasks();
      const res = datastore.deletedListGetter;
      deletedList.value = res;
    });
    onUpdated(() => {
      datastore.getDeletedTasks();
    });
    return { deletedList, datastore };
  },
  name: "deletedComponent",
  data: () => ({
    vdialog: false,
    selectedItem: {},
  }),
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
    changeStatus(item, NewStat) {
      this.datastore.modifyStatus(item, NewStat);
    },
    deleteItem() {
      this.datastore.deleteTask(this.selectedItem);
      this.vdialog = false;
    },
    vdialogToggle(item) {
      this.selectedItem = item;
      this.vdialog = true;
    },
  },
};
</script>
<style scoped>
.bgCard {
  background-color: #beb4b413;
}
</style>
