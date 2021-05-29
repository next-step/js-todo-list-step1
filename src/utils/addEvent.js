import {
  $newTodoTitle,
  $todoList,
  $todoCount,
  $filters,
} from '../components/dom.js';
import { addTodoItem } from '../store/store.js';
const addItems = (event) => {
  let contents = event.target.value;
  if (contents !== '' && event.key === 'Enter') {
    addTodoItem(contents);
    event.target.value = '';
  }
};

$newTodoTitle.addEventListener('keypress', addItems);
