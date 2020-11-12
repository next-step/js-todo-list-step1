function TodoInput({ onAction }) {
  this.onAction = onAction;
  const $input = document.querySelector(".new-todo");
  $input.addEventListener("keypress", (e) => {
    if ($input.value && e.key === "Enter") {
      this.onAction.add($input.value);
      $input.value = "";
    }
  });
}

export default TodoInput;
