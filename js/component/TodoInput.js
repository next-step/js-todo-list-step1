import { KEY } from "../constants.js";
import todo from "../todo.js";

export default function TodoInput(render) {
  const $input = document.querySelector(".new-todo");

  const createTodoItem = (text) => {
    return {
      id: todo.getNewId(),
      text: text,
      completed: false,
      editing: false,
    };
  };

  const addTodo = (text) => {
    const newTodo = createTodoItem(text);
    todo.addItem(newTodo);
    render();
  };

  const handleTodoSubmit = (e) => {
    if (e.key !== KEY.SUBMIT) return;

    const text = $input.value;
    if (text === "") {
      return;
    }
    addTodo(text);
    $input.value = "";
  };

  const init = () => {
    $input.addEventListener("keypress", handleTodoSubmit);
  };

  init();
}
