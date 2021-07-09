//prettier-ignore
import { TOGGLE, DESTROY, DELETE, EDITING, EDIT } from "./constant.js";
import { filterTodos } from "../../utils/helpers.js";
import { $, isInClassList } from "../../utils/selectors.js";

//MOUNT HELPER
export function toggleTodoItem(e, store) {
  const isToggle = isInClassList(TOGGLE, e.target);
  if (isToggle) {
    buildNewState(TOGGLE, store, e);
  }
}
export function deleteTodoItem(e, store) {
  const isDestroy = isInClassList(DESTROY, e.target);
  if (isDestroy) {
    buildNewState(DELETE, store, e);
  }
}
export function setEditingMode(e) {
  const isList = e.target.closest("li");
  if (isList) {
    isList.classList.add(EDITING);
  }
}
export function editSelectedTodo(e, store) {
  const isEditing = isInClassList(EDIT, e.target);
  if (isEditing && e.key === "Enter") {
    buildNewState(EDIT, store, e);
    e.target.closest("li").classList.remove(EDITING);
  }
  if (isEditing && e.key === "Escape") {
    const currentValue = $(".label").textContent;
    e.target.value = currentValue;
    e.target.closest("li").classList.remove(EDITING);
  }
}

//VIEW HELPER
export function buildListTodos(store) {
  const { todos, view } = store.getState();
  return view === "all" ? todos : filterTodos(todos, view);
}

//STATE HELPER
function buildNewState(op, store, e) {
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

//TODO - STATUS
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
//TODO - DELETE
function deleteTodo(prevState, targetId) {
  const newTodos = prevState.todos.filter((todo) => {
    return todo.id !== targetId;
  });
  return newTodos;
}

//TODO - UPDATE
function editTodo(prevState, targetId, e) {
  const newTodos = prevState.todos.map((todo) => {
    if (todo.id === targetId) {
      return { ...todo, content: e.target.value };
    }
    return todo;
  });
  return newTodos;
}
