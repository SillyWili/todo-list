export class reminder {
  static nextId = 1;

  //* Load the last saved id from localStorage, so it starts counting without duplicating
  static loadNextId() {
    const savedId = localStorage.getItem("nextReminderId");
    if (savedId) {
      reminder.nextId = parseInt(savedId);
    }
  }

  //* Saves the last current id into localStorage
  static saveNextId() {
    localStorage.setItem("nextReminderId", reminder.nextId);
  }

  constructor(title, description, dueDate, priority, list) {
    this.title = title;
    this.description = description;
    this.expiration = dueDate;
    this.priority = priority;
    this.list = list;

    //* Assign an ID from nextId
    this.id = reminder.nextId++;

    reminder.saveNextId();
  }
}
