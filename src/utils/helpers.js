import { $ } from "./selectors.js";

//NEWSTATE
export function buildNewState(op, store, e) {
  const OPERATIONS = {
    toggle: toggleTodoStatus,
    delete: deleteTodo,
    edit: editTodo,
  };
  const prevState = store.getState();
  const targetId = Number(e.target.closest("li").getAttribute("dataset-id"));

  const newTodos = OPERATIONS[op](prevState, targetId, e);

  const newState = { ...prevState, todos: newTodos };
  store.setState(newState);
}

//NEWTODOS
function toggleTodoStatus(prevState, targetId, e) {
  const newStatus = e.target.checked ? "completed" : "active";
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

export function buildViewState(op, store, e) {
  $(".selected").classList.remove("selected");
  e.target.className = `${op} selected`;

  const state = store.getState();
  const newState = { ...state, view: op };
  store.setState(newState);
}

export function filterTodos(todos, view) {
  return todos.filter((todo) => {
    if (todo.status === view) return todo;
  });
}
