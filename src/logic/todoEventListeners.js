import { domHandler, manager } from "../app.js";

// export class eventListeners {
//   constructor() {
//     this.content = document.querySelector("#content");
//     this.sidebar = document.querySelector("#sidebar");
//     this.sidebar_btn = document.querySelector("#sidebar_btn");
//     this.content_btn = document.querySelector("#content_btn");
//     this.inputContainer = document.querySelector("#info");
//   }

//   changelist() {
//     const list = this.sidebar.querySelectorAll(".list");
//     list.forEach((item) => {
//       item.addEventListener("click", () => {
//         const htmlContent = item.innerHTML;
//         DOM.renderListContent(htmlContent);
//         this.removeReminder();
//       });
//     });
//   }

//   addList() {
//     const addButton = this.sidebar_btn.querySelector("img");
//     addButton.addEventListener("click", () => {
//       DOM.removeHiddenClass(this.inputContainer);
//       const submitButton = this.inputContainer.querySelector("button");
//       const input = this.inputContainer.querySelector("input");

//       submitButton.addEventListener("click", () => {
//         manager.createNewList(input.value);
//         DOM.renderLists();
//         DOM.addHiddenClass(this.inputContainer);
//         this.changelist();
//       });
//     });
//   }

//   removeReminder() {
//     const reminders = this.content.querySelectorAll("div .reminder");
//     const listName = this.content.classList.value;
//     //! Codice Merda Fumante Nera
//     reminders.forEach((reminder) => {
//       //? Chi cazzo ha scritto sta merda
//       const removeButton = reminder.querySelector("button");
//       const id = reminder.id;
//       removeButton.addEventListener("click", () => {
//         //* Purtroppo io
//         const list = manager.getSpecificList(listName);
//         list.removeReminder(id);
//         reminder.innerHTML = "";
//       });
//     });
//   }
// }

export class EventHandler {
  constructor(domHandler, manager) {
    this.dom = domHandler;
    this.manager = manager;
    this.currentListId = null;
    this.defaultList = this.manager.getSpecificList("Default");

    // Store references to DOM elements
    this.sidebarContainer = document.querySelector("#sidebar");
    this.sidebarButtonContainer = document.querySelector("#sidebar_btn");
    this.contentContainer = document.querySelector("#content");
    this.contentButtonContainer = document.querySelector("#content_btn");

    this.dom.renderListContent(this.defaultList);

    // Initial setup of all event listeners
    this.setupAllEventListeners();
  }

  setupAllEventListeners() {
    this.setupListClickHandlers();
    this.setupAddListHandler();
    // Setup other event handlers
  }

  setupListClickHandlers() {
    this.sidebarContainer.addEventListener("click", (event) => {
      const listItem = event.target.closest(".list");
      if (!listItem) return; // Clicked elsewhere

      // const listName = listItem.textContent;

      const listId = parseInt(listItem.dataset.listId);
      // const selectedList = this.manager.getSpecificList(listName);
      // const selectedList = this.manager.list.find((l) => l.id === listId);
      const listName = listItem.textContent;

      // Get the actual TodoList object using the name
      const selectedList = this.manager.getSpecificList(listName);

      if (selectedList) {
        this.currentListId = listId;
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
        this.dom.renderLists(this.manager.getAllList(), this.currentListId);
        this.dom.addHiddenClass(inputContainer);

        // Remove this one-time handler after use
        submitButton.removeEventListener("click", submitHandler);
      };

      submitButton.addEventListener("click", submitHandler);
    });
  }

  setupReminderDeleteHandlers() {
    const reminders = document.querySelectorAll("div .reminder");
    const listName = this.contentContainer.classList.value;

    reminders.forEach((reminder) => {
      const removeButton = reminder.querySelector("button");
      const id = reminder.id;

      removeButton.addEventListener("click", () => {
        const list = this.manager.getSpecificList(listName);
        list.removeReminder(id);
        reminder.remove(); // Properly remove from DOM
      });
    });
  }
}
