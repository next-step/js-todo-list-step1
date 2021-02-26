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
