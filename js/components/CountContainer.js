import Reilly from "../lib/Reilly.js";
import FilterList from "./FilterList.js";

class CountContainer extends Reilly.Component {
  render() {
    const { mode, todos, onModeChange } = this.props;
    const doneCount = todos.filter((todo) => todo.completed).length;

    return Reilly.createElement(
      "div",
      { className: "count-container" },
      Reilly.createElement(
        "span",
        { className: "todo-count" },
        "총 ",
        Reilly.createElement("strong", null, todos.length),
        " 개"
      ),
      Reilly.createElement(FilterList, { mode, onModeChange }),
      Reilly.createElement(
        "div",
        { style: "position: absolute; right:20px;" },
        `${doneCount} / ${todos.length}`
      )
    );
  }
}

export default CountContainer;
