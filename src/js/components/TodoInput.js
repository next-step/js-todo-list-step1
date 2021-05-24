import { alertState } from '../utils/events.js';

export default function TodoInput({ addTodo }) {
  const $todoInput = document.querySelector("#new-todo-title");

  $todoInput.addEventListener("keypress", event => this.addTodoItem(event));

  this.addTodoItem = event => {
    const $newTodoTarget = event.target;

    if (event.key === 'Enter') {
      if (!$newTodoTarget.value.length) {
        alertState(null);
        return;
      }

      addTodo($newTodoTarget.value);
      $newTodoTarget.value = "";
    }
  };
}
