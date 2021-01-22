import Reilly from "../lib/Reilly.js";

function TodoItem({ todo }) {
  return Reilly.createElement(
    "li",
    { id: todo.id },
    Reilly.createElement(
      "div",
      { className: "view" },
      Reilly.createElement("input", {
        className: "toggle",
        type: "checkbox",
        checked: todo.completed
      }),
      Reilly.createElement("label", { className: "label" }, todo.content),
      Reilly.createElement("button", { className: "destroy" })
    ),
    Reilly.createElement("input", {
      className: "edit",
      value: todo.content
    })
  );
}

export default TodoItem;
