<template>
  <div>
    <v-btn
      v-model.lazy="fab"
      ripple
      size="large"
      class="fabStyle rotate-center"
      icon="mdi-plus-thick"
      color="blue-darken-4"
      @click.stop="open()"
    ></v-btn>
    <v-dialog
      transition="dialog-bottom-transition"
      persistent
      width="auto"
      :min-width="mdAndDown ? 'auto' : '600px'"
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
import { useTodoStore } from "../../stores/todoStore";
import { useViewStore } from "../../stores/viewStore";

export default {
  setup() {
    const todoStore = useTodoStore();
    const viewStore = useViewStore();
    const { xs, mdAndUp, mdAndDown, lgAndUp } = useDisplay();
    return { viewStore, todoStore, xs, mdAndUp, mdAndDown, lgAndUp };
  },
  data: () => ({
    date: null,
    vdialog: false,
    valid: true,
    fab: false,
    view: "",
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
      if (this.mdAndDown) {
        this.drawer = !this.drawer;
      }
    },
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
        this.todoStore.saveTask(task);
        this.close();
      } catch (error) {
        this.status = `Failed to add
          ${this.taskname}: ${error}`;
      }
    },
  },
  watch: {
    getV() {
      this.view = this.viewStore.defaultViewGetter;
    },
    getF() {
      this.view = this.viewStore.fabGetter;
    },
  },
  created() {
    this.fab = this.viewStore.fabGetter;
    this.view = this.viewStore.defaultViewGetter;
  },
  computed: {
    getView() {
      this.view = this.viewStore.defaultViewGetter;
    },
    getFAB() {
      getView = this.viewStore.defaultViewGetter;
      if (getView == "timeline") {
        this.viewStore.changeFab(true);
      } else {
        this.viewStore.changeFab(false);
      }
    },
  },
};
</script>
<style>
@-webkit-keyframes rotate-center {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotate-center {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.bgSVG {
  background-color: rgba(240, 250, 252, 0.418);
  background-image: url("../src/assets/HomeBg.svg");
  background-repeat: repeat;
}
.fabStyle {
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 25px;
}

.fabStyle:hover {
  -webkit-animation: rotate-center 0.6s ease-in-out both;
  animation: rotate-center 0.6s ease-in-out both;
}
</style>
