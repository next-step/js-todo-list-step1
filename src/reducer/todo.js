const TODO_INSERT = "TODO_INSERT";
const TODO_DELETE = "TODO_DELETE";
const TODO_TOGGLE = "TODO_TOGGLE";
const TODO_UPDATE = "TODO_UPDATE";

export const insertTodo = text => ({ type: TODO_INSERT, payload: { text } });

export const removeTodo = id => ({ type: TODO_DELETE, payload: { id } });

export const toggleTodo = id => ({ type: TODO_TOGGLE, payload: { id } });

export const updateTodo = (id, text) => ({
  type: TODO_UPDATE,
  payload: { id, text }
});

let key = 1;

const todoReducer = (state = { todo: [] }, { type, payload }) => {
  switch (type) {
    case TODO_INSERT:
      return {
        ...state,
        todo: state.todo.concat({
          id: key++,
          text: payload.text,
          completed: false
        })
      };
    case TODO_DELETE:
      return {
        ...state,
        todo: state.todo.filter(t => t.id !== payload.id)
      };
    case TODO_TOGGLE:
      return {
        ...state,
        todo: state.todo.map(t =>
          t.id === payload.id ? { ...t, completed: !t.completed } : t
        )
      };
    case TODO_UPDATE:
      return {
        ...state,
        todo: state.todo.map(t =>
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
