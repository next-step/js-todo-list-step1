import { LocalStorageUtil } from "../js/LocalStorageUtil.js";
import {TodoCount} from "./TodoCount.js";


export class TodoList {
  constructor(todoItem) {
    this.storage = new LocalStorageUtil();
    this.todoCount = new TodoCount();
    this.$todoList = document.querySelector("#todo-list");
    this.$todoList.addEventListener("click", (e) => this.onClickHandle(e));
    this.$todoList.addEventListener("dblclick", (e) => this.onDbClickHandle(e));
    this.$todoList.addEventListener("keyup", (e) => this.onKeyUpHandle(e));
    this.setState(todoItem);
  }

  setState = (updateItems) => {
    this.todoCount.setState(updateItems);
    this.render(updateItems);
  };

  render(todoItems) {
    if (!todoItems) return;
    this.clearTodoList();
    Object.values(todoItems).forEach(({ contents }) => {
      this.$todoList.insertAdjacentHTML("beforeend", contents);
    });
  }

  clearTodoList() {
    while (this.$todoList.firstChild) {
      this.$todoList.removeChild(this.$todoList.lastChild);
    }
  }

  onClickHandle({ target }) {
    const id = target.closest("li").dataset.id;
    let data = JSON.parse(this.storage.getItem(id));

    data.state === "active"
      ? (data.state = "completed")
      : (data.state = "active");

    if (target.classList.value === "toggle") {
      target.parentNode.parentNode.classList.toggle("completed");
      this.storage.setLocalStorage(data);
    }
    if (target.classList.value === "destroy") {
      this.storage.removeLocalStarageData(id);
      const li = target.parentNode.parentNode;
      li.remove();
    }
  }

  onDbClickHandle({ target }) {
    const id = target.closest("li").dataset.id;
    let data = JSON.parse(this.storage.getItem(id));
    if (target.classList.value === "label") {
      target.parentNode.parentNode.classList.add("editing");
      target.parentNode.nextElementSibling.focus();
    }
  }

  onKeyUpHandle({ target }) {
    // const target = event.target;
    const id = target.closest("li").dataset.id;
    let data = JSON.parse(this.storage.getItem(id));

    if (target.tagName === "INPUT") {
      if (event.key === "Escape") {
        target.previousElementSibling.querySelector(".label").innerText;
        target.parentNode.classList.remove("editing");
      }
      if (event.key === "Enter") {
        target.previousElementSibling.querySelector(".label").innerText =
          target.value;
        data.contents = target.value;
        this.storage.setLocalStorage(data);
        target.parentNode.classList.remove("editing");
      }
    }
  }
}
