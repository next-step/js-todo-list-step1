import { todoWriterService } from "/js/service/TodoWriterService.js";

function TodoWriterController() {
  this.todoWriterService = todoWriterService;

  const $newTodoTitle = document.getElementById("new-todo-title");

  const onKeyupTodoTitle = (event) => {
    if (event.key === "Enter") {
      const newItem = {
        id: generateUniqueIdFromDate(),
        title: $newTodoTitle.value,
        isDone: false,
      };
      this.todoWriterService.addNewItem(newItem, $newTodoTitle);
    }
  };

  function generateUniqueIdFromDate() {
    const date = new Date();
    return date.toLocaleDateString("en-us").replaceAll("/", "") +
      date.getHours() +
      date.getMinutes() +
      date.getSeconds() +
      date.getMilliseconds();
  }

  this.init = function () {
    $newTodoTitle.addEventListener("keyup", onKeyupTodoTitle);
  };
}

export const todoWriterController = new TodoWriterController();
