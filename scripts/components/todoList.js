import TodoItem from './todoItem.js';

class TodoList {
  constructor() {
    this.$todoList = document.querySelector('#todo-list');
  }

  init() {
    this.addEventCheckToggle();
  }

  addNewTodoItem(taskTitle) {
    this.$todoList.innerHTML += new TodoItem(taskTitle).render();
  }

  addEventCheckToggle() {
    this.$todoList.addEventListener('change', (e) => {
      const closestLi = e.target.closest('li');
      closestLi.classList.toggle('completed');
    });
  }
}

const $todoList = new TodoList();
$todoList.init();

export default $todoList;
