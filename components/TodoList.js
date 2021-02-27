import { KEYS } from "../utils/constants.js";
import TodoItem from "./TodoItem.js";

export default class TodoList {
  $todoList;
  onRemove;
  onCheckedToggle;
  onTitleChange;

  constructor(onRemove, onCheckedToggle, onTitleChange) {
    this.$todoList = document.querySelector("#todo-list");
    console.log(this.$todoList);
    this.onRemove = onRemove;
    this.onCheckedToggle = onCheckedToggle;
    this.onTitleChange = onTitleChange;
    this.delegateEvent();
  }

  delegateEvent() {
    this.$todoList.addEventListener("dblclick", (event) => {
      const $li = event.target.closest(".todo-item");
      $li.classList.add("editing");
    });

    this.$todoList.addEventListener("click", (event) => {
      const $li = event.target.closest(".todo-item");
      if (event.target && event.target.className === "destroy") {
        this.onRemove($li.id);
        return;
      }

      if (event.target && event.target.className === "toggle") {
        this.onCheckedToggle($li.id);
      }
    });

    this.$todoList.addEventListener("keyup", (event) => {
      const $li = event.target.closest(".todo-item");

      if (event.key === KEYS.ESCAPE) {
        $li.classList.remove("editing");
        event.target.value = $li.querySelector("label").innerText;
        return;
      }

      if (event.key === KEYS.ENTER) {
        $li.classList.remove("editing");
        this.onTitleChange($li.id, event.target.value);
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
