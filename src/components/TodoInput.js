import TodoModel from "../model/todoModel.js";
import { isEmpty, isEnter } from "../utils/functions.js";
import { SELECTOR } from "../utils/constants.js";

export default function TodoInput() {
  if (new.target !== TodoInput) {
    return new TodoInput();
  }
  this.init = () => {
    this.$target = document.querySelector(`.${SELECTOR.TODO_INPUT}`);
    this.bindEvent();
  };

  this.bindEvent = () => {
    const onCreateTodoHandler = (e) => {
      if (!isEnter(e.key) || isEmpty(e.target.value)) {
        return;
      }
      const { target } = e;
      TodoModel.create(target.value);
      target.value = "";
    };

    this.$target.addEventListener("keypress", onCreateTodoHandler);
  };

  this.init();
}
