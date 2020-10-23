const TODO_INIT = "TODO_INIT";
const TODO_INSERT = "TODO_INSERT";
const TODO_DELETE = "TODO_DELETE";
const TODO_TOGGLE = "TODO_TOGGLE";
const TODO_UPDATE = "TODO_UPDATE";

export const initTodo = todos => ({ type: TODO_INIT, payload: { todos } });

export const insertTodo = text => ({ type: TODO_INSERT, payload: { text } });

export const removeTodo = id => ({ type: TODO_DELETE, payload: { id } });

export const toggleTodo = id => ({ type: TODO_TOGGLE, payload: { id } });

export const updateTodo = (id, text) => ({
  type: TODO_UPDATE,
  payload: { id, text }
});

let key = 1;

const todoReducer = (state = { todos: [] }, { type, payload }) => {
  switch (type) {
    case TODO_INIT: {
      key = payload.todos.length;
      return {
        ...state,
        todos: payload.todos
      };
    }
    case TODO_INSERT:
      return {
        ...state,
        todos: state.todos.concat({
          id: key++,
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
