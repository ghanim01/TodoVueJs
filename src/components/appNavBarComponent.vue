<template>
  <div>
    <v-app-bar color="primary" density="comfortable" fixed>
      <template v-slot:image>
        <v-img
          gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
        ></v-img>
      </template>
      <template v-slot:prepend v-if="mdAndDown">
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title
        ><v-icon class="me-2">mdi-access-point</v-icon>Todo
        List</v-app-bar-title
      >
      <!-- <template v-slot:append> </template> -->
    </v-app-bar>
    <v-navigation-drawer class="bg-deep-purple" v-model="drawer">
      <v-list color="transparent" v-model="tab">
        <v-list-item
          ><v-btn
            flat
            color="teal"
            class="mt-2 align-center"
            ripple
            prepend-icon="mdi-numeric-positive-1"
            @click.stop="open()"
            >Add New Task</v-btn
          >
        </v-list-item>
        <v-divider class="my-5"></v-divider>
      </v-list>
      <v-list nav>
        <v-list-item
          ripple
          color="blue-darken-3"
          prepend-icon="mdi-format-list-checks"
          title="Todo Tasks"
          @click.stop="$router.push('/todolist')"
        ></v-list-item>
        <v-list-item
          ripple
          color="orange-darken-3"
          prepend-icon="mdi-progress-clock"
          @click.stop="$router.push('/progresslist')"
          >In Progress Tasks</v-list-item
        >
        <v-list-item
          ripple
          color="green-darken-3"
          prepend-icon="mdi-check-all"
          @click.stop="$router.push('/finishedlist')"
          >Finished Tasks</v-list-item
        >
        <v-list-item
          ripple
          color="grey-darken-1"
          prepend-icon="mdi-trash-can"
          @click.stop="$router.push('/deletedlist')"
          >Deleted Tasks</v-list-item
        >
      </v-list>
    </v-navigation-drawer>
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
import { useDisplay } from "vuetify";
import { useTodoStore } from "../stores/todoStore";
export default {
  setup() {
    const todoStore = useTodoStore();
    const { xs, mdAndUp, mdAndDown, lgAndUp } = useDisplay();
    return { todoStore, xs, mdAndUp, mdAndDown, lgAndUp };
  },
  data: () => ({
    tab: "tab-2",
    vdialog: false,
    valid: true,
    drawer: true,
    taskname: "",
    drawerfun: null,
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
  watch: {
    drawerfun() {
      if (this.lgAndUp) {
        return (this.drawer = true);
      }
    },
  },
};
</script>
