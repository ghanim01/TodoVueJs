<template>
  <div>
    <v-app-bar class="text-center" color="primary" density="comfortable" fixed>
      <template v-slot:image>
        <v-img
          gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
        ></v-img>
      </template>
      <template v-slot:prepend v-if="mdAndDown">
        <v-app-bar-nav-icon
          v-if="view == ('cardsview' || null || undefined) && mdAndDown"
          variant="text"
          @click.stop="this.viewStore.changeDrawer(!drawer)"
        ></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title
        ><v-icon class="me-2">mdi-access-point</v-icon>Todo
        List</v-app-bar-title
      >
      <template v-slot:append>
        <v-menu transition="scale-transition">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" icon="mdi-dots-vertical"> </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-btn variant="text" flat @click.prevent="changeView('timeline')"
                >Timeline View</v-btn
              >
            </v-list-item>
            <v-list-item>
              <v-btn
                variant="text"
                flat
                @click.prevent="changeView('cardsview')"
                >Cards View</v-btn
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" theme="dark">
      <v-list color="transparent" v-model="tab">
        <v-list-item
          ><v-btn
            flat
            color="teal"
            class="mt-2 align-center"
            ripple
            prepend-icon="mdi-numeric-positive-1"
            @click="open()"
            >Add New Task</v-btn
          >
        </v-list-item>
        <v-divider class="my-5"></v-divider>
      </v-list>
      <v-list nav variant="flat">
        <v-list-item
          ripple
          active-color="blue-lighten-3"
          prepend-icon="mdi-format-list-checks"
          to="/todolist"
          >Todo Tasks</v-list-item
        >
        <v-list-item
          to="/progresslist"
          ripple
          active-color="orange-lighten-3"
          prepend-icon="mdi-progress-clock"
          >In progress Taks</v-list-item
        >
        <v-list-item
          to="/finishedlist"
          ripple
          active-color="green-lighten-3"
          prepend-icon="mdi-check-all"
          >Finished Tasks</v-list-item
        >
        <v-list-item
          ripple
          active-color="grey-lighten-3"
          prepend-icon="mdi-trash-can"
          to="/deletedlist"
          >Deleted Tasks</v-list-item
        >
      </v-list>
    </v-navigation-drawer>
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
import { computed } from "vue";
import { useDisplay } from "vuetify";
import { useTodoStore } from "../stores/todoStore";
import { useViewStore } from "../stores/viewStore";
export default {
  setup() {
    const { xs, mdAndUp, mdAndDown, lgAndUp } = useDisplay();
    const viewStore = useViewStore();
    const todoStore = useTodoStore();
    let drawer = computed(() => {
      return viewStore.drawerGetter;
    });
    let view = computed(() => {
      return viewStore.defaultViewGetter;
    });

    return {
      view,
      drawer,
      viewStore,
      todoStore,
      xs,
      mdAndUp,
      mdAndDown,
      lgAndUp,
    };
  },
  data: () => ({
    date: null,
    tab: "tab-2",
    vdialog: false,
    valid: true,
    drawerfun: false,
    newtaskStatus: "",
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
        this.todoStore.getAllTasks();
        this.close();
      } catch (error) {
        this.status = `Failed to add
          ${this.taskname}: ${error}`;
      }
    },
    changeView(xview) {
      if (this.lgAndUp) {
        if (xview == "timeline") {
          this.viewStore.changeDrawer(false);
          this.viewStore.changeDefaultView(xview);
          this.viewStore.changeFab(true);
          this.$router.push("/alternative");
        } else if (xview == "cardsview") {
          this.viewStore.changeDrawer(true);
          this.viewStore.changeDefaultView(xview);
          this.viewStore.changeFab(false);
          this.$router.push("/");
        }
      } else {
        if (xview == "timeline") {
          this.viewStore.changeDrawer(false);
          this.viewStore.changeDefaultView(xview);
          this.viewStore.changeFab(true);
          this.$router.push("/alternative");
        } else if (xview == "cardsview") {
          this.viewStore.changeDrawer(false);
          this.viewStore.changeDefaultView(xview);
          this.viewStore.changeFab(false);
          this.$router.push("/");
        }
      }
    },
  },
  created() {
    if (this.view == (null || undefined) && this.lgAndUp) {
      this.viewStore.changeDrawer(false);
      this.viewStore.changeDefaultView("timeline");
      this.viewStore.changeFab(true);
      this.$router.push("/alternative");
    } else if (this.view == "timeline" && this.lgAndUp) {
      this.viewStore.changeDrawer(false);
      this.viewStore.changeFab(true);
      this.$router.push("/alternative");
    } else if (this.view == "cardsview" && this.lgAndUp) {
      this.viewStore.changeDrawer(true);
      this.viewStore.changeFab(false);
      this.$router.push("/");
    } else {
      this.viewStore.changeDefaultView("timeline");
      this.viewStore.changeDrawer(false);
      this.viewStore.changeFab(true);
      this.$router.push("/alternative");
    }
  },
};
</script>
