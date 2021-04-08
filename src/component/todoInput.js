import { checkKey } from "../utils/eventUtils.js";

// 입력 받는 컴포넌트
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