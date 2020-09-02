import {Component} from "../_core";
import {debounceOf} from "../utils";
import {toDoStore} from "../store";

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
      if (key === 'Enter') callback(1000 / 60);
    })
  }

  #addItem (itemTitle) {
    toDoStore.commit('SET_ITEMS', [
      ...toDoStore.$state.items,
      { title: itemTitle, completed: false, editing: false }
    ]);
  }

}