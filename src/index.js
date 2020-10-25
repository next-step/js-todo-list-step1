import { createElement as e } from './utils.js';
import TodoItem from './components/TodoItem.js';

const $newTodoInput = document.querySelector('#new-todo-title');
const $todoList = document.querySelector('#todo-list');

$newTodoInput.addEventListener('keypress', ({ key, target }) => {
  if (key === 'Enter') {
    const newTodo = new TodoItem(target.value);
    $todoList.appendChild(newTodo.element);
    target.value = '';
  }
});
