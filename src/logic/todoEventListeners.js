import { domHandler, manager } from "../app.js";

export class EventHandler {
  constructor() {
    this.dom = domHandler;
    this.manager = manager;
    this.defaultList = this.manager.getSpecificList("Default");

    //* Store references to DOM elements
    this.sidebarContainer = document.querySelector("#sidebar");
    this.sidebarButtonContainer = document.querySelector("#sidebar_btn");
    this.contentContainer = document.querySelector("#content");
    this.contentButtonContainer = document.querySelector("#content_btn");

    //* Renders the default list at load
    this.dom.renderListContent(this.defaultList);

    //* Initial setup of all event listeners
    this.setupAllEventListeners();
  }

  setupAllEventListeners() {
    this.setupListClickHandlers();
    this.setupAddListHandler();
    this.setupReminderDeleteHandlers();
  }

  setupListClickHandlers() {
    this.sidebarContainer.addEventListener("click", (event) => {
      const listItem = event.target.closest(".list");
      if (!listItem) return; // Clicked elsewhere

      const listId = parseInt(listItem.id);

      const selectedList = this.manager.getSpecificListId(listId);

      if (selectedList) {
        this.dom.renderListContent(selectedList);
        this.setupReminderDeleteHandlers();
      }
    });
  }

  setupAddListHandler() {
    const addButton = this.sidebarButtonContainer.querySelector("img");
    const inputContainer = document.querySelector("#info");

    addButton.addEventListener("click", () => {
      this.dom.removeHiddenClass(inputContainer);

      const submitButton = inputContainer.querySelector("button");
      const submitHandler = () => {
        const input = inputContainer.querySelector("input");
        this.manager.createNewList(input.value);
        this.dom.renderLists(this.manager.getAllList());
        this.dom.addHiddenClass(inputContainer);

        // Remove this one-time handler after use
        submitButton.removeEventListener("click", submitHandler);
      };

      submitButton.addEventListener("click", submitHandler);
    });
  }

  setupReminderDeleteHandlers() {
    const reminders = document.querySelectorAll("div .reminder");
    const listId = parseInt(this.contentContainer.dataset.listId);

    reminders.forEach((reminder) => {
      const removeButton = reminder.querySelector("button");
      const id = reminder.id;

      removeButton.addEventListener("click", () => {
        const list = this.manager.getSpecificListId(listId);
        list.removeReminder(id);
        reminder.remove(); // Properly remove from DOM
      });
    });
  }
}
