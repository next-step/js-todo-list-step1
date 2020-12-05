import Filter from "../../enums/Filter.js";

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const EDIT_TODO_REQUEST = "EDIT_TODO_REQUEST";
const EDIT_TODO_SUCCESS = "EDIT_TODO_SUCCESS";
const EDIT_TODO_CANCELED = "EDIT_TODO_CANCELED";
const CHANGE_FILTER = "CHANGE_FILTER";

export const addTodo = (content) => {
    return {
        type: ADD_TODO,
        payload: {
            content
        }
    }
};

export const deleteTodo = (id) => {
    return {
        type: DELETE_TODO,
        payload: {
            id
        }
    }
};

export const toggleTodo = (id) => {
    return {
        type: TOGGLE_TODO,
        payload: {
            id
        }
    }
};

export const editTodoRequest = (id) => {
    return {
        type: EDIT_TODO_REQUEST,
        payload: {
            id
        }
    }
};

export const editTodoSuccess = (id, content) => {
    return {
        type: EDIT_TODO_SUCCESS,
        payload: {
            id,
            content
        }
    }
};

export const editTodoCancel = (id) => {
    return {
        type: EDIT_TODO_CANCELED,
        payload: {
            id
        }
    }
};

export const changeFilter = (filterType) => {
  return {
      type: CHANGE_FILTER,
      payload: {
          filterType
      }
  }
};

const initialState = {
    todoList: [],
    filtered: Filter.ALL,
};

export const getFilteredList = (todoList = [], filtered = Filter.ALL) => {
  return todoList.filter(todo => (filtered === Filter.ALL) || (filtered === Filter.ACTIVE && !todo.complete) || (filtered === Filter.COMPLETE && todo.complete));
};

export const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ADD_TODO:
            return {
                ...state,
                todoList: [...state.todoList, {
                    id: state.todoList.length + 1,
                    content: payload.content,
                    complete: false,
                    editing: false,
                }],
            };
        case DELETE_TODO:
            return {
                ...state,
                todoList: state.todoList.filter(todo => todo.id != payload.id)
            };
        case TOGGLE_TODO:
            return {
                ...state,
                todoList: state.todoList.map(todo => todo.id == payload.id ? {
                    ...todo,
                    complete: !todo.complete
                } : todo)
            };
        case EDIT_TODO_REQUEST:
            return {
                ...state,
                todoList: state.todoList.map(todo => todo.id == payload.id ? {
                    ...todo,
                    editing: true
                } : todo)
            };
        case EDIT_TODO_SUCCESS:
            return {
                ...state,
                todoList: state.todoList.map(todo => todo.id == payload.id ? {
                    ...todo,
                    content: payload.content,
                    editing: false,
                } : todo)
            };
        case EDIT_TODO_CANCELED:
            return {
                ...state,
                todoList: state.todoList.map(todo => todo.id == payload.id ? {
                    ...todo,
                    editing: false,
                } : todo)
            };
        case CHANGE_FILTER:
            return {
                ...state,
                filtered: payload.filterType,
            };
        default:
            return {...state};
    }
};
