/* @jsx createElement */
import { createElement } from '../lib/React.js';
import { useSelector } from '../lib/Redux.js';
import TodoListItem from './TodoListItem.js';

const TodoList = () => {
  const {
    type,
    todos
  } = useSelector();
  return createElement("ul", {
    id: "todo-list",
    className: "todo-list"
  }, todos.filter(todo => {
    if (type === 'all') return true;
    if (type === 'todo') return !todo.done;
    if (type === 'completed') return todo.done;
  }).map(todo => createElement(TodoListItem, {
    key: todo.id,
    todo: todo
  })));
};

export default TodoList;