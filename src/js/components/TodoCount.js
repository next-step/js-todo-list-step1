import { CLASS_NAME } from "../CONST.js";
import { $ } from "../utils/element.js";

export default class TodoCount {
  constructor() {
    this.$todoCount = $(CLASS_NAME.TODO_COUNTER);
    this.count = 0;
  }

  setState(updatedCount) {
    this.count = updatedCount;
    this.render();
  }

  render() {
    this.$todoCount.textContent = this.count;
  }
}