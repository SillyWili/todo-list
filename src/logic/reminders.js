export class reminder {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.expiration = dueDate;
    this.priority = priority;
  }
}

function createNewReminder(title, description, dueDate, priority) {
  return new reminder(title, description, dueDate, priority);
}
