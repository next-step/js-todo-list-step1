export default function App() {
  const todos = [];
  let nextId = 0;
  const $input = document.querySelector(".new-todo");
  const $list = document.querySelector(".todo-list");

  const todoItem = ({ _id, isCompleted, editing, contents }) => {
    const classList = [isCompleted ? "completed" : "", editing ? "editing" : ""]
      .join(" ")
      .trim();

    return `
      <li
        class="${classList}"
        data-id=${_id}
      >
        <div class="view">
          <input class="toggle" type="checkbox" ${
            isCompleted ? "checked" : ""
          }/>
          <label class="label">${contents}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${contents}" />
      </li>
    `;
  };

  const setState = () => {
    $list.innerHTML = todos.map(todoItem).join("");
  };

  const handleAddTodo = ({ target, key }) => {
    if (key !== "Enter") {
      return;
    }

    const contents = target.value.trim();
    if (contents === "") {
      return;
    }

    const newTodo = {
      id: nextId++,
      contents,
    };
    todos.push(newTodo);
    setState();

    target.value = "";
  };

  $input.addEventListener("keypress", handleAddTodo);
}
