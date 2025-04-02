import "./app.css";
import { TodosManager } from "./logic/todoManager.js";
import AddIcon from "./assets/icons/plus.svg";
import { dom } from "./logic/todoDOM.js";
import { EventHandler } from "./logic/todoEventListeners.js";

const manager = new TodosManager();
const domHandler = new dom();

const sideBTN = document.querySelector("#sidebarButtonContainer");
const contentBTN = document.querySelector("#contentButtonContainer");

const DefaultList = manager.getSpecificList("Default");
manager.createNewList("Work");
const Work = manager.getSpecificList("Work");

DefaultList.addReminder("Yes", "yes", "yes", "yes");
DefaultList.addReminder("Yes", "yes", "yes", "yes");

domHandler.createIconElement(AddIcon, sideBTN);
domHandler.createIconElement(AddIcon, contentBTN);
domHandler.createTextElement("p", "New List", sideBTN);

Work.addReminder("Yes", "yes", "yes", "yes");
domHandler.renderLists(manager.getAllList());

export { manager, domHandler };

const eventsHandler = new EventHandler();
