export default class TodoList {
  $target = null;
  $todoList = null;

  constructor($target) {
    this.$target = $target;
    const TodoList = document.createElement("ul");
    this.$todoList = TodoList;

    this.$todoList.id = "todo-list";
    this.$todoList.classList.add("todo-list");

    this.render();
  }

  render() {
    this.$target.appendChild(this.$todoList);
  }
}
