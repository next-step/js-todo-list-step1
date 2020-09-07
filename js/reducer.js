export const ADD_TODO = 'addTodo';
export const REMOVE_TODO = 'removeTodo';
export const TOGGLE_TODO_DONE = 'toggleTodoDone';
export const TOGGLE_TODO_EDIT = 'toggleTodoEdit';
export const SET_TODO = 'setTodo';
export const SET_FILTER = 'setFilter';
export const INIT_TODO_APP = 'initTodoApp';

const initState = {
	id: 0,
	todoList: [],
	filter: 'all',
}

export default function reducer(state = initState, {type, payload}) {
	switch (type) {
		case ADD_TODO:
			return {
				...state,
				todoList: [...state.todoList, {id: state.id, text: payload, done: false, edit: false}],
				id: state.id + 1,
			}
		case REMOVE_TODO:
			return {
				...state,
				todoList: state.todoList.filter(({id}) => id !== payload),
			}
		case TOGGLE_TODO_DONE:
			return {
				...state,
				todoList: state.todoList.map((todo) => todo.id === payload ? {...todo, done: !todo.done} : todo),
			}
		case TOGGLE_TODO_EDIT:
			return {
				...state,
				todoList: state.todoList.map((todo) => todo.id === payload ? {...todo, edit: !todo.edit} : todo),
			}
		case SET_TODO:
			return {
				...state,
				todoList: state.todoList.map((todo) => todo.id === payload.id ? {
					...todo,
					text: payload.text,
					edit: false
				} : todo),
			}
		case SET_FILTER:
			return {
				...state,
				filter: payload,
			}
		case INIT_TODO_APP:
			return {
				id: payload.id,
				todoList: payload.todoList,
				filter: payload.filter
			}
		default:
			return state;
	}
}