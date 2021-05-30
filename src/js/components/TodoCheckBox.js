import { $ } from "../utils/querySelector.js";
import { EVENT_TYPE } from "../utils/Constants.js";

export function TodoCheckBox({ onCheck }) {
  const $todoList = $("#todo-list");

  $todoList.addEventListener(EVENT_TYPE.CLICK, (event) =>
    this.clickCheckbox(event)
  );

  this.clickCheckbox = (event) => {
    const $target = event.target;

    if ($target.type !== "checkbox") {
      return;
    }
    console.log($target.closest("li").id);
    onCheck($target.closest("li").id);
  };
}
