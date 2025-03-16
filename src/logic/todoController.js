import { DOM, manager } from "../app.js";

export class eventListeners {
  constructor() {
    this.content = document.querySelector("#content");
    this.sidebar = document.querySelector("#sidebar");
    this.sidebar_btn = document.querySelector("#sidebar_btn");
    this.content_btn = document.querySelector("#content_btn");
    this.inputContainer = document.querySelector("#info");
  }

  changelist() {
    const list = this.sidebar.querySelectorAll(".list");
    list.forEach((item) => {
      item.addEventListener("click", () => {
        const htmlContent = item.innerHTML;
        DOM.renderListContent(htmlContent);
        this.removeReminder();
      });
    });
  }

  addList() {
    const addButton = this.sidebar_btn.querySelector("img");
    addButton.addEventListener("click", () => {
      DOM.removeHiddenClass(this.inputContainer);
      const submitButton = this.inputContainer.querySelector("button");
      const input = this.inputContainer.querySelector("input");

      submitButton.addEventListener("click", () => {
        manager.createNewList(input.value);
        DOM.renderLists();
        DOM.addHiddenClass(this.inputContainer);
        this.changelist();
      });
    });
  }

  removeReminder() {
    const reminders = this.content.querySelectorAll("div .reminder");
    const listName = this.content.classList.value;
    //! Codice Merda Fumante Nera
    reminders.forEach((reminder) => {
      //? Chi cazzo ha scritto sta merda
      const removeButton = reminder.querySelector("button");
      const id = reminder.id;
      removeButton.addEventListener("click", () => {
        //* Purtroppo io
        const list = manager.getSpecificList(listName);
        list.removeReminder(id);
        reminder.innerHTML = "";
      });
    });
  }
}
