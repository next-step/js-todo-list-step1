import Reilly from "../lib/Reilly.js";
import FilterList from "./FilterList.js";

class CountContainer extends Reilly.Component {
  render() {
    const { mode, length } = this.props;
    return Reilly.createElement(
      "div",
      { className: "count-container" },
      Reilly.createElement(
        "span",
        { className: "todo-count" },
        "총 ",
        Reilly.createElement("strong", null, length),
        " 개"
      ),
      Reilly.createElement(FilterList, { mode })
    );
  }
}

export default CountContainer;
