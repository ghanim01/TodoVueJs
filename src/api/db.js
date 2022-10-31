import Dexie from "dexie";

export const db = new Dexie("todoTasksList");
db.version(1).stores({
  todoTasks: "++id, title, description, time, status",
});
