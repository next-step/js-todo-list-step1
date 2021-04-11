/* eslint-disable import/extensions */
import { count, filters, todoList, newTodoTitle } from './constant.js';

function handleKeyup(event) {
  if (event.keyCode === 13) {
    // save
  } else {
    // ignore
  }
}

function init() {
  // loading

  // eventHandler
  newTodoTitle.addEventListener('keyup', handleKeyup);
}

init();
