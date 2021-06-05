import { CLASS_NAME, CUSTOM_EVENT, EVENT, KEY_UP_EVENT } from "../CONST.js";
import { $ } from "../utils/element.js";

export default class TodoInput {
  constructor({add}) {
    this._add = add;

    this.$todoInput = $(CLASS_NAME.NEW_TODO);
    this.setEvent();
  }

  isValid(value) {
    if (!value) {
      alert('할일을 입력하세요.')
    }
    return !!value;
  }

  reset() {
    this.$todoInput.value = '';
  }

  keyUpEvent = {
    [KEY_UP_EVENT.ENTER]: ({ value }) => {
      if (this.isValid(value)) {
        this._add(value);
      }
      this.reset()
    },
    [KEY_UP_EVENT.ESCAPE]: () => {
      this.reset();
    }
  }

  onKeyUp({ key, target }) {
    this.keyUpEvent[key] && this.keyUpEvent[key](target);
  }

  setEvent() {
    this.$todoInput.addEventListener(EVENT.KEY_UP, this.onKeyUp.bind(this))
  }
}