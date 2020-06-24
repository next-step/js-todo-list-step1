import TodoList from './TodoList.js';
import TodoInput from './TodoInput.js';
import TodoFilter from './TodoFilter.js';
import { defaultItem } from './util.js';
import { todoListTemplate } from './template.js';
import { FILTER_TYPE } from './constants.js';

function App() {
  this.todoList = [];
  this.activeList = [];
  this.completedList = [];
  this.mode = FILTER_TYPE.ALL;

  this.addTodo = value => {
    this.todoList = [defaultItem(value), ...this.todoList];
    this.render();
  };
  
  this.deleteTodo = id => {
    const index = this.findIndexById(id);
    this.todoList = [...this.todoList.slice(0, index), ...this.todoList.slice(index + 1)];
    this.render();
  };
  
  this.toggleTodo = id => {
    const index = this.findIndexById(id);
    this.todoList[index].completed = !this.todoList[index].completed;
    this.render();
  };
  
  this.toggleEditMode = id => {
    const index = this.findIndexById(id);
    this.todoList[index].editing = !this.todoList[index].editing;
    this.render();
  };
  
  this.editTodo = (id, value) => {
    const index = this.findIndexById(id);
    this.todoList[index].text = value;
    this.toggleEditMode(id);
    this.render();
  };
  
  this.findIndexById = id => {
    return this.todoList.findIndex(item => item.id === id);
  };

  this.filterTodo = mode => {
    this.mode = mode;
    this.render();
  }

  this.render = () => {
    const renderList = {
      [FILTER_TYPE.ALL]: this.todoList,
      [FILTER_TYPE.ACTIVE]: this.todoList.filter(item => !item.completed),
      [FILTER_TYPE.COMPLETED]: this.todoList.filter(item => item.completed),
    };
    
    this.TodoList.$ul.innerHTML = todoListTemplate(renderList[this.mode]);
    this.$todoCount.innerHTML = `총 <strong>${renderList[this.mode].length}</strong> 개`;

    localStorage.setItem('todo-list', JSON.stringify(this.todoList));
  };

  this.init = () => {
    const list = localStorage.getItem('todo-list');
    this.todoList = JSON.parse(list);
    this.render();
  }

  this.TodoList = new TodoList(document.getElementById('todo-list'), {
    deleteTodo: this.deleteTodo,
    toggleTodo: this.toggleTodo,
    toggleEditMode: this.toggleEditMode,
    editTodo: this.editTodo
  });
  this.TodoInput = new TodoInput(document.getElementById('new-todo-title'), {
    addTodo: this.addTodo
  });
  this.$todoCount = document.getElementsByClassName('todo-count')[0];
  this.TodoFilter = new TodoFilter(document.getElementsByClassName('filters')[0], {
    filterTodo: this.filterTodo
  });
}

const app = new App();
app.init();
