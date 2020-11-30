`use strict`;

import TodoList from './TodoList.js';
import TodoItem from './TodoItem.js';
import TodoInput from './TodoInput.js';
import TodoCount from './TodoCount.js';
import TodoFilters from './TodoFilters.js';

class TodoApp {
  constructor() {
    this.todoItems = [];

    this.todoList = new TodoList();

    let todoInputKeyUp = (value) => {
      let i = this.todoItems.length;
      let todoItem = new TodoItem(i, i);
      const item = todoItem.createItem(value);

      this.todoList.addItem(item);
      this.todoItems.push(todoItem);
      TodoCount.update(this.todoList.$todoList.childElementCount);
    };
    this.todoInput = new TodoInput(todoInputKeyUp);
    this.todoFilters = new TodoFilters();

    window.addEventListener('hashchange', this.onHashChange.bind(this));
  }

  onHashChange() {
    console.log('this.todoItems', this.todoItems);
    if (location.hash === '' || location.hash === '#') {
      for (const todoItem of this.todoItems) {
        todoItem.$item.classList.remove('hidden');
      }
    } else if (location.hash === '#active') {
      for (const todoItem of this.todoItems) {
        if (todoItem.isCompleted()) {
          todoItem.$item.classList.add('hidden');
        } else {
          todoItem.$item.classList.remove('hidden');
        }
      }
    } else if (location.hash === '#completed') {
      for (const todoItem of this.todoItems) {
        if (todoItem.isCompleted()) {
          todoItem.$item.classList.remove('hidden');
        } else {
          todoItem.$item.classList.add('hidden');
        }
      }
    }
  }
}

export default TodoApp;
