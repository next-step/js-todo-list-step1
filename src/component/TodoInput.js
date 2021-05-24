import { $ } from "../util/util.js";

export default function TodoInput({ onAdd }) {
  const $todoInput = $("#new-todo-title");

  $todoInput.addEventListener("keypress", onAdd);
}
