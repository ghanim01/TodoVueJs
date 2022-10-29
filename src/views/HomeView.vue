<template>
  <div class="d-flex flex-row bgHome">
    <router-view />
  </div>
</template>

<script>
export default {
  setup() {},
  name: "HomeView",
  components: {},
  data: () => ({}),
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
</style>
