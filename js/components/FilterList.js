import Reilly, { createElement } from "../lib/Reilly.js";
import { filterBtns } from "./filterBtns.js";

class FilterList extends Reilly.Component {
  render() {
    const { mode, onModeChange } = this.props;

    return createElement(
      "ul",
      { className: "filters" },
      ...["all", "active", "completed"].map((name) =>
        createElement(
          "li",
          null,
          createElement(filterBtns, { mode, name, onModeChange })
        )
      )
    );
  }
}

export default FilterList;
