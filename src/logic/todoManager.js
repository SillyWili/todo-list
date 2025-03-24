import { TodoList } from "./todo.js";

export class TodosManager {
  constructor() {
    this.list = [];
    this.createNewList("Default");
  }

  createNewList(name) {
    if (!this.list.find((item) => item.name === name) && name !== "") {
      const newList = new TodoList(name);
      this.list.push(newList);
    } else {
      alert(
        "You can't create a new list with an existing name or without name"
      );
    }
    return this.getSpecificList(name);
  }

  getSpecificList(name) {
    return this.list.find((item) => item.name === name);
  }

  getSpecificListId(id) {
    return this.list.find((item) => item.id === id);
  }

  getAllList() {
    return this.list;
  }
}
