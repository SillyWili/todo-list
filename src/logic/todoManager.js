import { TodoList } from "./todo.js";

export class TodosManager {
  constructor() {
    this.list = [];
    this.createNewList("Default");
  }

  createNewList(name) {
    if (!this.list.find((item) => item.name === name)) {
      const newList = new TodoList(name);
      this.list.push(newList);
    }
    return this.getSpecificList(name);
  }

  getSpecificList(name) {
    return this.list.find((item) => item.name === name);
  }

  getAllList() {
    return this.list;
  }
}
