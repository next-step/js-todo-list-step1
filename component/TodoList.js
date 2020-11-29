import { createLocalStorageObject } from "../js/LocalStorageUtil.js";

export class TodoList {
  constructor() {
    this.$todoList = document.querySelector("#todo-list");
    this.$todoList.addEventListener("click", this.onClickHandle);
    this.$todoList.addEventListener("dblclick", this.onDbClickHandle);
    this.$todoList.addEventListener("keyup", this.onKeyUpHandle);
  }

  setState = (updateItems) => {
    console.log("TodoList state: ", updateItems);
    this.render(updateItems);
  };

  render = (todoItems) => {
    const copyItems = [...todoItems];
    Object.values(copyItems).forEach((item) => {
      this.$todoList.insertAdjacentHTML("beforeend", item.content);
    });
  };

  onClickHandle = ({ target }) => {
    // const target = event.target;
    if (target.classList.value === "toggle") {
      target.parentNode.parentNode.classList.toggle("completed");
    }
    if (target.classList.value === "destroy") {
      const li = target.parentNode.parentNode;
      li.remove();
    }
  };

  onDbClickHandle = ({ target }) => {
    // const target = event.target;
    if (target.classList.value === "label") {
      target.parentNode.parentNode.classList.add("editing");
    }
  };

  onKeyUpHandle({ target }) {
    // const target = event.target;
    console.log(event);
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
