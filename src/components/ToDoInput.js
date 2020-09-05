import { Component } from "../core/Component.js";
import { toDoStore, SET_ITEMS } from "../store/toDoStore.js";

export const ToDoInput = class extends Component {

  #addItem (itemTitle) {
    toDoStore.commit(SET_ITEMS, [
      ...toDoStore.$state.items,
      { title: itemTitle, completed: false, editing: false }
    ]);
  }

  setEvent ($target) {
    $target.addEventListener('keypress', ({ key }) => {
      if (key === 'Enter') {
        this.#addItem($target.value);
        $target.value = '';
      }
    })
  }

}