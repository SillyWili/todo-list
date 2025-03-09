import manager from "../app.js";

const content = document.querySelector("#content");
const sidebar = document.querySelector("#sidebar");

// export function viewProjects() {
// const list = document.createElement("div");
// manager.getAllList().forEach((item) => {
//   const p = document.createElement("p");
//   p.textContent = item.name;
//   list.appendChild(p);
// });

// sidebar.appendChild(list);
// }

class dom {
  constructor(container) {
    this.container = container;
  }

  renderLists(manager) {
    sidebar.innerHTML = "";
    manager.getAllList().forEach((item) => {
      const p = document.createElement("p");
      p.textContent = item.name;
      sidebar.appendChild(p);
    });
  }

  renderListContent(manager, name) {
    content.innerHTML = "";
    manager.getSpecificList(name).reminders.forEach((key) => {
      const wrapper = document.createElement("div");
      this.createElement("h3", key, "title", wrapper);
      this.createElement("p", key, "description", wrapper);
      this.createElement("p", key, "priority", wrapper);
      this.createElement("p", key, "expiration", wrapper);
      content.appendChild(wrapper);
    });
  }

  createElement(type, key, propriety, update) {
    const item = document.createElement(type);
    item.textContent = key[propriety];
    update.appendChild(item);
  }
}

export { dom };
