import { EVENT } from "../CONST.js";

export default class FilterTodo {
  constructor({ filterBy }) {
    this.setEvent(filterBy);
  }

  setEvent(filterBy) {
    window.addEventListener(EVENT.HASH_CHANGE, ({ newURL }) => {
      const type = newURL.split('#')[1];
      type && filterBy(type);
    })
  }
}