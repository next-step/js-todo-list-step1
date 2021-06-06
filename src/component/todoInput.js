import { $ } from "../utils/util.js";

export default function TodoInput(app) {
  const $todoInput = $("#new-todo-title");
	
	const addTodoItem = ({ target, key }) => {
    const $newTodoTarget = target;

    if (key === "Enter" && $newTodoTarget.value != "") {
      app.add($newTodoTarget.value);
      $newTodoTarget.value = "";
    }
  };

	$todoInput.addEventListener("keydown", addTodoItem);
}
