import { reminder } from "./reminders.js";

export class TodoList {
  constructor(name) {
    this.name = name;
    this.reminders = [];
  }

  addReminder(title, description, dueDate, priority) {
    const item = new reminder(title, description, dueDate, priority);
    this.reminders.push(item);
    return this;
  }

  removeReminder(title) {
    this.reminders = this.reminders.filter(
      (reminder) => reminder["title"] !== title
    );
    return this.reminders;
  }

  getReminders() {
    return this.reminders;
  }
}

function createNewTodo(name) {
  return new TodoList(name);
}
