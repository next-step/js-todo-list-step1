import {debounceFrameOf} from "../utils";

export const TodoInput = class {

  #target; #props;

  constructor(target, props) {
    this.#target = target;
    this.#props = props;

    this.#setEvent();
  }

  #setEvent () {
    const target = this.#target;
    const debounceEnter = debounceFrameOf(() => {
      if (target.value.length === 0) return;
      this.#props.onAdd(target.value);
      target.value = '';
    });
    target.addEventListener('keydown', ({ key }) => {
      if (key === 'Enter') {
        debounceEnter();
      }
    })
  }
}