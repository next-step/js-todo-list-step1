import { setTodoHandler } from "./store.js";
import { makeTodo } from "./todo.js";

const todoList = document.getElementById("todo-list");

const renderTodos = (data) => {
  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }
  R.pipe(
    R.values,
    R.map(makeTodo),
    R.forEach((todo) => todoList.insertBefore(todo, todoList.firstChild))
  )(data);
};

export const initTodos = () => {
  setTodoHandler("refresh", renderTodos);
};
