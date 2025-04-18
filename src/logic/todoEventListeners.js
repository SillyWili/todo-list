import { domHandler, manager } from "../app.js";

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

  //* Switch between lists
  setupListClickHandlers() {
    this.sidebarContainer.addEventListener("click", (event) => {
      const listItem = event.target.closest(".list");
      if (!listItem) return; // Clicked elsewhere

      const listId = parseInt(listItem.id);

      //* Gets the specific list from the array
      const selectedList = this.manager.getSpecificListId(listId);

      if (selectedList) {
        this.dom.renderListContent(selectedList);

        //* Adds listeners for the remove buttons
      }
    });
  }

  //* Add New List
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

      //* Refreshes the lists in the DOM
      this.dom.renderLists(this.manager.getAllList());

      //* Saves the manager.list to localStorage
      localStorage.setItem("array", JSON.stringify(manager.list));

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

  //* Add New Reminder
  setupAddReminderHandler() {
    const addButton = this.contentButtonContainer.querySelector("img");
    const dialog = document.querySelector("dialog#reminders");
    const form = dialog.querySelector("form");
    const closeButton = dialog.querySelector("button#close");

    addButton.addEventListener("click", () => {
      dialog.showModal();
    });

    closeButton.addEventListener("click", (event) => {
      event.preventDefault();
      form.reset();
      dialog.close();
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      //* Gets specific id and list
      const selectedListId = parseInt(this.contentContainer.dataset.listId);
      const list = this.manager.getSpecificListId(selectedListId);

      //* Creates a new reminder item with the form values
      createReminder(event.target, list);

      //* Renders all the reminders
      this.dom.renderListContent(list);

      //* Saves the manager.list to localStorage
      localStorage.setItem("array", JSON.stringify(manager.list));

      form.reset();
      dialog.close();
    });

    function createReminder(form, list) {
      list.addReminder(
        form[0].value,
        form[1].value,
        form[2].value,
        form[3].value
      );
    }
  }

  //* Remove Button for the reminders
  setupReminderDeleteHandlers() {
    this.contentContainer.addEventListener("click", (event) => {
      const removeButton = event.target.closest(".delete-btn");
      if (!removeButton) return;

      const reminder = removeButton.closest(".reminder");
      if (!reminder) return;

      const id = reminder.id; //* Gets the reminder id
      const listId = parseInt(this.contentContainer.dataset.listId); //* Gets the list id
      const list = this.manager.getSpecificListId(listId); //* Gets the specific list from where deletes the reminder

      list.removeReminder(id);
      reminder.remove(); // Properly remove from DOM

      //* Saves the manager.list to localStorage
      localStorage.setItem("array", JSON.stringify(manager.list));
    });
  }
}
