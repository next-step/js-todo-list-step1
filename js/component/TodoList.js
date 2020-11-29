import { EVENT, KEY } from "../utils/constants.js";
import $store from "../store/index.js";

function createTodoItem({ id, text, completed, editing }) {
  const classList = [completed ? "completed" : "", editing ? "editing" : ""]
    .join(" ")
    .trim();

  return `
    <li
      class="${classList}"
      data-id=${id}
    >
      <div class="view">
        <input class="toggle" type="checkbox" ${completed ? "checked" : ""}/>
        <label class="label">${text}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="${text}" />
    </li>
  `;
}

export default function TodoList(render) {
  const $list = document.querySelector(".todo-list");

  const findTargetId = (target) => {
    return parseInt(target.closest("li").dataset.id);
  };

  const handleEditingTodoSubmit = ({ target, key }) => {
    if (key !== KEY.SUBMIT) {
      return;
    }

    const todoId = findTargetId(target);
    $store.todo.editItem(todoId, target.value);
    render();
  };

  const handleEditingTodoCancel = ({ target, key }) => {
    if (key !== KEY.CANCEL) {
      return;
    }

    const todoId = findTargetId(target);
    const targetTodo = $store.todo.findItem(todoId);
    targetTodo.editing = false;
    render();
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
    render();
  };

  const handleTodoToggle = ({ target }) => {
    if (!target.classList.contains("toggle")) {
      return;
    }

    const todoId = findTargetId(target);
    $store.todo.toggleItem(todoId);
    render();
  };

  const renderTodoList = () => {
    const todos = $store.todo.filterItems();
    $list.innerHTML = todos.map(createTodoItem).join("");
  };

  $list.addEventListener(EVENT.CLICK, handleTodoToggle);
  $list.addEventListener(EVENT.CLICK, handleTodoDelete);
  $list.addEventListener(EVENT.DBLCLICK, handleTodoEdit);
  $list.addEventListener(EVENT.KEYBOARD, handleEditingTodoCancel);
  $list.addEventListener(EVENT.KEYBOARD, handleEditingTodoSubmit);

  return { renderTodoList };
}
