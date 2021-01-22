import Reilly from "../lib/Reilly.js";
import CountContainer from "./CountContainer.js";
import TodoList from "./TodoList.js";
import { ToggleAll } from "./ToggleAll.js";

class Main extends Reilly.Component {
  render() {
    const {
      todoState: { todos, mode }
    } = this.props;
    return Reilly.createElement(
      "main",
      null,
      Reilly.createElement(ToggleAll),
      Reilly.createElement(TodoList, { todos }),
      Reilly.createElement(CountContainer, { mode, length: todos.length })
    );
  }
}

export default Main;
