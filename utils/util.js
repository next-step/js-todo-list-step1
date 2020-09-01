import { TODOS } from "./data.js";

export function createUniqueID() {
  return Date.now();
}

export function getTodosFromLocalStorage() {
  try {
    const todos = localStorage.getItem(TODOS)
      ? JSON.parse(localStorage.getItem(TODOS))
      : [];
    return todos;
  } catch {}
}

export function setTodosLocalStorage(todoList) {
  localStorage.setItem(TODOS, JSON.stringify(todoList));
}
