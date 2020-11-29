import { EVENT, KEY } from "../utils/constants.js";
import $store from "../store/index.js";

import TodoItem from "./TodoItem.js";

export default function TodoList(render) {
  const $list = document.querySelector(".todo-list");

  const handleEditingTodoSubmit = ({ target, key }) => {
    if (key !== KEY.SUBMIT) {
      return;
    }

    const todoId = parseInt(target.closest("li").id);
    $store.todo.editItem(todoId, target.value);
    render();
  };

  const handleEditingTodoCancel = ({ target, key }) => {
    if (key !== KEY.CANCEL) {
      return;
    }

    const todoId = parseInt(target.closest("li").id);
    const targetTodo = $store.todo.findItem(todoId);
    targetTodo.editing = false;
    render();
  };

  const handleTodoEdit = ({ target }) => {
    if (!target.classList.contains("label")) {
      return;
    }

    const todoId = parseInt(target.closest("li").id);
    const targetTodo = $store.todo.findItem(todoId);
    targetTodo.editing = true;
    render();
  };

  const handleTodoDelete = ({ target }) => {
    if (!target.classList.contains("destroy")) {
      return;
    }

    const todoId = parseInt(target.closest("li").id);
    $store.todo.deleteItem(todoId);
    render();
  };

  const handleTodoToggle = ({ target }) => {
    if (!target.classList.contains("toggle")) {
      return;
    }

    const todoId = parseInt(target.closest("li").id);
    $store.todo.toggleItem(todoId);
    render();
  };

  const renderTodoList = (todos) => {
    $list.innerHTML = todos.map(TodoItem).join("");
  };

  $list.addEventListener(EVENT.CLICK, handleTodoToggle);
  $list.addEventListener(EVENT.CLICK, handleTodoDelete);
  $list.addEventListener(EVENT.DBLCLICK, handleTodoEdit);
  $list.addEventListener(EVENT.KEYBOARD, handleEditingTodoCancel);
  $list.addEventListener(EVENT.KEYBOARD, handleEditingTodoSubmit);

  return { renderTodoList };
}
