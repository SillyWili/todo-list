import { manager } from "../app.js";

const content = document.querySelector("#content");
const sidebar = document.querySelector("#sidebar");

export class dom {
  constructor(container) {
    this.container = container;
  }

  renderLists() {
    sidebar.innerHTML = "";
    manager.getAllList().forEach((item) => {
      const p = document.createElement("p");
      p.textContent = item.name;
      p.classList.add("list");
      sidebar.appendChild(p);
    });
  }

  renderListContent(name) {
    content.innerHTML = "";
    content.classList = name;
    manager.getSpecificList(name).reminders.forEach((key) => {
      const wrapper = document.createElement("div");
      wrapper.classList.add("reminder");
      wrapper.id = key["id"];
      this.createReminderElement("h3", key, "title", wrapper);
      this.createReminderElement("p", key, "description", wrapper);
      this.createReminderElement("p", key, "priority", wrapper);
      this.createReminderElement("p", key, "expiration", wrapper);
      this.createTextElement("button", "remove", wrapper);
      content.appendChild(wrapper);
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
