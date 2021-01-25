import Reilly, { createElement } from "../lib/Reilly.js";
import FilterList from "./FilterList.js";

class CountContainer extends Reilly.Component {
  render() {
    const { mode, todos, onModeChange } = this.props;
    const doneCount = todos.filter((todo) => todo.completed).length;

    return createElement(
      "div",
      { className: "count-container" },
      createElement(
        "span",
        { className: "todo-count" },
        "총 ",
        createElement("strong", null, todos.length),
        " 개"
      ),
      createElement(FilterList, { mode, onModeChange }),
      createElement(
        "div",
        { style: "position: absolute; right:20px;" },
        `${doneCount} / ${todos.length}`
      )
    );
  }
}

export default CountContainer;
