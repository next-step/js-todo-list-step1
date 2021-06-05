import { CLASS_NAME, CUSTOM_EVENT, EVENT, ITEM_KEY, KEY_UP_EVENT } from "../CONST.js";
import { $, addClass, closest, removeClass } from "../utils/element.js";
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

  stopEditing(target) {
    removeClass(closest(CLASS_NAME.TODO_ITEM, target), CLASS_NAME.EDITING)
  }

  startEditing(target) {
    addClass(closest(CLASS_NAME.TODO_ITEM, target), CLASS_NAME.EDITING);
  }

  event = {
    [KEY_UP_EVENT.ENTER]: ({ id, value }, update) => update(Number(id), { key: ITEM_KEY.TEXT, value }),
    [KEY_UP_EVENT.ESCAPE]: target => this.stopEditing(target),
    [CUSTOM_EVENT.UPDATE_COMPLETED]: ({ id, checked }, update) => update(Number(id), { key: ITEM_KEY.COMPLETED, value: checked }),
    [CUSTOM_EVENT.UPDATE_TEXT]: ({ id, value }, update) => update(Number(id), { key: ITEM_KEY.TEXT, value })
  }

  onClick(target, deleteItem) {
    const {event} = target.dataset;
    event === CUSTOM_EVENT.DELETE && deleteItem(Number(target.id)); 
  }

  onDblclick(target) {
    this.startEditing(target)
  }

  onChange(target, update) {
    const { event } = target.dataset;
    this.event[event] && this.event[event](target, update);
  }

  onKeyUp(key, target, update) {
    this.event[key] && this.event[key](target, update);
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