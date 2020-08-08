const todosValidation = (todos) => {
  return todos && todos.every((todo) => todo && todo.text);
};

export { todosValidation };
