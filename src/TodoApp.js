'use strict';

import * as Utils from './utils.js';
import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import TodoFilter from './TodoFilter.js';

const todoInput = new TodoInput();
const todoList = new TodoList();
const todoFilter = new TodoFilter();

const init = () => {
  todoList.load();
  todoInput.setKeyUpListener(event => {
    const text = event.target.value;
    const id = Utils.uuid();
    todoList.addNewItem(text, id);
    todoList.render();
    todoList.save();
  });
  todoFilter.setClickListener(event => {
    const targetBtn = event.target;
    todoList.filterOption = targetBtn.classList[0];
    todoList.render();
  });
};

init();
