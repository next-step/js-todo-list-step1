'use strict';

import * as Utils from './utils.js';
import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import TodoFilter from './TodoFilter.js';
export default class TodoApp {
  constructor() {
    this.todoInput = new TodoInput();
    this.todoList = new TodoList();
    this.todoFilter = new TodoFilter();
    this.todoList.load();
    this.todoInput.setKeyUpListener(event => {
      const text = event.target.value;
      const id = Utils.uuid();
      this.todoList.addNewItem(text, id);
      this.todoList.render();
      this.todoList.save();
    });
    this.todoFilter.setClickListener(event => {
      const targetBtn = event.target;
      this.todoList.filterOption = targetBtn.classList[0];
      this.todoList.render();
    });
  }
}
