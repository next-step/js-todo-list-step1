import { $ } from "../utils/utils.js";
import * as TodoItem from "../TodoItem.js";
const $todoInput = $(".new-todo");

export function TodoInput() {
  const addTodo = ({ target, key }) => {
    const value = target.value;
    if (key != "Enter") return;
    TodoItem.addList(value);
    $todoInput.value = "";
  };

  $todoInput.addEventListener("keyup", addTodo);
}
