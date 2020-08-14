import { isValidTodoItems } from "./utils.js";

const TODO_LOCAL_STORAGE_KEY = "todo-localstorage-key";

export const fetchTodoItmesFromLocalStorage = () => {
  try {
    const todoItems = JSON.parse(localStorage.getItem(TODO_LOCAL_STORAGE_KEY));
    return todoItems || [];
  } catch (error) {
    throw Error("Fetch failted : ", error.message);
  }
};

export const saveTodoItmes2LocalStorage = (todoItems) => {
  try {
    if (!isValidTodoItems(todoItems)) {
      throw Error("wrong data");
    }
    localStorage.setItem(TODO_LOCAL_STORAGE_KEY, JSON.stringify(todoItems));
  } catch (error) {
    throw Error("Save failted : ", error.message);
  }
};
