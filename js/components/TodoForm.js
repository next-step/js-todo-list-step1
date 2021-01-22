import Reilly from "../lib/Reilly.js";

function TodoForm(props) {
  return Reilly.createElement(
    "form",
    { onsubmit: props.onsubmit },
    Reilly.createElement("input", {
      id: "new-todo-title",
      name: "new-todo",
      className: "new-todo",
      placeholder: "할일을 추가해주세요",
      autofocus: true
    })
  );
}

export default TodoForm;
