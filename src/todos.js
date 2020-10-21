import { setTodoHandler } from "./store.js";
import { makeTodo } from "./todo.js";

const todoList = document.getElementById("todo-list");

const addTodo = (data) => {
  const todo = makeTodo(data);
  todoList.insertBefore(todo, todoList.firstChild);
};

export const initTodos = () => {
  setTodoHandler("add", addTodo);
};
