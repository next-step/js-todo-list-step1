import { $ } from "../utils/querySelector.js";
import { EVENT_TYPE } from "../utils/Constants.js";

export function TodoDelete({ onDelete }) {
  const $todoList = $("#todo-list");

  $todoList.addEventListener(EVENT_TYPE.CLICK, (event) =>
    this.clickDestroy(event)
  );

  this.clickDestroy = (event) => {
    const $target = event.target;

    if ($target.classList.contains("destroy")) {
      if (confirm("삭제하시겠습니까?")) {
        onDelete($target.closest("li").id);
      }
    }
  };
}
