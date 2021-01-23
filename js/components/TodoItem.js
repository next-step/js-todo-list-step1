import Reilly from "../lib/Reilly.js";

class TodoItem extends Reilly.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { todo } = this.props;

    return Reilly.createElement(
      "li",
      {
        id: todo.id,
        className: `${todo.completed ? "completed" : ""}`
      },
      Reilly.createElement(
        "div",
        { className: "view" },
        Reilly.createElement("input", {
          type: "checkbox",
          className: `toggle ${todo.completed ? "checked" : ""}`,
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
}

export default TodoItem;
