import { KEYS } from "../utils/constants.js";
import TodoItem from "./TodoItem.js";

export default class TodoList {
  $todoList;
  onRemove;
  onCheckedToggle;
  onTitleChange;

  constructor(onRemove, onCheckedToggle, onTitleChange) {
    this.$todoList = document.querySelector("#todo-list");
    this.onRemove = onRemove;
    this.onCheckedToggle = onCheckedToggle;
    this.onTitleChange = onTitleChange;
    this.addEventListeners();
  }

  addEventListeners() {
    this.$todoList.addEventListener("dblclick", ({ target }) => {
      const $li = target.closest(".todo-item");
      $li.classList.add("editing");
    });

    this.$todoList.addEventListener("click", ({ target }) => {
      const $li = target.closest(".todo-item");
      if (target && target.className === "destroy") {
        this.onRemove($li.id);
        return;
      }

      if (target && target.className === "toggle") {
        this.onCheckedToggle($li.id);
      }
    });

    this.$todoList.addEventListener("keyup", ({ key, target }) => {
      const $li = target.closest(".todo-item");

      if (key === KEYS.ESCAPE) {
        $li.classList.remove("editing");
        target.value = $li.querySelector("label").innerText;
        return;
      }

      if (key === KEYS.ENTER) {
        $li.classList.remove("editing");
        this.onTitleChange($li.id, target.value);
      }
    });
  }

  render(items) {
    this.$todoList.innerHTML = "";
    items.forEach((item) =>
      this.$todoList.appendChild(
        new TodoItem(
          item,
          this.onRemove,
          this.onCheckedToggle,
          this.onTitleChange
        ).render()
      )
    );
  }
}
