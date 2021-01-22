import Reilly, { createElement } from "../lib/Reilly.js";
import { filterBtns } from "./filterBtns.js";

class FilterList extends Reilly.Component {
  render() {
    const { mode } = this.props;
    return createElement(
      "ul",
      { className: "filters" },
      createElement(
        "li",
        null,
        createElement(filterBtns, { mode, name: "all" }),
        createElement(filterBtns, { mode, name: "active" }),
        createElement(filterBtns, { mode, name: "completed" })
      )
    );
  }
}

export default FilterList;
