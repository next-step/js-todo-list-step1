import { EVENT, KEY } from "../utils/constants.js";
import $store from "../store/index.js";

import TodoItem from "./TodoItem.js";

export default function TodoList(render) {
  const $list = document.querySelector(".todo-list");

  const handleEditingTodoSubmit = (e) => {
    if (e.key !== KEY.SUBMIT) {
      return;
    }

    const todoId = parseInt(e.target.closest("li").id);
    $store.todo.editItem(todoId, e.target.value);
    render();
  };

  const handleEditingTodoCancel = (e) => {
    if (e.key !== KEY.CANCEL) {
      return;
    }

    const todoId = parseInt(e.target.closest("li").id);
    const targetTodo = $store.todo.findItem(todoId);
    targetTodo.editing = false;
    render();
  };

  const handleTodoEdit = (e) => {
    if (!e.target.classList.contains("label")) {
      return;
    }

    const todoId = parseInt(e.target.closest("li").id);
    const targetTodo = $store.todo.findItem(todoId);
    targetTodo.editing = true;
    render();
  };

  const handleTodoDelete = (e) => {
    if (!e.target.classList.contains("destroy")) {
      return;
    }

    const todoId = parseInt(e.target.closest("li").id);
    $store.todo.deleteItem(todoId);
    render();
  };

  const handleTodoToggle = (e) => {
    if (!e.target.classList.contains("toggle")) {
      return;
    }

    const todoId = parseInt(e.target.closest("li").id);
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
