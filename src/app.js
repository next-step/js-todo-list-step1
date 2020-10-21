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

  this.state = localStorage['state'] !== 'undefined'?
  JSON.parse(localStorage.getItem('state')) :
  {
    data: [],
    activeFilterType: FilterOptions.ALL,
  };

  this.addItem = (text) => {
    this.state.data.push({
      text: text,
      isCompleted: false,
    });

    this.filterItems(this.state.activeFilterType);
  };

  this.removeItem = (filteredIndex) => {
    const item = this.getFilteredItem()[filteredIndex];
    const index = this.state.data.findIndex((v) => v === item);
    this.state.data.splice(index, 1);
    this.filterItems(this.state.activeFilterType);
  };

  this.editItem = (filteredIndex, text) => {
    const item = this.getFilteredItem()[filteredIndex];
    const index = this.state.data.findIndex((v) => v === item);
    this.state.data[index].text = text;
    this.filterItems(this.state.activeFilterType);
  };

  this.filterItems = (type) => {
    this.state.activeFilterType = type;
    this.todoList.updateItem(this.getFilteredItem());
    this.todoCount.render(this.getFilteredItem().length);

    this.storeData();
  };

  this.getFilteredItem = () =>
    this.state.data.filter(({isCompleted}) =>
      (this.state.activeFilterType === FilterOptions.ALL) ||
      (this.state.activeFilterType === FilterOptions.COMPLETED && isCompleted) ||
      (this.state.activeFilterType === FilterOptions.ACTIVE && !isCompleted));

  this.storeData = () => localStorage.setItem('state', JSON.stringify(this.state));

  this.todoList = new TodoList($todoList, this.state.data, {
    removeItem: (index) => this.removeItem(index),
    editItem: (index, text) => this.editItem(index, text),
  });
  this.todoInput = new TodoInput($todoInput, (text) => {
    this.addItem(text);
  });
  this.todoCount = new TodoCount($todoCount, this.state.data.length);
  this.todoFilter = new TodoFilter($todoFilter, this.state, (type) => {
    this.filterItems(type);
  });

  this.filterItems(this.state.activeFilterType);
}

new App();
