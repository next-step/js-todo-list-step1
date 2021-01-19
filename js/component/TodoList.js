import $store from "../store/index.js";

import { EVENT, KEY } from "../utils/constants.js";
import { todoTemplate } from "../utils/templates.js";

export default function TodoList() {
  const $list = document.querySelector(".todo-list");

  const findTargetId = (target) => {
    return parseInt(target.closest("li").dataset.id);
  };

  const handleEditingTodoSubmit = ({ target, key }) => {
    if (key !== KEY.SUBMIT) {
      return;
    }

    const text = target.value.trim();
    if (text === "") {
      return;
    }

    const todoId = findTargetId(target);
    $store.todo.editItem(todoId, text);
  };

  const handleEditingTodoCancel = ({ target, key }) => {
    if (key !== KEY.CANCEL) {
      return;
    }

    const todoId = findTargetId(target);
    const targetTodo = $store.todo.findItem(todoId);
    targetTodo.editing = false;
  };

  const handleTodoEdit = ({ target }) => {
    if (!target.classList.contains("label")) {
      return;
    }

    const todoId = findTargetId(target);
    const targetTodo = $store.todo.findItem(todoId);
    targetTodo.editing = true;
    render();
  };

  const handleTodoDelete = ({ target }) => {
    if (!target.classList.contains("destroy")) {
      return;
    }

    const todoId = findTargetId(target);
    $store.todo.deleteItem(todoId);
  };

  const handleTodoToggle = ({ target }) => {
    if (!target.classList.contains("toggle")) {
      return;
    }

    const todoId = findTargetId(target);
    $store.todo.toggleItem(todoId);
  };

  const renderTodoList = () => {
    const todos = $store.todo.filterItems();
    $list.innerHTML = todos.map(todoTemplate).join("");
  };

  $list.addEventListener(EVENT.CLICK, handleTodoToggle);
  $list.addEventListener(EVENT.CLICK, handleTodoDelete);
  $list.addEventListener(EVENT.DBLCLICK, handleTodoEdit);
  $list.addEventListener(EVENT.KEYDOWN, handleEditingTodoCancel);
  $list.addEventListener(EVENT.KEYPRESS, handleEditingTodoSubmit);

  return { renderTodoList };
}
