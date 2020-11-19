import { addTodo } from "./store.js";

const inputToDo = document.getElementById("new-todo-title");

const resetInput = () => (inputToDo.value = "");

const startAddTodo = () => {
  const text = R.trim(inputToDo.value);
  resetInput();
  if (!R.length(text)) {
    return;
  }
  addTodo(text);
};

const handlers = {
  Enter: startAddTodo,
};

const listener = (e) => {
  const handler = handlers[e.key];
  if (handler) {
    handler();
  }
};

export const initInput = () => inputToDo.addEventListener("keypress", listener);
