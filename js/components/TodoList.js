import Reilly, { createElement } from "../lib/Reilly.js";
import TodoItem from "./TodoItem.js";

class TodoList extends Reilly.Component {
  render() {
    const {
      todos,
      edittingId,
      onToggle,
      onRemove,
      onStartEdit,
      onConfirmEdit
    } = this.props;

    return createElement(
      "ul",
      {
        id: "todo-list",
        className: "todo-list",
        onchange: onToggle,
        onclick: onRemove,
        ondblclick: onStartEdit,
        onkeyup: onConfirmEdit
      },
      ...todos.map((todo) => createElement(TodoItem, { todo, edittingId }))
    );
  }
}

export default TodoList;
