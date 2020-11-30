// import { createLocalStorageObject } from "../js/LocalStorageUtil.js";

export class TodoList {
  constructor(todoItem, store) {
    console.log("list :", store);
    this.$todoList = document.querySelector("#todo-list");
    this.$todoList.addEventListener("click", (e) =>
      this.onClickHandle(e, store)
    );
    this.$todoList.addEventListener("dblclick", this.onDbClickHandle);
    this.$todoList.addEventListener("keyup", this.onKeyUpHandle);
    this.render(todoItem);
  }

  setState = (updateItems) => {
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

  onClickHandle(event, store) {
    console.log(store);
    let target = event.target;
    // this.setState();
    if (target.classList.value === "toggle") {
      target.parentNode.parentNode.classList.toggle("completed");
    }
    if (target.classList.value === "destroy") {
      const li = target.parentNode.parentNode;
      li.remove();
    }
  }

  onDbClickHandle({ target }) {
    if (target.classList.value === "label") {
      target.parentNode.parentNode.classList.add("editing");
    }
  }

  onKeyUpHandle({ target }) {
    // const target = event.target;
    if (target.tagName === "INPUT") {
      if (event.key === "Escape") {
        target.previousElementSibling.querySelector(".label").innerText;
        target.parentNode.classList.remove("editing");
      }
      if (event.key === "Enter") {
        target.previousElementSibling.querySelector(".label").innerText =
          target.value;
        target.parentNode.classList.remove("editing");
      }
    }
  }
}
