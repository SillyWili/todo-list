import "./app.css";
import { TodosManager } from "./logic/todoManager.js";
import AddIcon from "./assets/icons/plus.svg";
import { dom } from "./logic/todoDOM.js";
import { EventHandler } from "./logic/todoEventListeners.js";

let manager;
const domHandler = new dom();

function loadLocalStorage() {
  if (localStorage.getItem("array")) {
    const parsedList = JSON.parse(localStorage.getItem("array"));
    manager = TodosManager.fromJson(parsedList);

    domHandler.renderLists(manager.getAllList());
  } else {
    manager = new TodosManager();
  }
}
loadLocalStorage();

const sideBTN = document.querySelector("#sidebarButtonContainer");
const contentBTN = document.querySelector("#contentButtonContainer");

// const DefaultList = manager.getSpecificList("Default");
// manager.createNewList("Work");
// const Work = manager.getSpecificList("Work");

// DefaultList.addReminder("Yes", "yes", "2024", "LOW");
// DefaultList.addReminder("Yes", "yes", "2019", "MEDIUM");

domHandler.createIconElement(AddIcon, sideBTN);
domHandler.createIconElement(AddIcon, contentBTN);
domHandler.createTextElement("p", "New List", sideBTN);

// Work.addReminder("Yes", "yes", "2016", "HIGH");

export { manager, domHandler };

const eventsHandler = new EventHandler();
