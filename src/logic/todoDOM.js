import { manager } from "../app.js";

export class dom {
  constructor() {
    this.contentContainer = document.querySelector("#content");
    this.sidebarContainer = document.querySelector("#sidebar");
    this.sidebarButtonContainer = document.querySelector("#sidebar_btn");
    this.contentButtonContainer = document.querySelector("#content_btn");
    this.inputContainer = document.querySelector("#info");
  }

  renderLists(lists, currentListId = null) {
    this.sidebarContainer.innerHTML = "";
    lists.forEach((item) => {
      const p = document.createElement("p");
      p.textContent = item.name;
      p.classList.add("list");
      p.dataset.listId = item.id;

      if ((currentListId = item.id)) {
        p.classList.add("selected");
      }

      sidebar.appendChild(p);
    });
  }

  renderListContent(list) {
    this.contentContainer.innerHTML = "";
    this.contentContainer.classList.value = list.name;

    const reminders = list.getReminders();
    reminders.forEach((reminder) => {
      const reminderDiv = document.createElement("div");
      reminderDiv.classList.add("reminder");
      reminderDiv.id = reminder.id;
      this.createReminderElement("h3", reminder, "title", reminderDiv);
      this.createReminderElement("p", reminder, "description", reminderDiv);
      this.createReminderElement("p", reminder, "priority", reminderDiv);
      this.createReminderElement("p", reminder, "expiration", reminderDiv);
      this.createTextElement("button", "remove", reminderDiv);
      content.appendChild(reminderDiv);
    });
  }

  removeHiddenClass(item) {
    item.classList.remove("hidden");
  }

  addHiddenClass(item) {
    item.classList.add("hidden");
  }

  createReminderElement(type, key, propriety, update) {
    const item = document.createElement(type);
    item.textContent = key[propriety];
    update.appendChild(item);
  }

  createIconElement(type, src, update) {
    const icon = document.createElement(type);
    icon.src = src;
    update.appendChild(icon);
  }

  createTextElement(type, content, update) {
    const item = document.createElement(type);
    item.textContent = content;
    update.appendChild(item);
  }
}
