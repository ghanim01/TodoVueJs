import { defineStore } from "pinia";
import { db } from "../api/db";
// import { liveQuery } from "dexie";
// import { useObservable } from "@vueuse/rxjs";

export const useTodoStore = defineStore("todoStore", {
  state: () => ({
    createdList: [],
    inprogessList: [],
    finishedList: [],
    deletedList: [],
    allTasksList: [],
  }),
  getters: {
    allListGetter: function (state) {
      return state.allTasksList;
    },
    createdListGetter: function (state) {
      return state.createdList;
    },
    inprogressListGetter: function (state) {
      return state.inprogessList;
    },
    finishedListGetter: function (state) {
      return state.finishedList;
    },
    deletedListGetter: function (state) {
      return state.deletedList;
    },
  },
  actions: {
    async deleteTask(task) {
      await db.todoTasks.where("id").equals(task.id).delete();
    },
    async getAllTasks() {
      this.createdList = [];
      await db.todoTasks.toArray().then((result) => {
        this.allTasksList = result;
      });
    },
    async getCreatedTasks() {
      this.createdList = [];
      await db.todoTasks
        .where("status")
        .equals("created")
        .toArray()
        .then((result) => {
          this.createdList = result;
        });
    },
    async getInprogressTasks() {
      this.inprogessList = [];
      await db.todoTasks
        .where("status")
        .equals("inprogress")
        .toArray()
        .then((result) => {
          this.inprogessList = result;
        });
    },
    async getFinishedTasks() {
      this.finishedList = [];
      await db.todoTasks
        .where("status")
        .equals("finished")
        .toArray()
        .then((result) => {
          this.finishedList = result;
        });
    },
    async getDeletedTasks() {
      this.deletedList = [];
      await db.todoTasks
        .where("status")
        .equals("deleted")
        .toArray()
        .then((result) => {
          this.deletedList = result;
        });
    },
    async modifyStatus(task, newStatus) {
      await db.todoTasks
        .where("id")
        .equals(task.id)
        .modify({ status: newStatus });
    },
    async saveTask(task) {
      await db.todoTasks.add({
        title: task.title,
        description: task.description,
        time: task.time,
        status: task.status,
      });
    },
  },
});
