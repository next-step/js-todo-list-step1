import { setTodoHandler } from "./store.js";
import { makeTodo } from "./todo.js";

const todoList = document.getElementById("todo-list");

const removeAllChildren = () => {
  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }
};

const addTodo = (todo) => todoList.appendChild(todo);

const renderTodos = R.pipe(
  R.tap(removeAllChildren),
  R.values,
  R.reverse,
  R.map(makeTodo),
  R.forEach(addTodo)
);

export const initTodos = () => setTodoHandler("refresh", renderTodos);
