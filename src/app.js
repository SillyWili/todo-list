import "./app.css";
import { TodosManager } from "./logic/todoManager.js";
import { dom } from "./logic/todoView.js";

const manager = new TodosManager();
export default manager;

const DefaultList = manager.getSpecificList("Default");
manager.createNewList("Work");
const Work = manager.getSpecificList("Work");

DefaultList.addReminder("Yes", "yes", "yes", "yes");
DefaultList.addReminder("NO", "NO", "NO", "NO");

Work.addReminder("Yes", "yes", "yes", "yes");

console.log(manager.getAllList());

const DOM = new dom();
DOM.renderLists(manager);
DOM.renderListContent(manager, "Default");
DOM.renderListContent(manager, "Work");
