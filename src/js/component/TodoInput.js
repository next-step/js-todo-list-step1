import { $ } from "../utils/utils.js";

const $todoInput = $(".new-todo");

export function TodoInput(addList) {
  const addTodo = ({ target, key }) => {
    const value = target.value;
    if (key != "Enter") return;
    addList(value);
    $todoInput.value = "";
    //drawList();
    console.log("todoinput");
  };

  $todoInput.addEventListener("keyup", addTodo);
}
