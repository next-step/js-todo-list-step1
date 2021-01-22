import Reilly from "../lib/Reilly.js";
import TodoItem from "./TodoItem.js";

class TodoList extends Reilly.Component {
  render() {
    const { todos } = this.props;
    return Reilly.createElement(
      "ul",
      {
        id: "todo-list",
        className: "todo-list"
      },
      ...todos.map((todo) => Reilly.createElement(TodoItem, { todo }))
    );
  }
}

export default TodoList;
