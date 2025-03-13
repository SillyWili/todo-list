import { manager } from "../app.js";

const content = document.querySelector("#content");
const sidebar = document.querySelector("#sidebar");

export class dom {
  constructor(container) {
    this.container = container;
  }

  renderLists() {
    sidebar.innerHTML = "";
    manager.getAllList().filter((item) => {
      const p = document.createElement("p");
      p.textContent = item.name;
      p.classList.add("list");
      sidebar.appendChild(p);
    });
  }

  renderListContent(name) {
    content.innerHTML = "";
    manager.getSpecificList(name).reminders.filter((key) => {
      const wrapper = document.createElement("div");
      this.createReminderElement("h3", key, "title", wrapper);
      this.createReminderElement("p", key, "description", wrapper);
      this.createReminderElement("p", key, "priority", wrapper);
      this.createReminderElement("p", key, "expiration", wrapper);
      content.appendChild(wrapper);
    });
  }

  createReminderElement(type, key, propriety, update) {
    const item = document.createElement(type);
    item.textContent = key[propriety];
    update.appendChild(item);
  }

  createIconElement(type, src, alt, update) {
    const icon = document.createElement(type);
    icon.src = src;
    icon.setAttribute("alt", alt);
    update.appendChild(icon);
  }

  createTextElement(type, content, update) {
    const item = document.createElement(type);
    item.textContent = content;
    update.appendChild(item);
  }
}
