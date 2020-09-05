import TodoCount from './TodoCount.js';
import TodoList from './TodoList.js';
import TodoInput from './TodoInput.js';

function App() {
  const $todoInput = document.querySelector('#new-todo-title');
  const $todoList = document.querySelector('#todo-list');
  const $todoCount = document.querySelector('.todo-count');
  this.data = [];

  this.addItem = (text) => {
    this.data.push({
      text,
      isCompleted: false,
    });

    this.todoList.updateItem(this.data);
    this.todoCount.render(this.data.length);
  };

  this.removeItem = (index) => {
    this.data.splice(index, 1);

    this.todoList.updateItem(this.data);
    this.todoCount.render(this.data.length);
  };

  this.todoList = new TodoList($todoList, this.data, (index) => {
    this.removeItem(index);
  });
  this.todoInput = new TodoInput($todoInput, (text) => {
    this.addItem(text);
  });
  this.todoCount = new TodoCount($todoCount, this.data.length);
}

new App();
