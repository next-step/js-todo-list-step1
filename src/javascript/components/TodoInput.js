function TodoInput({ onAdd }) {
  const $todoInput = document.getElementById("new-todo-title");

  $todoInput.addEventListener("keydown", (event) => this.addTodoItem(event));

  this.addTodoItem = (event) => {
    if (event.key === "Enter") {
      const $newTodoTarget = event.target;
      onAdd($newTodoTarget.value);
      $newTodoTarget.value = "";
    }
  };
}

export default TodoInput;
