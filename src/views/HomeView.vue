<template>
  <div class="d-flex flex-row bgHome">
    <!-- <v-app-bar color="white" class="px-0" density="compact" floating>
        <template v-slot:image>
          <v-img
            gradient="to top right, rgba(238,238,238,.8), rgba(238,238,238,.8)"
          ></v-img>
        </template> -->
    <v-tabs
      v-model="tab"
      class="pa-2"
      direction="vertical"
      density="comfortable"
      bg-color="#e8eaf6"
    >
      <v-tab
        value="one"
        ripple
        color="blue-darken-3"
        prepend-icon="mdi-format-list-checks"
        >Todo Tasks</v-tab
      >
      <v-tab
        value="two"
        ripple
        color="orange-darken-3"
        prepend-icon="mdi-progress-clock"
        >In Progress Tasks</v-tab
      >
      <v-tab
        value="three"
        ripple
        color="green-darken-3"
        prepend-icon="mdi-check-all"
        >Finished Tasks</v-tab
      >
      <v-tab
        value="four"
        ripple
        color="grey-darken-1"
        prepend-icon="mdi-trash-can"
      >
        Deleted Tasks</v-tab
      >
      <v-divider class="my-5"> </v-divider>
      <v-btn
        flat
        color="teal"
        ripple
        class="mr-5"
        prepend-icon="mdi-numeric-positive-1"
        @click.stop="open()"
        >Add New Task</v-btn
      >
    </v-tabs>

    <!-- </v-app-bar> -->
    <v-window v-model="tab" class="text-start" direction="vertical">
      <v-window-item value="one" transition="fade-transition">
        <toDoComponent />
      </v-window-item>

      <v-window-item value="two" transition="fade-transition">
        <progressComponent />
      </v-window-item>

      <v-window-item value="three" transition="fade-transition">
        <finishedComponent />
      </v-window-item>

      <v-window-item value="four" transition="fade-transition">
        <deletedComponent />
      </v-window-item>
    </v-window>
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
          color="blue-darken-2"
          density="comfortable"
          class="align-center"
        >
          <v-toolbar-title
            ><v-icon class="ms-4">mdi-numeric-positive-1</v-icon> Add New
            Task</v-toolbar-title
          >
        </v-toolbar>

        <v-form
          ref="form"
          align="center"
          v-model="valid"
          lazy-validation
          @submit.prevent="addNewTask()"
        >
          <v-text-field
            v-model="taskname"
            :rules="tasknameRules"
            label="Task Name"
            placeholder="Enter Task Name"
            required
            density="comfortable"
            variant="outlined"
            class="px-8 pt-8 pb-3"
          ></v-text-field>

          <v-textarea
            v-model="taskdetails"
            :rules="taskdetailsrules"
            label="Task Details"
            placeholder="Enter Task Description"
            required
            variant="outlined"
            class="px-8 pb-3"
          ></v-textarea>
          <v-card-actions class="justify-end">
            <v-btn text color="blue-darken-2" @click="reset">Reset</v-btn>
            <v-btn text @click="close()">Close</v-btn>
            <v-btn
              text
              :disabled="!valid"
              color="success"
              class="mr-4"
              type="submit"
              >Save</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import toDoComponent from "../components/todoComponents/toDoComponent.vue";
import progressComponent from "../components/todoComponents/progressComponent.vue";
import finishedComponent from "../components/todoComponents/finishedComponent.vue";
import deletedComponent from "../components/todoComponents/deletedComponent.vue";
import { useTodoStore } from "../stores/todoStore";

export default {
  setup() {
    const todoStore = useTodoStore();

    return { todoStore };
  },
  name: "HomeView",
  components: {
    toDoComponent,
    progressComponent,
    finishedComponent,
    deletedComponent,
  },
  data: () => ({
    tab: "tab-2",
    vdialog: false,
    valid: true,
    taskname: "",
    newtaskStatus: "",
    tasknameRules: [
      (v) => !!v || "Task Name is required",
      (v) => (v && v.length >= 4) || "Task name must more than 4 characters",
    ],
    taskdetails: "",
    taskdetailsrules: [
      (v) => !!v || "Task Description is required",
      (v) =>
        (v && v.length >= 5) || "Description must be more than 5 characters",
    ],
  }),
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    close() {
      this.$refs.form.reset();
      this.vdialog = false;
    },
    open() {
      this.vdialog = true;
    },
    addNewTask() {
      try {
        let title = this.taskname;
        let desc = this.taskdetails;
        let task = {
          title: title.toString(),
          description: desc.toString(),
          time: Date.now(),
          status: "created",
        };
        this.todoStore.saveTask(task);
        this.close();
      } catch (error) {
        this.status = `Failed to add
          ${this.taskname}: ${error}`;
      }
    },
  },
};
</script>

<style>
.todotitle {
  background-color: rgba(0, 119, 255, 0.13);
}
.progress {
  background-color: rgba(255, 166, 0, 0.13);
}
.progressed {
  background-color: rgb(153, 99, 0);
  color: white;
}
.finished {
  background-color: rgba(0, 255, 76, 0.13);
}
.deleted {
  background-color: rgba(0, 0, 0, 0.13);
}
.w100 {
  width: 100% !important;
}
@media screen and (min-width: 800px) {
  .bgHome {
    height: 100vh;
    position: fixed !important;
  }
}
</style>
