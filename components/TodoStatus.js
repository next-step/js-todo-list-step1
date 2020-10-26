function TodoStatus({ onAction }) {
  if (!new.target)
    throw new Error("error: TodoStatus must be called with new!");

  this.$filter = document.querySelector("ul.filters");
  this.onAction = onAction;

  this.$filter.addEventListener("click", (e) => {
    const [selectedStatus] = e.target.classList;

    const status = selectedStatus;
    const $el = this.$filter.querySelector(`.${status}`);
    const isAlreadyBinding = $el.classList.contains("selected");

    if (!isAlreadyBinding) {
      this.$filter.querySelector(".selected").classList.remove("selected");
      this.$filter.querySelector(`.${status}`).classList.add("selected");
      this.onAction.bind(`${status}`);
    }
  });
}

export default TodoStatus;
