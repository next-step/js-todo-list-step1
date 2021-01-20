import TodoItem from './todoItem.js';

class TodoList {
  constructor() {
    this.$todoList = document.querySelector('#todo-list');
  }

  addNewTodoItem(taskTitle) {
    this.$todoList.innerHTML += new TodoItem(taskTitle).render();
  }
}

const $todoList = new TodoList();

export default $todoList;
