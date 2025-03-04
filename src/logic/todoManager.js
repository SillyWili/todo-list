import { TodoList } from "./todo.js";

export class TodosManager {
  constructor() {
    this.list = {};
    this.createNewList("Default");
  }

  createNewList(name) {
    if (!this.list[name]) {
      this.list[name] = new TodoList(name);
    }
    return this.list[name];
  }

  getSpecificList(name) {
    return this.list[name];
  }

  getAllList() {
    return this.list;
  }
}
