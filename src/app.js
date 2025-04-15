import "./app.css";
import AddIcon from "./assets/icons/plus.svg";
import { TodosManager } from "./logic/todoManager.js";
import { dom } from "./logic/todoDOM.js";
import { EventHandler } from "./logic/todoEventListeners.js";

const app = (function () {
  let manager;
  const domHandler = new dom();

  function loadLocalStorage() {
    if (localStorage.getItem("array")) {
      const parsedList = JSON.parse(localStorage.getItem("array"));
      manager = TodosManager.fromJson(parsedList);
      domHandler.renderLists(manager.getAllList());
    } else {
      manager = new TodosManager();
      domHandler.renderLists(manager.getAllList());
    }
  }

  loadLocalStorage();

  return { manager, domHandler };
})();

const { manager, domHandler } = app;

const sideBTN = document.querySelector("#sidebarButtonContainer");
const contentBTN = document.querySelector("#contentButtonContainer");

domHandler.createIconElement(AddIcon, sideBTN);
domHandler.createIconElement(AddIcon, contentBTN);
domHandler.createTextElement("p", "New List", sideBTN);

new EventHandler();

export { manager, domHandler };
