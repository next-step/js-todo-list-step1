import { Component } from "../core/index.js";
import { debounceOf } from "../utils/index.js";
import { toDoStore } from "../store/index.js";
import { ONE_FRAME } from "../constant/index.js";
import { SET_ITEMS } from "../store/toDoStore.js";

export const ToDoInput = class extends Component{

  constructor (target) {
    super(target, {});
  }

  _initEventListener () {
    const { $target } = this;
    const callback = debounceOf(() => {
      this.#addItem($target.value);
      $target.value = '';
    });
    $target.addEventListener('keydown', ({ key }) => {
      if (key === 'Enter') callback(ONE_FRAME);
    })
  }

  #addItem (itemTitle) {
    toDoStore.commit(SET_ITEMS, [
      ...toDoStore.$state.items,
      { title: itemTitle, completed: false, editing: false }
    ]);
  }

}