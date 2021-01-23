import Reilly from "../lib/Reilly.js";
import CountContainer from "./CountContainer.js";
import TodoList from "./TodoList.js";
import { ToggleAll } from "./ToggleAll.js";
import { FILTER_ENUM } from "../types/constants.js";

class Main extends Reilly.Component {
  render() {
    const { todos, mode, onToggle, onRemove, onModeChange } = this.props;
    let filteredTodos = [...todos];

    if (mode !== FILTER_ENUM.ALL)
      filteredTodos = todos.filter((todo) =>
        mode === FILTER_ENUM.COMPLETED ? todo.completed : !todo.completed
      );

    return Reilly.createElement(
      "main",
      null,
      Reilly.createElement(ToggleAll),
      Reilly.createElement(TodoList, {
        todos: filteredTodos,
        onToggle,
        onRemove
      }),
      Reilly.createElement(CountContainer, { mode, todos, onModeChange })
    );
  }
}

export default Main;
