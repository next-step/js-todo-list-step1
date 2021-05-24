import { TODO_LISTS } from "./constants.js";

function getTodoItems() {
  const todoItems = localStorage.getItem(TODO_LISTS);

  if (!todoItems) {
    return [];
  }

  return JSON.parse(todoItems);
}

function setTodoItems(items) {
  localStorage.setItem(TODO_LISTS, JSON.stringify(items));
}

export { getTodoItems, setTodoItems };
