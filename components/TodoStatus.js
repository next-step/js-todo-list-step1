function TodoStatus(element, { onAction }) {
  if (!(this instanceof TodoStatus)) {
    throw new Error("error: TodoStatus must be called with new!");
  }

  this.$filter = element;
  this.onAction = onAction;

  this.$filter.addEventListener("click", (e) => {
    const { classList } = e.target;

    // 하나 이상의 className이 있을 경우 $el을 못찾는 이슈로 인해 classList[0] 사용
    const status = classList[0];
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
