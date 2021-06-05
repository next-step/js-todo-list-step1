import { ENTER } from '../constants.js';

export default function TodoInput({ onAdd }) {
  const $todoInput = document.querySelector('#new-todo-title');

  $todoInput.addEventListener('keydown', (event) => this.addTodoItem(event));

  this.addTodoItem = (event) => {
    if (event.key !== ENTER) return;

    const todoInputTarget = event.target;
    if (todoInputTarget.value === '') return;

    onAdd(todoInputTarget.value);
    todoInputTarget.value = '';
  };

  $todoInput.focus();
}
