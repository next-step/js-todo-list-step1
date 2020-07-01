import { validator } from "../utils/validator.js";
import { todoListTemplate } from "../utils/templates.js";
import { classNameMap, keyMap } from "../utils/constants.js";

const validateTodoList = (context, params) => {
  validator.isNewInstance(context, TodoList);
  validator.isObject(params);

  const { $target, data, onToggle, onRemove, onModify } = params;

  validator.isElement($target);
  validator.isArray(data);
  validator.isFunction(onToggle);
  validator.isFunction(onRemove);
  validator.isFunction(onModify);

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
  this.onModify = params.onModify;

  this.onFocus = ($edit) => $edit.classList.toggle(classNameMap.FOCUS);
  this.onKeyDown = (e) => {
    const $edit = e.target.closest("li");
    const { id } = e.target.closest("li").dataset;

    switch (e.key) {
      case keyMap.ESC:
        {
          const index = this.data.findIndex((todo) => todo.id === Number(id));
          e.target.value = this.data[index].content;
          this.onFocus($edit);
        }
        break;
      case keyMap.ENTER:
        {
          const content = e.target.value;
          this.onModify(id, content);
        }
        break;
    }
  };

  $target.addEventListener("click", (e) => {
    const { id } = e.target.closest("li").dataset;
    if (e.target.classList.contains(classNameMap.TOGGLE)) {
      this.onToggle(Number(id));
    } else if (e.target.classList.contains(classNameMap.REMOVE)) {
      this.onRemove(Number(id));
    }
  });

  $target.addEventListener("dblclick", ({ target }) => {
    if (target.classList.contains(classNameMap.LABEL)) {
      const $edit = target.closest("li");
      this.onFocus($edit);
    }
  });

  $target.addEventListener("keydown", (e) => {
    if (!e.target.classList.contains(classNameMap.ON_EDIT)) {
      return;
    }

    this.onKeyDown(e);
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
