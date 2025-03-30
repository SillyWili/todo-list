import { domHandler, manager } from "../app.js";
// import { TodoList } from "../logic/todo.js";

export class EventHandler {
  constructor() {
    this.dom = domHandler;
    this.manager = manager;
    this.defaultList = this.manager.getSpecificList("Default");

    //* Store references to DOM elements
    this.sidebarContainer = document.querySelector("#sidebar");
    this.sidebarButtonContainer = document.querySelector(
      "#sidebarButtonContainer"
    );
    this.contentContainer = document.querySelector("#content");
    this.contentButtonContainer = document.querySelector(
      "#contentButtonContainer"
    );

    //* Renders the default list at load
    this.dom.renderListContent(this.defaultList);

    //* Initial setup of all event listeners
    this.setupAllEventListeners();
  }

  setupAllEventListeners() {
    this.setupListClickHandlers();
    this.setupAddListHandler();
    this.setupAddReminderHandler();
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
    const dialog = document.querySelector("dialog#list");

    const submitButton = dialog.querySelector("button#submit");
    const closeButton = dialog.querySelector("button#close");
    
    const input = dialog.querySelector("input");

    const submitHandler = () => {
      this.manager.createNewList(input.value);
      //* Clears the input text
      input.value = "";

      this.dom.renderLists(this.manager.getAllList());

      dialog.close();
    };

    const closeHandler = () => {
      //* Clears the input text
      input.value = "";

      dialog.close();
    };

    addButton.addEventListener("click", () => {
      dialog.showModal();

      submitButton.addEventListener("click", submitHandler);
      closeButton.addEventListener("click", closeHandler);
    });
  }

  setupAddReminderHandler() {
    const addButton = this.contentButtonContainer.querySelector("img");
    const dialog = document.querySelector("dialog#reminders");

    addButton.addEventListener("click", () => {
      dialog.showModal();

      const submitButton = dialog.querySelector("button#submit");
      const submitHandler = () => {
        //* Gets specific list id
        const selectedListId = parseInt(this.contentContainer.dataset.listId);

        const list = this.manager.getSpecificListId(selectedListId);
        const input = dialog.querySelector("input");

        list.addReminder(input.value, "", "", "");
        this.dom.renderListContent(list);

        this.setupReminderDeleteHandlers();

        submitButton.removeEventListener("click", submitHandler);
        dialog.close();
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
