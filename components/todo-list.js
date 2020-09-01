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
      this.applyTodoEvents();
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

  editEvent(todoId) {
    const targetTodo = this.findTodoItem(todoId);
    let changeValue = '';
    if (targetTodo.editMode) {
      changeValue = this.findEditText(todoId);
    }
    this.editTodo(todoId, changeValue);
  }

  todoDbClickEvent() {
    this.todoListElement.addEventListener('dblclick', ($event) => {
      const target = $event.target;
      let todoId = target.closest('li').id;
      this.editEvent(todoId);
    });
  }

  todoControlEvent() {
    this.todoListElement.addEventListener('click', ($event) => {
      const target = $event.target;
      let todoId = target.closest('li').id;

      if (target.className === 'destroy') {
        this.removeTodo(todoId);
      } else if (target.className === 'edit') {
        this.editEvent(todoId);
      } else if (target.className === 'toggle') {
        this.toggleTodo(todoId);
      }
    });
  }

  todoInputKeyEnterEvent() {
    this.todoListElement.addEventListener('keypress', ($event) => {
      if ($event.key !== 'Enter') {
        return;
      }
      const target = $event.target;
      this.editEvent(target.closest('li').id);
    });
  }

  applyTodoEvents() {
    this.todoDbClickEvent();
    this.todoControlEvent();
    this.todoInputKeyEnterEvent();
  }

  changeEditMode(todoId, todoText, editMode) {
    if (editMode) {
      return `
        <label class="hidden" for="toggle"></label>
        <input id="edit-${todoId}" class="edit-todo-input" type="text" value="${todoText}">
      `;
    } else {
      return `
        <label for="toggle-${todoId}" class="view">${todoText}</label>
        <input id="edit-${todoId}" class="edit-todo-input hidden" type="text">
      `;
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
