export class reminder {
  static nextId = 1;

  constructor(title, description, dueDate, priority, list) {
    this.title = title;
    this.description = description;
    this.expiration = dueDate;
    this.priority = priority;
    this.list = list;
    this.id = reminder.nextId++;
  }
}
