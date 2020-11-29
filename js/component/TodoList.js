import { KEY } from "../constants.js";
import todo from "../todo.js";

const TODO_TEMPLATE = ({ id, text, completed, editing }) => `
<li
  class="${completed ? "completed" : ""} ${editing ? "editing" : ""}"
  id=${id}
>
  <div class="view">
    <input class="toggle" type="checkbox" ${completed ? "checked" : ""}/>
    <label class="label">${text}</label>
    <button class="destroy"></button>
  </div>
  <input class="edit" value="${text}" />
</li>
`;

export default function TodoList(render) {
  const $list = document.querySelector(".todo-list");

  const handleEditingTodoSubmit = (e) => {
    if (e.key !== KEY.SUBMIT) {
      return;
    }

    const todoId = parseInt(e.target.closest("li").id);
    todo.editItem(todoId, e.target.value);
    render();
  };

  const handleEditingTodoCancel = (e) => {
    if (e.key !== KEY.CANCEL) {
      return;
    }

    const todoId = parseInt(e.target.closest("li").id);
    const targetTodo = todo.findItem(todoId);
    targetTodo.editing = false;
    render();
  };

  const handleTodoEdit = (e) => {
    if (!e.target.classList.contains("label")) {
      return;
    }

    const todoId = parseInt(e.target.closest("li").id);
    const targetTodo = todo.findItem(todoId);
    targetTodo.editing = true;
    render();
  };

  const handleTodoDelete = (e) => {
    if (!e.target.classList.contains("destroy")) {
      return;
    }

    const todoId = parseInt(e.target.closest("li").id);
    todo.deleteItem(todoId);
    render();
  };

  const handleTodoToggle = (e) => {
    if (!e.target.classList.contains("toggle")) {
      return;
    }

    const todoId = parseInt(e.target.closest("li").id);
    todo.toggleItem(todoId);
    render();
  };

  const renderTodoList = (todos) => {
    $list.innerHTML = todos.map(TODO_TEMPLATE).join("");
  };

  $list.addEventListener("click", handleTodoToggle);
  $list.addEventListener("click", handleTodoDelete);
  $list.addEventListener("dblclick", handleTodoEdit);
  $list.addEventListener("keydown", handleEditingTodoCancel);
  $list.addEventListener("keydown", handleEditingTodoSubmit);

  return { renderTodoList };
}
