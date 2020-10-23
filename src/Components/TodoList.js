import { makeLists } from "../utils/element-utils.js";

const setListCount = todos => {
  const todoCount = document.querySelector(".todo-count");
  const count = todoCount.querySelector("strong");

  count.innerHTML = todos.length;
};

export default ({ todos, onDestroy, onToggle, onEdit }) => {
  const list = document.getElementById("todo-list");

  const cancelInput = ({ target }) => {
    const parent = target.parentNode;
    parent.classList.remove("editing");
  };

  const keyHandler = {
    Enter: onEdit,
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
