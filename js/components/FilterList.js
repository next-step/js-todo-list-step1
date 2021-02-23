import Reilly, { createElement } from "../lib/Reilly.js";
import { FILTER_ENUM } from "../types/constants.js";
import { filterBtns } from "./filterBtns.js";

class FilterList extends Reilly.Component {
  render() {
    const { mode, onModeChange } = this.props;
    const { ALL, ACTIVE, COMPLETED } = FILTER_ENUM;

    return createElement(
      "ul",
      { className: "filters" },
      ...[ALL, ACTIVE, COMPLETED].map((name) =>
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
