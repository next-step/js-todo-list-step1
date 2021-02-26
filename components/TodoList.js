import TodoItem from "./TodoItem.js";

export default class TodoList {
  $todoList;
  onRemove;
  onCheckedToggle;

  constructor(onRemove, onCheckedToggle) {
    this.$todoList = document.querySelector("#todo-list");
    this.onRemove = onRemove;
    this.onCheckedToggle = onCheckedToggle;
  }

  render(items) {
    this.$todoList.innerHTML = "";
    items.forEach((item) =>
      this.$todoList.appendChild(
        new TodoItem(item, this.onRemove, this.onCheckedToggle).render()
      )
    );
  }
}
