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

    this.addTodo = new AddTodo(this.$newTodoTitle, { loadTodo: this.loadTodo });
    this.changeTodo = new ChangeTodo(this.$todoList, {
      loadTodo: this.loadTodo,
    });
    this.editTodo = new EditTodo(this.$todoList, { loadTodo: this.loadTodo });
    this.filterTodo = new FilterTodo(this.$filters, {
      loadTodo: this.loadTodo,
    });
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

  loadTodo = (option = ALL) => {
    this.todos = JSON.parse(localStorage.getItem('todos')) ?? [];
    this.$todoList.innerHTML = '';
    if (option === ALL) {
      this.todos.forEach((todo) => {
        this.$todoList.insertAdjacentHTML('beforeend', this.todoTemplate(todo));
      });
    } else if (option === ACTIVE) {
      this.todos.forEach((todo) => {
        if (!todo.completed) {
          this.$todoList.insertAdjacentHTML(
            'beforeend',
            this.todoTemplate(todo),
          );
        }
      });
    } else if (option === COMPLETED) {
      this.todos.forEach((todo) => {
        if (todo.completed) {
          this.$todoList.insertAdjacentHTML(
            'beforeend',
            this.todoTemplate(todo),
          );
        }
      });
    }
    this.$count.innerHTML = this.$todoList.querySelectorAll('li').length;
  };
}

window.onload = () => {
  new App().loadTodo();
};
