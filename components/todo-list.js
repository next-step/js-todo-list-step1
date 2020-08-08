import { todosValidation } from '../utils/validation.js';

export default class TodoList {
  constructor(todos, toggleTodo, editTodo, removeTodo) {
    this.todos = [];
    this.todoListElement = document.querySelector('#todo-list');
    this.toggleTodo = toggleTodo;
    this.editTodo = editTodo;
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

  findEditText(todoId) {
    const target = document.querySelector(`#edit-${todoId}`);
    return target.value;
  }

  findTodoItem(targetId) {
    return this.todos.find((todo) => todo.id === targetId);
  }

  todoToggleEvent() {
    this.todoListElement.addEventListener('click', ($event) => {
      let todoId = '';
      const target = $event.target;
      if (['P', 'INPUT', 'LABEL', 'DIV'].includes(target.tagName)) {
        todoId = target.parentElement.id;
      } else {
        todoId = target.id;
      }

      if (target.className === 'destroy') {
        this.removeTodo(todoId);
      } else if (target.className === 'edit') {
        const targetTodo = this.findTodoItem(todoId);
        let changeValue = '';
        if (targetTodo.editMode) {
          changeValue = this.findEditText(todoId);
        }
        this.editTodo(todoId, changeValue);
      } else if (target.className === 'toggle') {
        this.toggleTodo(todoId);
      }
    });
  }

  changeEditMode(todoId, todoText, editMode) {
    if (editMode) {
      return `
        <label for="toggle"></label>
        <input id="edit-${todoId}" class="edit-todo-input" type="text" value="${todoText}">
      `;
    } else {
      return `<label for="toggle-${todoId}" class="view">${todoText}</label>`;
    }
  }

  render() {
    const todoList = this.todos.map((todo) => {
      return `
        <li id="${todo.id}">
          <input id="toggle-${todo.id}" class="toggle" type="checkbox" ${
        todo.toggle ? 'checked' : ''
      } />
          ${this.changeEditMode(todo.id, todo.text, todo.editMode)}

          <div class="edit">${todo.editMode ? '완료' : '수정'}</div>
          <div class="destroy"></div>
        </li>
      `;
    });
    this.todoListElement.innerHTML = todoList.join('');
  }
}
