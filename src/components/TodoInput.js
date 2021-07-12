export default class TodoInput {
  $target = null;
  $todoInput = null;

  constructor($target, onKeyPress) {
    this.$target = $target;

    const TodoInput = document.createElement("input");
    this.$todoInput = TodoInput;

    this.$todoInput.id = "new-todo-title";
    this.$todoInput.classList.add("new-todo");
    this.$todoInput.placeholder = "할일을 추가해주세요";
    this.$todoInput.autofocus = true;

    this.$todoInput.addEventListener("keypress", onKeyPress);

    this.render();
  }

  render() {
    this.$target.appendChild(this.$todoInput);
  }
}
