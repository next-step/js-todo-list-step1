export default function TodoInput(app) {
  const $todoInput = document.querySelector("#new-todo-title");
	
	const addTodoItem = (event) => {
    const $newTodoTarget = event.target;

    if (event.key === "Enter" && $newTodoTarget.value != "") {
      app.add($newTodoTarget.value);
      $newTodoTarget.value = "";
    }
  };

	$todoInput.addEventListener("keydown", addTodoItem);
}
