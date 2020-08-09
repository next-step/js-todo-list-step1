import TodoModel from "../model/todoModel.js";
import { isEmpty, isEnter } from "../../utils/functions.js";

export default function TodoInput({ selector, onAddTodo }) {
  if (new.target !== TodoInput) {
    return new TodoInput({ selector, onAddTodo });
  }
  this.init = () => {
    this.$target = document.querySelector(selector);
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
