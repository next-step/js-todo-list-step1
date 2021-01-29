import {
  activeEl,
  allEl,
  completedEl,
  toDoInput,
  todoListEl,
} from "./component/constant.js";
import {
  viewActiveClick,
  viewAllClick,
  viewCompletedClick,
} from "./component/todoFilter.js";
import { handleEdit } from "./component/todoEdit.js";
import {
  handleNewTodoSubmit,
  handleTodoItemClick,
} from "./component/todoList.js";

export function toDoApp() {
  allEl && allEl.addEventListener("click", viewAllClick);
  activeEl && activeEl.addEventListener("click", viewActiveClick);
  completedEl && completedEl.addEventListener("click", viewCompletedClick);
  toDoInput && toDoInput.addEventListener("change", handleNewTodoSubmit);
  todoListEl && todoListEl.addEventListener("click", handleTodoItemClick);
  todoListEl && todoListEl.addEventListener("dblclick", handleEdit);
}
