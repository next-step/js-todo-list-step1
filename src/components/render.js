import { $newTodoTitle, $todoList, $todoCount, $filters } from './dom.js';
import todoList from '../components/todoList.js';
import getCount from '../components/getCount.js';
const render = ({ todoItem, option }) => {
  $todoList.innerHTML = todoList(todoItem, option);
  $todoCount.innerHTML = getCount(todoItem);
};

export default render;
