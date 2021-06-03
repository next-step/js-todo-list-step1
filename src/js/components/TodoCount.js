import { $ } from "../utils/querySelector.js";
import { TodoCountTemplate } from "./Template.js";
import { EVENT_TYPE, STATUS_TYPE } from "../utils/Constants.js";

export function TodoCount({ onSelectedGroup }) {
  const $count = $(".todo-count");
  const $all = $(".all");
  const $active = $(".active");
  const $completed = $(".completed");

  this.todoItems = [];

  this.setState = (items) => {
    this.todoItems = [...items];
    this.render(this.todoItems);
  };

  this.removeSelected = () => {
    $all.classList.remove("selected");
    $active.classList.remove("selected");
    $completed.classList.remove("selected");
  };

  this.onShowSelectedItems = (event, element, status) => {
    event.preventDefault();
    this.removeSelected();

    let selectedItems = this.todoItems;
    if (status === STATUS_TYPE.COMPLETED || status === STATUS_TYPE.ACTIVE) {
      selectedItems = this.todoItems.filter((item) => item.status === status);
    }
    this.render(selectedItems);
    onSelectedGroup(selectedItems);
  };

  this.init = () => {
    $all.addEventListener(EVENT_TYPE.CLICK, (event) =>
      this.onShowSelectedItems(event, $all, "")
    );

    $active.addEventListener(EVENT_TYPE.CLICK, (event) =>
      this.onShowSelectedItems(event, $active, STATUS_TYPE.ACTIVE)
    );

    $completed.addEventListener(EVENT_TYPE.CLICK, (event) =>
      this.onShowSelectedItems(event, $completed, STATUS_TYPE.COMPLETED)
    );
  };

  this.render = (items) => {
    $count.innerHTML = TodoCountTemplate(items);
  };
}
