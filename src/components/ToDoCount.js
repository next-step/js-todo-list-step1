import { Component } from "../core/Component.js";
import { toDoStore } from "../store/toDoStore.js";

export const ToDoCount = class extends Component {

  render () {
    return `총 <strong>${toDoStore.$getters.filteredItems.length}</strong> 개`;
  }

}