import $store from "../store/index.js";

import { EVENT, KEY } from "../utils/constants.js";

export default function TodoInput(render) {
  const $input = document.querySelector(".new-todo");

  const createTodoItem = (text) => {
    return {
      id: $store.todo.getNewId(),
      text: text,
      completed: false,
      editing: false,
    };
  };

  const addTodo = (text) => {
    const newTodo = createTodoItem(text);
    $store.todo.addItem(newTodo);
    render();
  };

  const handleTodoSubmit = ({ target, key }) => {
    if (key !== KEY.SUBMIT) {
      return;
    }

    const text = target.value.trim();
    if (text === "") {
      return;
    }
    addTodo(text);
    target.value = "";
  };

  $input.addEventListener(EVENT.KEYDOWN, handleTodoSubmit);
}
