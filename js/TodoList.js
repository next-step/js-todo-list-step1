import { validator } from "../utils/validator.js";

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

  const { $target, data } = params;
}
