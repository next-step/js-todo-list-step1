export function buildNewState(op, store, e) {
  const OPERATIONS = {
    ADD: buildNewTodo,
    DELETE: deleteTodo,
  };
  const prevState = store.getState();
  const targetId = Number(e.target.closest("li").getAttribute("dataset-id"));

  const newTodos = OPERATIONS[op](prevState, targetId, e);

  const newState = { ...prevState, todos: newTodos };
  return newState;
}

export function buildNewTodo(prevState, targetId, e) {
  const newStatus = e.target.checked ? "completed" : "false";
  const newTodos = prevState.todos.map((todo) => {
    if (todo.id === targetId) {
      return { ...todo, status: newStatus };
    }
    return todo;
  });
  return newTodos;
}

export function deleteTodo(prevState, targetId) {
  const newTodos = prevState.todos.filter((todo) => {
    return todo.id !== targetId;
  });
  return newTodos;
}
