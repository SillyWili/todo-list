//* make so when you click the element from the sidebar it loads the reminders from that lists, and changes the background
//* also have so i can modify the reminders description and so on?
//* then make the button an icon and give it functionality
//* get the elements using the querry selectors

import { DOM, manager } from "../app.js";

export class eventListeners {
  constructor() {
    this.content = document.querySelector("#content");
    this.sidebar = document.querySelector("#sidebar");
    this.sidebar_btn = document.querySelector("#sidebar_btn");
    this.content_btn = document.querySelector("#content_btn");
  }

  changelist() {
    const list = this.sidebar.querySelectorAll(".list");
    list.forEach((item) => {
      item.addEventListener("click", () => {
        const htmlContent = item.innerHTML;
        DOM.renderListContent(htmlContent);
      });
    });
  }

  addList() {
    const addBtn = this.sidebar_btn.querySelector("img");
    addBtn.addEventListener("click", () => {
      console.log("ciao");
    });
  }
}
