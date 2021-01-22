import AddTodo from './components/AddTodo.js';
import ChangeTodo from './components/ChangeTodo.js';
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

    this.$todoList.addEventListener('dblclick', this.editTodo);
    this.$filters.addEventListener('click', this.filterTodo);
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
    console.log('init');

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

  editTodo = ({ target }) => {
    const updatedTodoItem = (id, value) => {
      this.todos.map((todo) => {
        if (todo.id === id) {
          todo.title = value;
        }
      });
      localStorage.setItem('todos', JSON.stringify(this.todos));
      this.loadTodo();
    };

    const edit = ({ target, key }) => {
      if (key === 'Enter') {
        updatedTodoItem(target.closest('li').id, target.value);
      } else if (key === 'Escape') {
        target.closest('li').classList.remove('editing');
      }
    };

    if (target.className === 'label') {
      target.closest('li').classList.add('editing');
      target.closest('li').addEventListener('keyup', edit);
    }
  };

  filterTodo = ({ target }) => {
    if (target.nodeName === 'A') {
      target
        .closest('ul')
        .querySelectorAll('a')
        .forEach((target) => target.classList.remove('selected'));
      target.classList.add('selected');
      this.loadTodo(target.id);
    }
  };
}

window.onload = () => {
  new App().loadTodo();
};
