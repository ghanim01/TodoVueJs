<template>
  <div
    class="d-flex justify-center align-center flex-wrap"
    :class="lgAndUp ? 'pa-4' : 'py-4'"
  >
    <v-timeline
      align="center"
      line-color="blue-lighten-4"
      truncate-line="both"
      theme="dark"
      v-if="lgAndUp"
    >
      <v-timeline-item
        v-for="item in allTasksList"
        :key="item.id"
        :dot-color="getColor(item.status)"
        size="large"
      >
        <template v-slot:opposite>
          <div
            class="pt-1 headline font-weight-medium"
            :class="getTextColor(item.status)"
            v-text="convertdate(item.time) + ' - ' + convertime(item.time)"
          ></div>
        </template>
        <div>
          <v-card
            variant="elevated"
            density="compact"
            rounded
            :width="lgAndUp ? '344px' : 'auto'"
            class="elevation-1 ma-2 align-center justify-start"
            :class="getStyleClass(item.status)"
          >
            <v-card-title
              class="text-subtitle-1 font-weight-medium"
              :class="getTextColor(item.status)"
            >
              {{ item.title.toLocaleUpperCase() }}
            </v-card-title>
            <v-img
              height="auto"
              :src="getbgSVG(item.status)"
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
                v-if="item.status == 'deleted'"
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
                v-if="
                  item.status == 'created' ||
                  item.status == 'inprogress' ||
                  item.status == 'finished'
                "
                density="comfortable"
                color="grey-darken-2"
                class="me-2"
                icon="mdi-delete"
                @click="changeStatus(item, 'deleted')"
              />
              <v-btn
                v-if="
                  item.status == 'created' ||
                  item.status == 'inprogress' ||
                  item.status == 'deleted'
                "
                density="comfortable"
                color="green-darken-2"
                icon="mdi-check-all"
                @click="changeStatus(item, 'finished')"
              />
              <v-btn
                v-if="
                  item.status == 'created' ||
                  item.status == 'finished' ||
                  item.status == 'deleted'
                "
                density="comfortable"
                color="orange-darken-4"
                icon="mdi-progress-clock"
                @click="changeStatus(item, 'inprogress')"
              />
            </v-card-actions>
          </v-card>
        </div>
      </v-timeline-item>
    </v-timeline>
    <v-timeline v-else side="end" align="center" truncate-line="both">
      <v-timeline-item
        size="small"
        v-for="item in allTasksList"
        :key="item.id"
        :dot-color="getColor(item.status)"
      >
        <div class="d-flex align-center">
          <v-card
            variant="elevated"
            density="compact"
            rounded
            width="260px"
            class="elevation-1 ma-2 align-center justify-start"
            :class="getStyleClass(item.status)"
          >
            <v-card-title
              class="text-subtitle-1 font-weight-medium"
              :class="getTextColor(item.status)"
            >
              {{ item.title.toLocaleUpperCase() }}
            </v-card-title>
            <v-card-subtitle class="mb-1" :class="getTextColor(item.status)">
              <strong class="mr-2 text-subtitle-2">{{
                convertdate(item.time)
              }}</strong>
              <strong class="mr-2 text-subtitle-2">{{
                convertime(item.time)
              }}</strong>
            </v-card-subtitle>
            <v-img
              height="auto"
              :src="getbgSVG(item.status)"
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
                v-if="item.status == 'deleted'"
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
                v-if="
                  item.status == 'created' ||
                  item.status == 'inprogress' ||
                  item.status == 'finished'
                "
                density="comfortable"
                color="grey-darken-2"
                class="me-2"
                icon="mdi-delete"
                @click="changeStatus(item, 'deleted')"
              />
              <v-btn
                v-if="
                  item.status == 'created' ||
                  item.status == 'inprogress' ||
                  item.status == 'deleted'
                "
                density="comfortable"
                color="green-darken-2"
                icon="mdi-check-all"
                @click="changeStatus(item, 'finished')"
              />
              <v-btn
                v-if="
                  item.status == 'created' ||
                  item.status == 'finished' ||
                  item.status == 'deleted'
                "
                density="comfortable"
                color="orange-darken-4"
                icon="mdi-progress-clock"
                @click="changeStatus(item, 'inprogress')"
              />
            </v-card-actions>
          </v-card>
        </div>
      </v-timeline-item>
    </v-timeline>
    <v-dialog
      transition="dialog-bottom-transition"
      persistent
      width="auto"
      class="align-center"
      :min-width="mdAndDown ? 'auto' : '600px'"
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
        <v-card-title
          primary-title
          :class="mdAndDown ? 'text-subtitle-2' : 'text-h6'"
          class="py-8 text-center"
        >
          Are you sure you want to delete this task for ever?
        </v-card-title>
        <v-card-actions class="justify-center mb-2">
          <v-btn
            class="px-10 mx-2"
            variant="text"
            color="red-darken-3"
            @click="deleteItem()"
            >Yes</v-btn
          >
          <v-btn
            class="px-10 mx-2"
            variant="text"
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
import { useTodoStore } from "../stores/todoStore";
import { useDisplay } from "vuetify";
import createdBg from "../assets/todoBg.svg";
import inprogressBg from "../assets/todoBg.svg";
import finishedBg from "../assets/finishedBg.svg";
import deletedBg from "../assets/deletedBg.svg";
export default {
  setup() {
    const datastore = useTodoStore();
    const { xs, mdAndUp, mdAndDown, lgAndUp } = useDisplay();
    const allTasksList = ref({});
    onMounted(async () => {
      await datastore.getAllTasks();
      const res = datastore.allListGetter;
      allTasksList.value = res;
    });
    onUpdated(() => {
      datastore.getAllTasks();
    });
    return { allTasksList, datastore, xs, mdAndUp, mdAndDown, lgAndUp };
  },
  name: "todoComponent",
  data: () => ({
    vdialog: false,
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
    vdialogToggle(item) {
      this.selectedItem = item;
      this.vdialog = true;
    },
    changeStatus(item, newStat) {
      this.datastore.modifyStatus(item, newStat);
    },
    withoutQuotes(str) {
      return str.replaceAll('"', "");
    },
    getColor(status) {
      if (status == "created") {
        return "blue-darken-2";
      } else if (status == "inprogress") {
        return "orange-darken-2";
      } else if (status == "finished") {
        return "green-darken-2";
      } else if (status == "deleted") {
        return "grey-darken-2";
      }
    },
    getTextColor(status) {
      if (status == "created") {
        return "text-blue-darken-4";
      } else if (status == "inprogress") {
        return "text-orange-darken-4";
      } else if (status == "finished") {
        return "text-green-darken-4";
      } else if (status == "deleted") {
        return "text-grey-darken-4";
      }
    },
    getStyleClass(status) {
      if (status == "created") {
        return "bgCardCreated";
      } else if (status == "inprogress") {
        return "bgCardInprogress";
      } else if (status == "finished") {
        return "bgCardFinished";
      } else if (status == "deleted") {
        return "bgCardDeleted";
      }
    },
    getbgSVG(status) {
      if (status == "created") {
        return createdBg;
      } else if (status == "inprogress") {
        return inprogressBg;
      } else if (status == "finished") {
        return finishedBg;
      } else if (status == "deleted") {
        return deletedBg;
      }
    },
  },
};
</script>
<style scoped>
.bgCardCreated {
  background-color: #ffffff;
}
.bgCardInprogress {
  background-color: #ffffff;
}
.bgCardFinished {
  background-color: #ffffff;
}
.bgCardDeleted {
  background-color: #ffffff;
}
</style>
