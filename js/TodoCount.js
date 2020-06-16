import * as template from "./utils/templates.js";
import { ERRORTYPE } from './utils/constants.js';

export default class TodoCount {
  constructor({ data, $target, $targetTodoFilters }) {
    this.data = data;
    this.$target = $target;
    this.$targetTodoFilters = $targetTodoFilters;

    this.render();
  }
  setState(nextData) {
    this.data = nextData;
    this.render();
  }
  render() {
    const filterDOMList = this.$targetTodoFilters.querySelectorAll("li a");
    let selectedDOMClassName = undefined;
    for (let node of filterDOMList.values()) {
      if (node.classList.contains("selected")) {
        selectedDOMClassName = node.classList[0];
        break;
      }
    }
    switch (selectedDOMClassName) {
      case "all":
        this.filteredData = this.data;
        break;
      case "active":
        this.filteredData = this.data.filter(
          (todo) => todo.isCompleted === false
        );
        break;
      case "completed":
        this.filteredData = this.data.filter(
          (todo) => todo.isCompleted === true
        );
        break;
      default:
        console.error(ERRORTYPE.NOMATCHFILTER);
        break;
    }

    this.$target.innerHTML =
      this.filteredData && template.TODOCOUNT(this.filteredData.length);
  }
}
