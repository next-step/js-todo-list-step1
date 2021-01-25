import { createElement } from "../lib/Reilly.js";

function TodoForm(props) {
  return createElement(
    "form",
    { onsubmit: props.onsubmit },
    createElement("input", {
      id: "new-todo-title",
      name: "new-todo",
      className: "new-todo",
      placeholder: "할일을 추가해주세요"
    })
  );
}

export default TodoForm;
