import Todo from "./domain/Todo.js";

export default function App() {
  const todos = [];
  let nextId = 0;
  const $input = document.querySelector(".new-todo");
  const $list = document.querySelector(".todo-list");

  const setState = () => {
    $list.innerHTML = todos.map((todo) => todo.render()).join("");
  };

  const handleAddTodo = ({ target, key }) => {
    if (key !== "Enter") {
      return;
    }

    const contents = target.value.trim();
    if (contents === "") {
      return;
    }

    todos.push(new Todo(nextId++, contents));
    setState();

    target.value = "";
  };

  $input.addEventListener("keypress", handleAddTodo);
}
