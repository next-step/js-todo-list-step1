import todosSubject from '../subjects/TodosSubject.js';
import todoCount from '../components/TodoCount.js';

class Filters {
  constructor() {
    this.showAllButton = document.querySelector('ul.filters a.all-selected');
    this.showActiveButton = document.querySelector('ul.filters a.active');
    this.showCompletedButton = document.querySelector('ul.filters a.completed');
    this.todos = document.querySelectorAll('ul#todo-list li');
  }

  init() {
    this.addEventShowActive();
    this.addEventShowAll();
    this.addEventShowCompleted();
  }

  addEventShowAll() {
    this.showAllButton.addEventListener('click', () => {
      todosSubject.rerender();
    });
  }

  showActive() {
    const todos = document.querySelectorAll('ul#todo-list li');
    todos.forEach((todo) => {
      if (todo.classList.contains('completed')) {
        todo.style.display = 'none';
      } else {
        todo.style.display = 'block';
      }
    });
    todoCount.render();
  }

  addEventShowActive() {
    this.showActiveButton.addEventListener('click', this.showActive);
  }

  showCompleted() {
    const todos = document.querySelectorAll('ul#todo-list li');

    todos.forEach((todo) => {
      if (todo.classList.contains('completed')) {
        todo.style.display = 'block';
      } else {
        todo.style.display = 'none';
      }
    });
    todoCount.render();
  }

  addEventShowCompleted() {
    this.showCompletedButton.addEventListener('click', this.showCompleted);
  }
}

const filters = new Filters();

export default filters;
