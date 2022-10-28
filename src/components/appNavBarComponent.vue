<template>
  <div>
    <v-app-bar color="primary" density="comfortable" fixed>
      <template v-slot:image>
        <v-img
          gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
        ></v-img>
      </template>
      <v-app-bar-title
        ><v-icon class="me-2">mdi-access-point</v-icon>Todo
        List</v-app-bar-title
      >
      <!-- <template v-slot:append> </template> -->
    </v-app-bar>
  </div>
</template>
<script>
export default {
  data: () => ({}),
};
</script>
