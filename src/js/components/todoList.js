import { TodoItem } from "./todoItem.js";
import { VIEW, EDIT, COMPLETE } from "../constant/constant.js";

export class TodoList {
  constructor($target, props, onDeleteItem) {
    this.$target = $target;
    this.state = props;
    this.render();
    this.$target.addEventListener('click', (e) => {
      if (e.target.className === "destroy") {
        const index = e.target.closest("li").dataset["index"];
        onDeleteItem(index);
      }
    });
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
        new TodoItem(VIEW, v, index).template()
      );
    });
  };
}
