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
    } else {
      alert("You can't create a new list with an existing name");
    }
    return this.getSpecificList(name);
  }

  getSpecificList(name) {
    return this.list.find((item) => item.name === name);
  }

  getAllList() {
    return this.list;
  }

  getAllListId() {
    console.log(this.list.id);
    return this.list.id;
  }
}
