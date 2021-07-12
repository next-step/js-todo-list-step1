import { ACTIVE, ALL, COMPLETED, TODOS } from '../constants.js';
import TodoCount from './TodoCount.js';
import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';

function TodoItem(value) {
  this.id = Date.now().toString();
  this.value = value;
  this.isCompleted = false;
}

export default function TodoApp() {
  this.todoItems = [];
  this.filterStatus = ALL;

  this.getFilteredTodoItems = () => {
    if (this.filterStatus === ALL) return this.todoItems;
    if (this.filterStatus === ACTIVE) {
      return this.todoItems.filter((item) => !item.isCompleted);
    }
    if (this.filterStatus === COMPLETED) {
      return this.todoItems.filter((item) => item.isCompleted);
    }
  };

  this.setTodoItemsToLocalStorage = () => {
    localStorage.setItem(TODOS, JSON.stringify(this.todoItems));
  };

  this.loadTodoItems = () => {
    const prevTodoItems = JSON.parse(localStorage.getItem(TODOS));
    this.todoItems = prevTodoItems ? prevTodoItems : [];
    const prevFilterStatus = window.location.hash.replace(/#/, '');
    if (prevFilterStatus === '') return;
    this.filterStatus = prevFilterStatus;
  };

  this.render = () => {
    const filteredTodoItems = this.getFilteredTodoItems();
    todoList.render(filteredTodoItems);
    todoCount.render(filteredTodoItems.length);
  };

  const todoCount = new TodoCount({
    onFilter: (status) => {
      this.filterStatus = status;
      this.render();
    },
  });

  const todoList = new TodoList({
    onToggle: (id) => {
      const todoItem = this.todoItems.find((item) => item.id === id);
      todoItem.isCompleted = !todoItem.isCompleted;
      this.render();
      this.setTodoItemsToLocalStorage();
    },
    onRemove: (id) => {
      this.todoItems = this.todoItems.filter((item) => item.id !== id);
      todoCount.render(this.todoItems.length);
      this.setTodoItemsToLocalStorage();
    },
    onUpdate: (id, value) => {
      const todoItem = this.todoItems.find((item) => item.id === id);
      todoItem.value = value;
      this.setTodoItemsToLocalStorage();
    },
  });

  new TodoInput({
    onAdd: (value) => {
      const newTodoItem = new TodoItem(value);
      this.todoItems.push(newTodoItem);
      this.render();
      this.setTodoItemsToLocalStorage();
    },
  });

  this.loadTodoItems();
  this.render();
  todoCount.initFilterButtonStatus();
}
