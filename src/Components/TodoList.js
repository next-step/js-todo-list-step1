import { makeLists } from "../utils/element-utils.js";

const setListCount = todos => {
  const todoCount = document.querySelector(".todo-count");
  const count = todoCount.querySelector("strong");

  count.innerHTML = todos.length;
};

const targetEvent = (target, func) => {
  const {
    dataset: { index }
  } = target.parentElement;

  const targetId = parseInt(index, 10);

  func(targetId);
};

export default ({ todos, removeTodoItem, toggleTodoItem, updateTodoItem }) => {
  const list = document.getElementById("todo-list");

  const onDestroy = ({ target }) => {
    targetEvent(target, removeTodoItem);
  };

  const onToggle = ({ target }) => {
    targetEvent(target, toggleTodoItem);
  };

  const editTodo = ({ target }) => {
    const targetId = parseInt(target.dataset.index, 10);
    const targetValue = target.value;

    updateTodoItem(targetId, targetValue);
  };

  const cancelInput = ({ target }) => {
    const parent = target.parentNode;

    parent.classList.remove("editing");
  };

  const keyHandler = {
    Enter: editTodo,
    Escape: cancelInput
  };

  const EditListener = e => {
    const handler = keyHandler[e.key];

    if (handler) {
      handler(e);
    }
  };

  list.innerHTML = "";

  todos
    .map(todo => makeLists({ ...todo, onDestroy, onToggle, EditListener }))
    .forEach(item => list.insertBefore(item, list.firstChild));

  setListCount(todos);
};
