/* 
* TodoInput Component를 관리 (Read)
*/

import { checkKey } from "../utils/eventUtils.js";

export default function TodoInput({ onAdd }) {
  const $todoInput = document.querySelector("#new-todo-title");

  $todoInput.addEventListener("keydown", (event) => this.addTodoItem(event));

  this.addTodoItem = (event) => {
    const $newTodoTarget = event.target;
    if (checkKey(event, "Enter")) {
      onAdd($newTodoTarget.value);
      $newTodoTarget.value = "";
    }
  };
}