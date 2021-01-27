import Reilly, { createElement } from "../lib/Reilly.js";
import CountContainer from "./CountContainer.js";
import TodoList from "./TodoList.js";
import { ToggleAll } from "./ToggleAll.js";
import { FILTER_ENUM } from "../types/constants.js";

class Main extends Reilly.Component {
  render() {
    const {
      todos,
      mode,
      edittingId,
      onStartEdit,
      onConfirmEdit,
      onToggle,
      onRemove,
      onModeChange
    } = this.props;

    const filteredTodos =
      mode === FILTER_ENUM.ALL
        ? [...todos]
        : todos.filter((todo) =>
            mode === FILTER_ENUM.COMPLETED ? todo.completed : !todo.completed
          );

    return createElement(
      "main",
      null,
      createElement(ToggleAll),
      createElement(TodoList, {
        todos: filteredTodos,
        edittingId,
        onToggle,
        onRemove,
        onStartEdit,
        onConfirmEdit
      }),
      createElement(CountContainer, { mode, todos, onModeChange })
    );
  }
}

export default Main;
