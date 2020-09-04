import { Component } from "../core/index.js";
import { toDoStore } from "../store/index.js";

export const ToDoCount = class extends Component {

  constructor (target) {
    super(target, {});
  }

  get #filteredItemsCount () {
    return toDoStore.$getters.filteredItems.length;
  }

  _render () {
    this.$target.innerHTML = `총 <strong>${this.#filteredItemsCount}</strong> 개`;
  }

}