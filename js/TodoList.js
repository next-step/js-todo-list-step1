import { validator } from "../utils/validator.js";
import { todoListTemplate } from "../utils/templates.js";
import { classNameMap } from "../utils/constants.js";

const validateTodoList = (context, params) => {
  validator.isNewInstance(context, TodoList);
  validator.isObject(params);

  const { $target, data } = params;

  validator.isElement($target);
  validator.isArray(data);

  data.forEach((todo) => {
    validator.isString(todo.content);
    validator.isNotZeroLengthString(todo.content);
    validator.isBoolean(todo.isCompleted);
  });
};

export default function TodoList(params) {
  validateTodoList(this, params);

  const { $target } = params;
  this.data = params.data;
  this.onToggle = params.onToggle;
  this.onRemove = params.onRemove;

  this.onFocus = ($edit) => $edit.classList.toggle(classNameMap.ON_EDIT);

  $target.addEventListener("click", (e) => {
    const { id } = e.target.closest("li").dataset;
    if (e.target.classList.contains(classNameMap.TOGGLE)) {
      this.onToggle(id);
    } else if (e.target.classList.contains(classNameMap.REMOVE)) {
      this.onRemove(id);
    }
  });

  $target.addEventListener("dblclick", (e) => {
    if (e.target.classList.contains(classNameMap.LABEL)) {
      const $edit = e.target.closest("li");
      this.onFocus($edit);
    }
  });

  this.setState = (nextData) => {
    this.data = nextData;
    this.render();
  };

  this.render = () => {
    $target.innerHTML = todoListTemplate(this.data);
  };

  this.render();
}
