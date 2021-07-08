//NEWSTATE
export function buildNewState(op, store, e) {
  const OPERATIONS = {
    TOGGLE: toggleTodoStatus,
    DELETE: deleteTodo,
    EDIT: editTodo,
  };
  const prevState = store.getState();
  const targetId = Number(e.target.closest("li").getAttribute("dataset-id"));

  const newTodos = OPERATIONS[op](prevState, targetId, e);

  const newState = { ...prevState, todos: newTodos };
  return newState;
}

//NEWTODOS
function toggleTodoStatus(prevState, targetId, e) {
  const newStatus = e.target.checked ? "completed" : "false";
  const newTodos = prevState.todos.map((todo) => {
    if (todo.id === targetId) {
      return { ...todo, status: newStatus };
    }
    return todo;
  });
  return newTodos;
}

function deleteTodo(prevState, targetId) {
  const newTodos = prevState.todos.filter((todo) => {
    return todo.id !== targetId;
  });
  return newTodos;
}

function editTodo(prevState, targetId, e) {
  const newTodos = prevState.todos.map((todo) => {
    if (todo.id === targetId) {
      return { ...todo, content: e.target.value };
    }
    return todo;
  });
  return newTodos;
}
