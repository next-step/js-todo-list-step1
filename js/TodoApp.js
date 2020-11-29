`use strict`;

import TodoList from './TodoList.js';
import TodoItem from './TodoItem.js';
import TodoInput from './TodoInput.js';
import TodoCount from './TodoCount.js';

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
  }
}

export default TodoApp;
