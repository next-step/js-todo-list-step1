import { ENTER, ESC, ESCAPE } from "../utils/constants.js";
import { findTodoItem } from "../utils/todoItem.js";

export default class TodoList {
  $target = null;
  $todoList = null;
  $todoItems = null;
  $viewMode = null;

  constructor(
    $target,
    $todoItems,
    destoryTodoHandler,
    toggleTodoHanlder,
    $viewMode
  ) {
    this.$target = $target;
    const TodoList = document.createElement("ul");
    this.$todoList = TodoList;
    this.$viewMode = $viewMode;

    this.$todoList.id = "todo-list";
    this.$todoList.classList.add("todo-list");

    this.$todoItems = $todoItems;
    this.$todoList.addEventListener("click", toggleTodoHanlder);
    this.$todoList.addEventListener("click", destoryTodoHandler);
    this.$todoList.addEventListener("dblclick", this.changeTodo.bind(this));
    this.$todoList.addEventListener("keydown", this.editTodo.bind(this));

    this.$target.appendChild(this.$todoList);
    this.render();
  }

  setState(nextState, $viewMode) {
    this.$todoItems = nextState;
    this.$viewMode = $viewMode;
    this.render();
  }

  setViewMode($viewMode) {
    this.$viewMode = $viewMode;
    this.render();
  }

  toggleTodoEvent(event) {
    if (!event.target.classList.contains("toggle")) {
      return;
    }
    event.preventDefault();

    const id = event.target.dataset.id;
    const item = findTodoItem(this.$todoItems, +id);

    item.achieved = !item.achieved;

    this.render();
  }

  changeTodo(event) {
    if (!event.target.classList.contains("label")) {
      return;
    }
    const id = event.target.dataset.id;
    const item = findTodoItem(this.$todoItems, +id);

    item.editing = true;
    this.render();
  }

  editTodo(event) {
    const target = document.activeElement;
    if (!target.classList.contains("edit")) {
      return;
    }

    const item = findTodoItem(this.$todoItems, +target.dataset.id);
    let edited = false;

    if (!item.editing) {
      return;
    }

    if (event.key === ENTER) {
      item.content = target.value;
      item.editing = false;
      edited = true;
    }

    if (event.key === ESC || event.key === ESCAPE) {
      item.editing = false;
      edited = true;
    }

    if (edited) {
      this.render();
    }
  }

  render() {
    this.$todoList.innerHTML = `
        ${this.$todoItems
          .map((todoItem) => {
            return `
            <li id="${todoItem.id}" class="${
              todoItem.achieved ? "completed" : "false"
            } ${todoItem.editing ? "editing" : ""}">
                <div class="view">
                    <input class="toggle" type="checkbox" data-id="${
                      todoItem.id
                    }" ${todoItem.achieved ? "checked" : ""}>
                    <label class="label" data-id=${todoItem.id}>${
              todoItem.content
            }</label>
                    <button class="destroy" data-id="${todoItem.id}"></button>
                </div>
                <input class="edit" data-id=${todoItem.id} value="${
              todoItem.content
            }">
            </li>
            `;
          })
          .join("")}
      `;
  }
}
