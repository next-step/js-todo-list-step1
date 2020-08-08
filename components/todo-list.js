import { todosValidation } from '../utils/validation.js';
import { createUUID } from '../utils/uuid.js';

export default class TodoList {
  constructor(todos, toggleTodo, removeTodo) {
    this.todos = [];
    this.todoListElement = document.querySelector('#todo-list');
    this.toggleTodo = toggleTodo;
    this.removeTodo = removeTodo;

    if (todosValidation(todos)) {
      this.todos = todos;
      this.render();
      this.todoToggleEvent();
    }
  }

  setState(todos) {
    this.todos = todos;
    this.render();
  }

  findCilcedIndexTodo(id) {
    return Array.from(this.todoListElement.children).findIndex(
      (todo) => todo.id === id
    );
  }

  todoToggleEvent() {
    this.todoListElement.addEventListener('click', ($event) => {
      let listId = '';
      const target = $event.target;
      if (['P', 'INPUT', 'LABEL', 'DIV'].includes(target.tagName)) {
        listId = target.parentElement.id;
      } else {
        listId = target.id;
      }

      const targetIndex = this.findCilcedIndexTodo(listId);
      if (targetIndex > -1) {
        if (target.className === 'destroy') {
          this.removeTodo(targetIndex);
        } else {
          this.toggleTodo(targetIndex);
        }
      }
    });
  }

  render() {
    const todoList = this.todos.map((todo) => {
      return `
        <li id="${createUUID()}">
          <input id="toggle" class="toggle" type="checkbox" ${
            todo.toggle ? 'checked' : ''
          } />
          <label for="toggle"></label>

          <p class="view">${todo.text}</p>

          <div class="edit">수정</div>
          <div class="destroy"></div>
        </li>
      `;
    });
    this.todoListElement.innerHTML = todoList.join('');
  }
}
