import { todoAppService } from "/js/service/TodoListService.js";

function TodoController() {
  let id = 0;
  const $newTodoTitle = document.getElementById("new-todo-title");
  const $todoList = document.getElementById("todo-list");

  this.todoAppService = todoAppService;

  const onKeyupTodoTitle = (event) => {
    if (event.key === "Enter") {
      const newItem = {
        id: ++id,
        title: $newTodoTitle.value,
        isDone: false,
      };
      this.todoAppService.addNewItem(newItem);
    }
  };

  const onClickTodoList = ({ target }) => {
    const $todoItem = target.closest(".todo-item");
    if (isToggleButton(target)) {
      this.todoAppService.toggle($todoItem);
      return;
    }
    if (isDestroyButton(target)) {
      this.todoAppService.destroy($todoItem);
      return;
    }
    if (isNotComplete(target)) {
      this.todoAppService.onEdit($todoItem);
    }
  };

  function isToggleButton(target) {
    return target.classList.contains("toggle");
  }

  function isDestroyButton(target) {
    return target.classList.contains("destroy");
  }

  function isNotComplete(target) {
    const $todoItem = target.closest(".todo-item");
    return !$todoItem.classList.contains("completed");
  }

  const onKeyupTodoItem = (event) => {
    if (event.key === "Enter") {
      edit(event);
      return;
    }

    if (event.key === "Escape") {
      offEdit(event)
    }
  };

  const edit = (event) => {
    const $todoItem = event.target.closest(".todo-item");
    const title = event.target.value;
    this.todoAppService.edit($todoItem.dataset.id, title);
  };

  const offEdit = (event) => {
    const $todoItem = event.target.closest(".todo-item");

  };

  this.clear = function () {
    $newTodoTitle.value = "";
  };

  this.init = function () {
    $newTodoTitle.addEventListener("keyup", onKeyupTodoTitle);
    $todoList.addEventListener("dblclick", onClickTodoList);
    $todoList.addEventListener("keyup", onKeyupTodoItem);
  };
}

export const todoController = new TodoController();
