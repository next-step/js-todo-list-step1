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
  this.activeFilterType = FilterOptions.ALL;

  this.addItem = (text) => {
    this.data.push({
      text: text,
      isCompleted: false,
    });

    this.filterItems(this.activeFilterType);
  };

  this.removeItem = (filteredIndex) => {
    const item = this.getFilteredItem()[filteredIndex];
    const index = this.data.findIndex((v) => v === item);
    this.data.splice(index, 1);
    this.filterItems(this.activeFilterType);
  };

  this.editItem = (filteredIndex, text) => {
    const item = this.getFilteredItem()[filteredIndex];
    const index = this.data.findIndex((v) => v === item);
    this.data[index].text = text;
    this.filterItems(this.activeFilterType);
  };

  this.filterItems = (type) => {
    this.activeFilterType = type;
    this.todoList.updateItem(this.getFilteredItem());
    this.todoCount.render(this.getFilteredItem().length);
  };

  this.getFilteredItem = () =>
    this.data.filter(({isCompleted}) =>
      (this.activeFilterType === FilterOptions.ALL) ||
      (this.activeFilterType === FilterOptions.COMPLETED && isCompleted) ||
      (this.activeFilterType === FilterOptions.ACTIVE && !isCompleted));

  this.todoList = new TodoList($todoList, this.data, {
    removeItem: (index) => this.removeItem(index),
    editItem: (index, text) => this.editItem(index, text),
  });
  this.todoInput = new TodoInput($todoInput, (text) => {
    this.addItem(text);
  });
  this.todoCount = new TodoCount($todoCount, this.data.length);
  this.todoFilter = new TodoFilter($todoFilter, this.data, this.activeFilterType, (type) => {
    this.filterItems(type);
  });
}

new App();
