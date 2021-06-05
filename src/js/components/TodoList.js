import { CLASS_NAME, CUSTOM_EVENT, EVENT, ITEM_KEY, KEY_UP_EVENT } from "../CONST.js";
import { $ } from "../utils/element.js";
import TodoItemTemplate from "../views/TodoItemTemplate.js";

export default class TodoList {
  constructor() {
    this.$todoList = $(CLASS_NAME.TODO_LIST);
    this.items = [];
  }

  setState(updatedItems) {
    this.items = updatedItems;
    this.render();
  }

  onClick(target, deleteItem) {
    target.dataset.event === CUSTOM_EVENT.DELETE && deleteItem(Number(target.id)); 
  }

  onChange(target, update) {
    if (target.dataset.event === CUSTOM_EVENT.UPDATE_COMPLETED) {
      update(Number(target.id), { key: ITEM_KEY.COMPLETED, value: target.checked });
      return;
    }

    if (target.dataset.event === CUSTOM_EVENT.UPDATE_TEXT) {
      update(Number(target.id), { key: ITEM_KEY.TEXT, value: target.value });
      return;
    }
  }

  onDblclick(target) {
    target.closest(`.${CLASS_NAME.TODO_ITEM}`).classList.add(CLASS_NAME.EDITING);
  }

  onKeyUp(key, target, update) {
    if (key === KEY_UP_EVENT.ENTER) {
      update(Number(target.id), { key: ITEM_KEY.TEXT, value: target.value });
      return;
    }
    if (key === KEY_UP_EVENT.ESCAPE) {
      target.closest(`.${CLASS_NAME.TODO_ITEM}`).classList.remove(CLASS_NAME.EDITING);
    }
  }

  setEvent({ update, delete: deleteItem }) {
    this.$todoList.addEventListener(EVENT.CLICK, ({ target }) => this.onClick(target, deleteItem));
    this.$todoList.addEventListener(EVENT.CHANGE, ({ target }) => this.onChange(target, update));
    this.$todoList.addEventListener(EVENT.DBL_CLICK, ({ target }) => this.onDblclick(target));
    this.$todoList.addEventListener(EVENT.KEY_UP, ({ key, target }) => this.onKeyUp(key, target, update));
  }

  render() {
    this.$todoList.innerHTML = this.items.map(TodoItemTemplate).join('');
  }
}