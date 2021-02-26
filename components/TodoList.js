import TodoItem from "./TodoItem.js";

export default class TodoList {
  $todoList;
  onRemove;

  constructor(onRemove) {
    this.$todoList = document.querySelector("#todo-list");
    this.onRemove = onRemove;
  }

  render(items) {
    this.$todoList.innerHTML = "";
    items.map((item) =>
      this.$todoList.appendChild(new TodoItem(item, this.onRemove).render())
    );
  }
}
