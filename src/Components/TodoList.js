import { createListItem } from "../utils/element-utils.js";

const setListCount = todos => {
  const todoCount = document.querySelector(".todo-count");
  const count = todoCount.querySelector("strong");

  count.innerHTML = todos.length;
};

export default ({ todos, removeTodoItem, toggleTodoItem }) => {
  const list = document.getElementById("todo-list");

  const onDestroy = ({ target }) => {
    const {
      dataset: { index }
    } = target.parentElement;

    const targetId = parseInt(index, 10);

    removeTodoItem(targetId);
  };

  const onToggle = ({ target }) => {
    const {
      dataset: { index }
    } = target.parentElement;

    const targetId = parseInt(index, 10);

    toggleTodoItem(targetId);
  };

  list.innerHTML = "";

  todos
    .map(todo => createListItem({ ...todo, onDestroy, onToggle }))
    .forEach(item => list.insertBefore(item, list.firstChild));

  setListCount(todos);
};
