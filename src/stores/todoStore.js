import { defineStore } from "pinia";
import { db } from "../api/db";
// import { liveQuery } from "dexie";
// import { useObservable } from "@vueuse/rxjs";

export const useTodoStore = defineStore("todoStore", {
  state: () => {
    return {
      createdList: [],
      inprogessList: [],
      finishedList: [],
      deletedList: [],
      allTasksList: [],
    };
  },

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
    updateLists() {
      this.getAllTasks();
      this.getCreatedTasks();
      this.getInprogressTasks();
      this.getFinishedTasks();
      this.getDeletedTasks();
    },
    async deleteTask(task) {
      try {
        await db.todoTasks.where("id").equals(task.id).delete();
        this.updateLists();
      } catch (error) {
        console.log(error);
      }
    },
    async getAllTasks() {
      try {
        this.allTasksList = [];
        await db.todoTasks.toArray().then((result) => {
          if (result != undefined || null) {
            this.allTasksList = result;
          } else {
            this.allTasksList = [];
          }
        });
      } catch (e) {
        console.log(e);
      }
    },

    async getCreatedTasks() {
      try {
        this.createdList = [];
        await db.todoTasks
          .where("status")
          .equals("created")
          .toArray()
          .then((result) => {
            if (result != undefined || null) {
              this.createdList = result;
            } else {
              this.createdList = [];
            }
          });
      } catch (e) {
        console.log(e);
      }
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
      try {
        await db.todoTasks
          .where("id")
          .equals(task.id)
          .modify({ status: newStatus });
        this.updateLists();
      } catch (error) {
        console.log(error);
      }
    },
    async saveTask(task) {
      try {
        await db.todoTasks.add({
          title: task.title,
          description: task.description,
          time: task.time,
          status: task.status,
        });
        this.updateLists();
      } catch (error) {
        console.log(error);
      }
    },
  },
});
