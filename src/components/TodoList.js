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
    this.$todoList.addEventListener("dblclick", this.changeTodo.bind(this));
    this.$todoList.addEventListener("keydown", this.editTodo.bind(this));

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

  changeTodo(event) {
    if (!event.target.classList.contains("label")) {
      return;
    }
    const id = event.target.id;
    const item = findTodoItem(this.$todoItems, +id);

    item.editing = true;
    this.render();
  }

  editTodo(event) {
    const target = document.activeElement;
    if (!target.classList.contains("edit")) {
      return;
    }

    const item = findTodoItem(this.$todoItems, +target.id);
    let edited = false;

    if (!item.editing) {
      return;
    }

    if (event.keyCode === 13) {
      item.content = target.value;
      item.editing = false;
      edited = true;
    }

    if (event.keyCode === 27) {
      console.log("hi");
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
                    <input class="toggle" type="checkbox" id="${todoItem.id}" ${
              todoItem.achieved ? "checked" : ""
            }>
                    <label class="label" id=${todoItem.id}>${
              todoItem.content
            }</label>
                    <button class="destroy" id="${todoItem.id}"></button>
                </div>
                <input class="edit" id=${todoItem.id} value="${
              todoItem.content
            }">
            </li>
            `;
          })
          .join("")}
      `;
  }
}
