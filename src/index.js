import { addTodoItem } from './todoList/addTodoItem.js';
import { setTodoItem } from './todoList/setTodoItem.js';

const todoApp = () => {
  addTodoItem();
  setTodoItem();
};

todoApp();
