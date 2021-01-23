export default function TodoInput({ addTodo }) {
  const $input = document.querySelector(".new-todo");

  const handleAddTodo = ({ target, key }) => {
    if (key !== "Enter") {
      return;
    }

    const contents = target.value.trim();
    if (contents === "") {
      return;
    }

    addTodo(contents);

    target.value = "";
  };

  $input.addEventListener("keypress", handleAddTodo);
}
