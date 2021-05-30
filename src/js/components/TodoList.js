import { $ } from "../utils/querySelector.js";
import { EVENT_TYPE, KEY_TYPE } from "../utils/Constants.js";

import { TodoItemTemplate } from "./Template.js";

export function TodoList({ onEditMode, onUpdate }) {
  const $todoList = $("#todo-list");

  this.setState = (updatedTodoItems) => {
    this.render(updatedTodoItems);
  };

  this.render = (items) => {
    const template = items.map(TodoItemTemplate);
    $todoList.innerHTML = template.join("");
  };

  this.onChangeEditMode = (event) => {
    event.preventDefault();
    const $target = event.target;

    const $todoItem = $target.closest("li");
    $todoItem.classList.toggle("editing");
    onEditMode($todoItem.id);
  };

  this.onFinishEditMode = (event) => {
    event.preventDefault();
    const $target = event.target;

    if ($target && event.key === KEY_TYPE.ESCAPE) {
      document.getSelection().anchorNode.classList.remove("editing");
    } else if ($target && event.key === KEY_TYPE.ENTER) {
      const id = $target.closest("li").id;
      onUpdate(id, $target.value);
    }
  };

  $todoList.addEventListener(EVENT_TYPE.DOUBLE_CLICK, (event) =>
    this.onChangeEditMode(event)
  );
  $todoList.addEventListener(EVENT_TYPE.KEYUP, (event) =>
    this.onFinishEditMode(event)
  );
}
