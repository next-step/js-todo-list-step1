import { actionCreator } from "../utils/my-redux.js";
import createRandomId from "../utils/createRandomId.js";

const TODO_INIT = "TODO_INIT";
const TODO_INSERT = "TODO_INSERT";
const TODO_DELETE = "TODO_DELETE";
const TODO_TOGGLE = "TODO_TOGGLE";
const TODO_UPDATE = "TODO_UPDATE";

export const initTodo = todos => actionCreator(TODO_INIT, { todos });

export const insertTodo = text => actionCreator(TODO_INSERT, { text });

export const removeTodo = id => actionCreator(TODO_DELETE, { id });

export const toggleTodo = id => actionCreator(TODO_TOGGLE, { id });

export const updateTodo = (id, text) =>
  actionCreator(TODO_UPDATE, { id, text });

const todoReducer = (state, { type, payload }) => {
  switch (type) {
    case TODO_INIT: {
      return {
        ...state,
        todos: payload.todos
      };
    }
    case TODO_INSERT:
      return {
        ...state,
        todos: state.todos.concat({
          id: createRandomId(),
          text: payload.text,
          completed: false
        })
      };
    case TODO_DELETE:
      return {
        ...state,
        todos: state.todos.filter(t => t.id !== payload.id)
      };
    case TODO_TOGGLE:
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === payload.id ? { ...t, completed: !t.completed } : t
        )
      };
    case TODO_UPDATE:
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === payload.id ? { ...t, text: payload.text } : t
        )
      };
    default:
      return {
        ...state
      };
  }
};

export default todoReducer;
