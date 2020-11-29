export default class TodoInput {
  $target = null;
  onAdd = null;

  constructor({ $target, onAdd }) {
    this.$target = $target.querySelector(".new-todo");
    this.onAdd = onAdd;

    this.$target.addEventListener("keypress", this.handleKeypress.bind(this));
  }

  handleKeypress(event) {
    if (event.key === "Enter" && event.target.value !== "") {
      this.onAdd(event.target.value);
      event.target.value = "";
    }
  }
}
