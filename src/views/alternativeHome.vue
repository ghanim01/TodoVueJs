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
        v-for="item in gtasks"
        :key="item.id"
        :dot-color="getColor(item.status)"
        size="large"
      >
        <template v-slot:opposite class="align-center">
          <div
            class="pt-1 headline font-weight-medium dateTimeSty"
            :class="getTextColor(item.status)"
            v-text="convertdate(item.time) + ' - ' + convertime(item.time)"
          ></div>
        </template>
        <div>
          <Transition name="fade" mode="out-in">
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
                  density="comfortable"
                  color="grey-darken-2"
                  class="me-2"
                  icon="mdi-delete-forever"
                  v-on:click="showDialog(item)"
                >
                </v-btn>
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
          </Transition>
        </div>
      </v-timeline-item>
    </v-timeline>
    <v-timeline v-else side="end" align="center" truncate-line="both">
      <v-timeline-item
        size="small"
        v-for="item in gtasks"
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
                density="comfortable"
                color="grey-darken-2"
                class="me-2"
                icon="mdi-delete-forever"
                v-on:click="showDialog(item)"
              >
              </v-btn>
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
      v-model="xdialog"
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
            @click.once="deleteItem()"
            >Yes</v-btn
          >
          <v-btn
            class="px-10 mx-2"
            variant="text"
            color="grey-darken-3"
            @click="this.xdialog = false"
            >No</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div v-show="isLoading" class="progDiv">
      <v-progress-linear
        class="prog2"
        :height="7"
        indeterminate
        color="green"
      ></v-progress-linear>

      <!-- <v-progress-circular
      class="prog"
      :size="90"
      :width="9"
      color="purple"
      indeterminate
    ></v-progress-circular> -->
    </div>
    <div ref="addTaskCard" v-show="newTaskCard">
      <v-card
        variant="elevated"
        density="comfortable"
        rounded
        class="elevation-2 mx-auto py-2 text-center align-center justify-start addTaskCardClass mt-12"
        color="#fafafa"
      >
        <v-card-text class="text-blue-darken-3 text-h6 font-weight-medium">
          Start adding your first task
        </v-card-text>
        <v-form
          ref="form"
          align="center"
          v-model="valid"
          lazy-validation
          @submit="addNewTask()"
        >
          <v-text-field
            v-model="taskname"
            :rules="tasknameRules"
            label="Task Name"
            placeholder="Enter Task Name"
            required
            density="compact"
            variant="outlined"
            class="px-8 pt-8 pb-3"
          ></v-text-field>

          <v-textarea
            v-model="taskdetails"
            :rules="taskdetailsrules"
            label="Task Details"
            placeholder="Enter Task Description"
            density="compact"
            required
            variant="outlined"
            class="px-8"
          ></v-textarea>
          <v-card-actions class="justify-center align-center">
            <v-btn
              variant="flat"
              :disabled="!valid"
              color="success"
              prepend-icon="mdi-plus-circle-outline"
              class="px-5 align-center"
              type="submit"
              >Save</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </div>
  </div>
</template>
<script>
import { handleError, onMounted } from "vue";
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
    return { datastore, xs, mdAndUp, mdAndDown, lgAndUp };
  },
  name: "todoComponent",
  data: () => ({
    date: null,
    valid: true,
    xdialog: false,
    isLoading: false,
    selectedItem: null,
    newTaskCard: false,
    gtasks: [],
    taskname: "",
    taskdetails: "",
    tasknameRules: [
      (v) => !!v || "Task Name is required",
      (v) => (v && v.length >= 4) || "Task name must more than 4 characters",
    ],
    taskdetailsrules: [
      (v) => !!v || "Task Description is required",
      (v) =>
        (v && v.length >= 5) || "Description must be more than 5 characters",
    ],
  }),
  methods: {
    addNewTask() {
      try {
        let title = this.taskname;
        let desc = this.taskdetails;
        let date = new Date();
        let task = {
          title: title.toString(),
          description: desc.toString(),
          time: date,
          status: "created",
        };
        this.datastore.saveTask(task);
        this.datastore.getAllTasks();
        this.close();
      } catch (error) {
        this.status = `Failed to add
          ${this.taskname}: ${error}`;
      }
    },
    validate() {
      this.$refs.form.validate();
    },
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
    deleteItem() {
      this.xdialog = false;
      this.datastore.deleteTask(this.selectedItem);
    },
    showDialog(item) {
      this.selectedItem = item;
      this.xdialog = true;
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
  async created() {
    this.isLoading = true;
    await this.datastore.getAllTasks();
    setTimeout(() => {
      this.gtasks = [...this.datastore.allTasksList];
      this.isLoading = false;
    }, 200);
  },
  mounted() {
    if (this.gtasks.length == 0 || null || undefined) {
      this.newTaskCard = true;
    } else {
      this.newTaskCard = false;
    }
  },
  computed: {
    getTasksStat() {
      return this.datastore.allTasksList;
    },
  },
  watch: {
    getTasksStat: {
      handler(newVal, oldVal) {
        if (newVal == undefined || null) {
          this.isLoading = true;
          setTimeout(() => {
            this.datastore.getAllTasks();
            this.isLoading = false;
          }, 200);
        } else {
          this.isLoading = true;
          setTimeout(() => {
            this.gtasks = [...newVal];
            this.isLoading = false;
          }, 200);
        }
      },
      immediate: true,
      deep: false,
    },
    gtasks: {
      handler(newval, oldval) {
        if (newval == undefined || null) {
          this.newTaskCard = true;
        } else if (newval.length == 0) {
          this.newTaskCard = true;
        } else {
          this.newTaskCard = false;
        }
      },
      deep: false,
      immediate: true,
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
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
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
  top: 58px;
  z-index: 999;
}
.prog {
  position: fixed;
  bottom: 50%;
  left: 50%;
  align-self: center;
}
.dateTimeSty {
  width: fit-content;
  background-color: #ffffff;
  padding: 10px 15px 10px 15px !important;
  border: 1px solid !important;
  border-radius: 10px;
}
</style>
