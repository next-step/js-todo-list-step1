import TodoCount from './TodoCount.js';
import TodoList from './TodoList.js';
import TodoInput from './TodoInput.js';
import TodoFilter from './TodoFilter.js';
import {FilterOptions} from './constants.js';

function App() {
  const $todoInput = document.querySelector('#new-todo-title');
  const $todoList = document.querySelector('#todo-list');
  const $todoCount = document.querySelector('.todo-count');
  const $todoFilter = document.querySelector('.filters');
  this.data = [];
  this.filteredData = [];
  this.selected = 'all';

  this.addItem = (text) => {
    this.data.push({
      text: text,
      isCompleted: false,
    });

    this.filterItems(this.selected);
  };

  this.removeItem = (index) => {
    this.data.splice(index, 1);

    this.filterItems(this.selected);
  };

  this.editItem = (index, text) => {
      this.data[index].text = text;

      this.todoList.updateItem(this.data);
  }

  this.filterItems = (type) => {
    this.selected = type;

    if (type === FilterOptions.ALL.type) {
      this.filteredData = this.data;
    } else if (type ===  FilterOptions.ACTIVE.type) {
      this.filteredData = this.data.filter((item) => !item.isCompleted);
    } else if (type ===  FilterOptions.COMPLETED.type) {
      this.filteredData = this.data.filter((item) => item.isCompleted);
    }
    this.todoList.updateItem(this.filteredData);
    this.todoCount.render(this.filteredData.length);
  };

  this.todoList = new TodoList($todoList, this.data, {
    removeItem: (index) => this.removeItem(index),
    editItem: (index, text) => this.editItem(index, text)
  });
  this.todoInput = new TodoInput($todoInput, (text) => {
    this.addItem(text);
  });
  this.todoCount = new TodoCount($todoCount, this.data.length);
  this.todoFilter = new TodoFilter($todoFilter, this.data, this.selected, (type) => {
    this.filterItems(type);
  });
}

new App();
