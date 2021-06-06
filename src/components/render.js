import { $newTodoTitle, $todoList, $todoCount, $filters } from './dom.js';
import todoList from '../components/todoList.js';
import getCount from '../utils/getCount.js';
import getFilter from '../components/getFilter.js';
const render = ({ todoItem, option }) => {
  $todoList.innerHTML = todoList(todoItem, option);
  $todoCount.innerHTML = `<span class="todo-count">
  총 <strong>${getCount(todoItem)}</strong>개 </span>`;
  $filters.innerHTML = getFilter(option);
};

export default render;
