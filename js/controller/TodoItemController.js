import { todoItemService } from "/js/service/TodoItemService.js";

function TodoItemController() {
  this.todoAppService = todoItemService;

  const $todoList = document.getElementById("todo-list");

  const onClickTodoList = ({ target }) => {
    const $todoItem = findItem(target);
    if (isToggleButton(target)) {
      this.todoAppService.toggle($todoItem);
      return;
    }
    if (isDestroyButton(target)) {
      this.todoAppService.destroy($todoItem);
    }
  };

  function findItem(target) {
    return target.closest(".todo-item");
  }

  function isToggleButton(target) {
    return target.classList.contains("toggle");
  }

  function isDestroyButton(target) {
    return target.classList.contains("destroy");
  }

  const onDoubleClickTodoList = ({ target }) => {
    if (isToggleButton(target)) {
      return;
    }

    const $todoItem = findItem(target);
    if (isNotComplete(target)) {
      this.todoAppService.onEdit($todoItem);
    }
  };

  function isNotComplete(target) {
    const $todoItem = findItem(target);
    return !$todoItem.classList.contains("completed");
  }

  const onKeyupTodoItem = (event) => {
    if (event.key === "Enter") {
      edit(event);
      return;
    }

    if (event.key === "Escape") {
      offEdit(event);
    }
  };

  const edit = (event) => {
    const $todoItem = event.target.closest(".todo-item");
    const title = event.target.value;
    this.todoAppService.edit($todoItem.dataset.id, title);
  };

  const offEdit = (event) => {
    const $todoItem = event.target.closest(".todo-item");
    $todoItem.classList.remove("editing");
  };

  this.init = function () {
    $todoList.addEventListener("click", onClickTodoList);
    $todoList.addEventListener("dblclick", onDoubleClickTodoList);
    $todoList.addEventListener("keyup", onKeyupTodoItem);
  };
}

export const todoItemController = new TodoItemController();
