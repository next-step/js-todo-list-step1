import { ALL, ACTIVE, COMPLETED } from './constant/state.js';

export default class App {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem('todos')) ?? [];

    this.selected = ALL;
    this.$todoList = document.querySelector('#todo-list');
    this.$newTodoTitle = document.querySelector('#new-todo-title');
    this.$count = document.querySelector('strong');
    this.$filters = document.querySelector('.filters');

    this.$newTodoTitle.addEventListener('keyup', this.addTodo);
    this.$todoList.addEventListener('dblclick', this.editTodo);
    this.$todoList.addEventListener('click', this.changeTodo);
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

  addTodo = ({ target, key }) => {
    if (key === 'Enter' && target.value) {
      this.todos.push({
        id: String(Date.now()),
        title: target.value,
        completed: false,
      });
      target.value = '';
      localStorage.setItem('todos', JSON.stringify(this.todos));
      this.loadTodo();
    }
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

  changeTodo = ({ target }) => {
    if (target.className === 'toggle') {
      this.todos.map((todo) => {
        if (todo.id === target.id) {
          todo.completed = !todo.completed;
        }
      });
      localStorage.setItem('todos', JSON.stringify(this.todos));
      this.loadTodo();
    } else if (target.className === 'destroy') {
      this.todos = this.todos.filter((todo) => {
        if (todo.id !== target.id) {
          return todo;
        }
      });
      localStorage.setItem('todos', JSON.stringify(this.todos));
      this.loadTodo();
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
