import {
  $newTodoTitle,
  $todoList,
  $todoCount,
  $filters,
} from '../components/dom.js';
import {
  addTodoItem,
  deleteItem,
  toggleCheckItem,
  doubleClickItem,
  filterItem,
  modifyItem,
} from '../store/store.js';
const addItems = (event) => {
  let contents = event.target.value;
  if (contents !== '' && event.key === 'Enter') {
    addTodoItem(contents);
    event.target.value = '';
  }
};

$newTodoTitle.addEventListener('keypress', addItems);
$todoList.addEventListener('click', deleteItem);
$todoList.addEventListener('click', toggleCheckItem);
$todoList.addEventListener('dblclick', doubleClickItem);
$filters.addEventListener('click', filterItem);
$todoList.addEventListener('keydown', modifyItem);
