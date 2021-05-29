import { $newTodoTitle, $todoList, $todoCount, $filters } from './dom.js';
import todoList from '../components/todoList.js';
const render = ({ todoItem, option }) => {
  $todoList.innerHTML = todoList(todoItem, option);
};

export default render;
