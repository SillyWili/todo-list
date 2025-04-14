import listIcon from "../assets/icons/list-box-outline.svg";
import deleteIcon from "../assets/icons/delete.svg";
import { format } from "date-fns";

export class dom {
  constructor() {
    this.contentContainer = document.querySelector("#content");
    this.sidebarContainer = document.querySelector("#sidebar");
    this.sidebarButtonContainer = document.querySelector(
      "#sidebarButtonContainer"
    );
    this.contentButtonContainer = document.querySelector(
      "#contentButtonContainer"
    );
    this.inputContainer = document.querySelector("#info");
  }

  renderLists(lists) {
    this.sidebarContainer.innerHTML = "";
    lists.forEach((item) => {
      const div = document.createElement("div");
      this.createIconElement(listIcon, div);
      const listName = document.createElement("h3");
      listName.textContent = item.name;
      listName.classList.add("list");
      listName.id = item.id;

      div.appendChild(listName);
      sidebar.appendChild(div);
    });
  }

  renderListContent(list) {
    this.contentContainer.innerHTML = "";
    this.contentContainer.classList.value = list.name;
    this.contentContainer.dataset.listId = list.id;

    const reminders = list.getReminders();
    reminders.forEach((reminder) => {
      const reminderDiv = document.createElement("div");
      this.addReminderPriority(reminder, reminderDiv);
      reminderDiv.classList.add("reminder");
      reminderDiv.id = reminder.id;
      this.createReminderElement("h3", reminder, "title", reminderDiv);
      this.createReminderElement("p", reminder, "description", reminderDiv);
      this.createExpirationDate("p", reminder, "expiration", reminderDiv);
      this.createReminderElement("h4", reminder, "priority", reminderDiv);
      this.createIconElement(deleteIcon, reminderDiv, "delete-btn");
      content.appendChild(reminderDiv);
    });
  }

  removeHiddenClass(item) {
    item.classList.remove("hidden");
  }

  addHiddenClass(item) {
    item.classList.add("hidden");
  }

  //* Adds the priority attribute to the reminder container
  addReminderPriority(reminder, reminderDiv) {
    if (reminder["priority"] === "HIGH") {
      reminderDiv.setAttribute("priority", "HIGH");
    } else if (reminder["priority"] === "MEDIUM") {
      reminderDiv.setAttribute("priority", "MEDIUM");
    } else if (reminder["priority"] === "LOW") {
      reminderDiv.setAttribute("priority", "LOW");
    } else {
      return;
    }
  }

  createReminderElement(type, object, propriety, container, attribute) {
    const item = document.createElement(type);
    item.textContent = object[propriety];
    if (attribute === "" || attribute === undefined) {
      container.appendChild(item);
    } else {
      item.classList.add(attribute);
      container.appendChild(item);
    }
  }

  createExpirationDate(type, object, propriety, container) {
    const item = document.createElement(type);
    if (object[propriety] === "") {
      item.textContent = "No due Date";
      container.appendChild(item);
    } else {
      const result = format(object[propriety], "PPPp");
      item.textContent = result;
      container.appendChild(item);
    }
  }

  createIconElement(src, update, className) {
    const icon = document.createElement("img");
    icon.src = src;
    if (!className) {
      update.appendChild(icon);
    } else {
      icon.classList.add(className);
      update.appendChild(icon);
    }
  }

  createTextElement(type, content, update) {
    const item = document.createElement(type);
    item.textContent = content;
    update.appendChild(item);
  }
}
