import { findTodoItem, findTodoItemIndex } from "../utils/todoItem.js";

export default class TodoList {
  $target = null;
  $todoList = null;
  $todoItems = null;

  constructor($target, $todoItems) {
    this.$target = $target;
    const TodoList = document.createElement("ul");
    this.$todoList = TodoList;

    this.$todoList.id = "todo-list";
    this.$todoList.classList.add("todo-list");

    this.$todoItems = $todoItems;
    this.$todoList.addEventListener("click", this.toggleTodoEvent.bind(this));
    this.$todoList.addEventListener("click", this.destroyTodo.bind(this));

    this.$target.appendChild(this.$todoList);
    this.render();
  }

  setState(nextState) {
    this.$todoItems = nextState;
    this.render();
  }

  toggleTodoEvent(event) {
    if (!event.target.classList.contains("toggle")) {
      return;
    }
    event.preventDefault();

    const id = event.target.id;
    const item = findTodoItem(this.$todoItems, +id);

    item.achieved = !item.achieved;

    this.render();
  }

  destroyTodo(event) {
    if (!event.target.classList.contains("destroy")) {
      return;
    }
    event.preventDefault();
    const id = event.target.id;
    const index = findTodoItemIndex(this.$todoItems, +id);

    this.$todoItems.splice(index, 1);

    this.render();
  }

  render() {
    this.$todoList.innerHTML = `
        ${this.$todoItems
          .map((todoItem) => {
            return `
            <li id="${todoItem.id}" class=${
              todoItem.achieved ? "false" : "completed"
            }>
                <div class="view">
                    <input class="toggle" type="checkbox" id="${todoItem.id}" ${
              todoItem.achieved ? "" : "checked"
            }>
                    <label class="label">${todoItem.content}</label>
                    <button class="destroy" id="${todoItem.id}"></button>
                </div>
                <input class="edit" value="${todoItem.content}">
            </li>
            `;
          })
          .join("")}
      `;
  }
}
