import Reilly, { createElement } from "../lib/Reilly.js";

class TodoItem extends Reilly.Component {
  render() {
    const { todo, edittingId } = this.props;

    return createElement(
      "li",
      {
        id: todo.id,
        className: `${todo.completed ? "completed" : ""} ${
          todo.id === edittingId ? "editing" : ""
        }`
      },
      createElement(
        "div",
        { className: "view" },
        createElement("input", {
          type: "checkbox",
          className: `toggle ${todo.completed ? "checked" : ""}`,
          checked: todo.completed
        }),
        createElement("label", { className: "label" }, todo.content),
        createElement("button", { className: "destroy" })
      ),
      createElement("input", {
        className: "edit",
        value: todo.content
      })
    );
  }
}

export default TodoItem;
