import "./app.css";
import { TodosManager } from "./logic/todoManager.js";
import AddIcon from "./assets/icons/plus.svg";
import { dom } from "./logic/todoView.js";
import { eventListeners } from "./logic/todoController.js";

const manager = new TodosManager();
const DOM = new dom();
const reactive = new eventListeners();

export { manager, DOM };

const DefaultList = manager.getSpecificList("Default");
manager.createNewList("Work");
const Work = manager.getSpecificList("Work");

DefaultList.addReminder("Yes", "yes", "yes", "yes");
DefaultList.addReminder("Yes", "yes", "yes", "yes");

Work.addReminder("Yes", "yes", "yes", "yes");

console.log(manager.getAllList());

DOM.renderLists();
DOM.renderListContent("Default");
// DOM.renderListContent("Work");

const sideBTN = document.querySelector("#sidebar_btn");
const contentBTN = document.querySelector("#content_btn");

DOM.createIconElement("img", AddIcon, sideBTN);
DOM.createIconElement("img", AddIcon, contentBTN);
DOM.createTextElement("p", "New List", sideBTN);

reactive.addList();
reactive.changelist();

reactive.removeReminder();
