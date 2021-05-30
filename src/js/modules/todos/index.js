import { uuid } from '../../utils/uuid.js';
import useLocalStorage from '../../hooks/useLocalStorage.js';

const [getData] = useLocalStorage('todos');

// 액션 타입
const CHANGE_TYPE = 'todos/CHANGE_TYPE';
const CHANGE_MODE = 'todos/CHANGE_MODE';
const ADD_TODO = 'todos/ADD_TODO';
const UPDATE_TODO = 'todos/UPDATE_TODO';
const TOGGLE_TODO = 'todos/TOGGLE_TODO';
const REMOVE_TODO = 'todos/REMOVE_TODO';

// 액션 생성함수
export const changeType = (type) => ({ type: CHANGE_TYPE, payload: type });
export const changeMode = (id) => ({ type: CHANGE_MODE, payload: id });
export const addTodo = (todo) => ({ type: ADD_TODO, payload: todo });
export const updateTodo = (data) => ({ type: UPDATE_TODO, payload: data });
export const toggleTodo = (id) => ({ type: TOGGLE_TODO, payload: id });
export const removeTodo = (id) => ({ type: REMOVE_TODO, payload: id });

// 초기값
export const initialState = {
  type: 'all',
  todos: getData() || [],
};

// 리듀서
export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TYPE: {
      return {
        ...state,
        type: action.payload,
      };
    }
    case CHANGE_MODE: {
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, editMode: !todo.editMode }
            : todo
        ),
      };
    }
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: uuid(),
            content: action.payload,
            done: false,
            editMode: false,
          },
        ],
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, content: action.payload.content }
            : todo
        ),
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload ? { ...todo, done: !todo.done } : todo
        ),
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    default:
      return state;
  }
};
