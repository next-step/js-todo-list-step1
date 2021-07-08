export function buildNewTodo(store, e) {
  const prevState = store.getState();
  const targetId = e.target.getAttribute("dataset-id");

  const newStatus = e.target.checked ? "completed" : "false";
  const newTodos = prevState.todos.map((todo) => {
    if (todo.id === Number(targetId)) {
      return { ...todo, status: newStatus };
    }
    return todo;
  });

  const newState = { ...prevState, todos: newTodos };
  return newState;
}
