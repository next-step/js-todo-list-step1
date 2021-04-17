import { TodoItem } from "./TodoItem.js";
import { $, $$ } from "../../util/domSelection.js";
export class TodoList {
  constructor(todoApp) {
    this.todoApp = todoApp;

    const list = $("#todo-list");
    list.addEventListener("click", function (e) {
      if (e.target && e.target.className == "toggle") {
        const targetLi = e.target.closest("li");
        todoApp.updateItemState(
          targetLi.dataset.index,
          targetLi.classList.toggle(TodoItem.COMPLETED)
        );
        targetLi.classList.toggle(TodoItem.ACTIVE);
      }
    });
    list.addEventListener("click", function (e) {
      if (e.target && e.target.className == "destroy") {
        const targetLi = e.target.closest("li");
        targetLi.outerHTML = "";
        todoApp.deleteItem(targetLi.dataset.index);
      }
    });
    list.addEventListener("dblclick", function (e) {
      if (e.target && e.target.nodeName == "LABEL") {
        const targetLi = e.target.closest("li");
        targetLi.classList.add("editing");
      }
    });
    list.addEventListener("keydown", function (e) {
      if (e.target && e.target.nodeName == "INPUT") {
        const targetLi = e.target.closest("li");
        if (e.key == "Escape") {
          targetLi.classList.remove("editing");
        } else if (e.key == "Enter") {
          todoApp.updateItem(targetLi.dataset.index, e.target.value);
          targetLi.classList.remove("editing");
        }
      }
    });
  }
  setState(todoItemArray) {
    const list = $("#todo-list");
    list.innerHTML = "";
    let li;
    let index = 0;
    todoItemArray.forEach((item) => {
      li = document.createElement("li");

      const indexAttribute = document.createAttribute("data-index");
      indexAttribute.value = index;
      index = index + 1;
      li.setAttributeNode(indexAttribute);

      if (item.state == TodoItem.COMPLETED) {
        const liClass = document.createAttribute("class");
        liClass.value = TodoItem.COMPLETED;
        li.setAttributeNode(liClass);
      } else if (item.state == TodoItem.ACTIVE) {
        const liClass = document.createAttribute("class");
        liClass.value = TodoItem.ACTIVE;
        li.setAttributeNode(liClass);
      }
      li.innerHTML = `
              <div class="view">
                  <input class="toggle" type="checkbox" ${
                    item.state == TodoItem.COMPLETED ? "checked" : ""
                  }/>
                  <label class="label">${item.data}</label>
                  <button class="destroy"></button>
              </div>
              <input class="edit" value="${item.data}" />
              `;
      list.appendChild(li);
    });
  }
}
