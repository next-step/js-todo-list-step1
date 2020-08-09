import TodoModel from "../model/todoModel.js";
import { todoCountTemplate } from "../../utils/template.js";
import { SELECTOR } from "../../utils/constants.js";

export default function TodoCount() {
  if (new.target !== TodoCount) {
    return new TodoCount();
  }

  this.init = () => {
    this.$target = document.querySelector(`.${SELECTOR.TODO_COUNT}`);
    TodoModel.subscribe("todoChanged", this, this.render);
    this.render(TodoModel.get());
  };

  this.render = (todos) => {
    this.$target.innerHTML = todoCountTemplate(todos.length);
  };

  this.init();
}
