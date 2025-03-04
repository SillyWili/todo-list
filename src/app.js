import "./app.css";
import { TodosManager } from "./logic/todoManager.js";

const manager = new TodosManager();
const DefaultList = manager.getSpecificList("Default");
manager.createNewList("Work");
const Work = manager.getSpecificList("Work");

DefaultList.addReminder("Yes", "yes", "yes", "yes");
Work.addReminder("Yes", "yes", "yes", "yes");

console.log(manager.getAllList());
