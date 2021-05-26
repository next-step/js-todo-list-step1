import { TodoItem } from "./todoItem.js";
import { VIEW, EDIT, COMPLETE } from "../constant/constant.js";

export class TodoList {
  constructor($target, props) {
    this.$target = $target;
    this.state = props;
    this.render();
  }
  setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  render = () => {
    this.$target.innerHTML = "";
    this.state.map((v, index) => {
      this.$target.insertAdjacentHTML(
        "beforeend",
        new TodoItem(VIEW, v).template()
      );
    });
  };
}
