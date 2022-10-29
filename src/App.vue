<template>
  <v-app>
    <apppNavBar />
    <v-main>
      <router-view />
    </v-main>
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
  </v-app>
</template>

<script>
import apppNavBar from "./components/appNavBarComponent.vue";
import { useDisplay } from "vuetify";

export default {
  name: "App",
  setup() {
    const { xs, mdAndUp, mdAndDown, lgAndUp } = useDisplay();
    return { xs, mdAndUp, mdAndDown, lgAndUp };
  },

  components: {
    apppNavBar,
  },
  data: () => ({}),
};
</script>
