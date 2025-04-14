import { reminder } from "./reminders.js";

export class TodoList {
  static nextId = 1;

  static fromJson(title, reminders, id) {
    const todo = new TodoList();

    //* Assigns the right parameters to every todo
    todo.name = title;
    todo.reminders = reminders;
    todo.id = id;

    //* Loads the reminders id so they don't duplicate
    reminder.loadNextId();
    return todo;
  }

  constructor(name) {
    this.name = name;
    this.reminders = [];
    this.id = TodoList.nextId++;
  }

  addReminder(title, description, dueDate, priority) {
    const item = new reminder(title, description, dueDate, priority, this.name);
    this.reminders.push(item);
    return this;
  }

  removeReminder(id) {
    this.reminders = this.reminders.filter(
      (reminder) => reminder.id !== parseInt(id)
    );
    return this.reminders;
  }

  getReminders() {
    return this.reminders;
  }
}
