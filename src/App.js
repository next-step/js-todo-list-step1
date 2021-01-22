import AddTodo from './components/AddTodo.js';
import ChangeTodo from './components/ChangeTodo.js';
import EditTodo from './components/EditTodo.js';
import FilterTodo from './components/FilterTodo.js';
import { ALL, ACTIVE, COMPLETED } from './constant/state.js';

export default class App {
  constructor() {
    this.$todoList = document.querySelector('#todo-list');
    this.$newTodoTitle = document.querySelector('#new-todo-title');
    this.$count = document.querySelector('strong');
    this.$filters = document.querySelector('.filters');

    this.addTodo = new AddTodo(this.$newTodoTitle, this.loadTodo);
    this.changeTodo = new ChangeTodo(this.$todoList, this.loadTodo);
    this.editTodo = new EditTodo(this.$todoList, this.loadTodo);
    this.filterTodo = new FilterTodo(this.$filters, this.loadTodo);
  }

  todoTemplate = (todo) => {
    return `<li id=${todo.id} class=${todo.completed && 'completed'} >
                <div class="view">
                    <input class="toggle" type="checkbox" 
                      id=${todo.id} ${todo.completed && 'checked'} />
                    <label class="label">${todo.title}</label>
                    <button class="destroy" id=${todo.id}></button>
                </div>
                <input class="edit" value="${todo.title}" />
            </li>`;
  };

  viewAll = () => {
    this.todos.forEach((todo) => {
      this.$todoList.insertAdjacentHTML('beforeend', this.todoTemplate(todo));
    });
  };

  viewActive = () => {
    this.todos.forEach((todo) => {
      if (!todo.completed) {
        this.$todoList.insertAdjacentHTML('beforeend', this.todoTemplate(todo));
      }
    });
  };

  viewCompleted = () => {
    this.todos.forEach((todo) => {
      if (todo.completed) {
        this.$todoList.insertAdjacentHTML('beforeend', this.todoTemplate(todo));
      }
    });
  };

  updateTodoCount = () => {
    this.$count.innerHTML = this.$todoList.querySelectorAll('li').length;
  };

  loadTodo = (option = ALL) => {
    this.todos = JSON.parse(localStorage.getItem('todos')) ?? [];
    this.$todoList.innerHTML = '';

    switch (option) {
      case ALL:
        this.viewAll();
        break;
      case ACTIVE:
        this.viewActive();
        break;
      case COMPLETED:
        this.viewCompleted();
    }
    this.updateTodoCount();
  };
}

window.onload = () => {
  new App().loadTodo();
};
