import Todo from "./domain/Todo.js";
import TodoInput from "./component/TodoInput.js";

export default function App() {
  const todos = [];
  let nextId = 0;
  const $list = document.querySelector(".todo-list");

  const init = () => {
    TodoInput({ addTodo });
  };

  const setState = () => {
    $list.innerHTML = todos.map((todo) => todo.render()).join("");
  };

  const addTodo = (contents) => {
    todos.push(new Todo(nextId++, contents));
    setState();
  };

  init();
}
