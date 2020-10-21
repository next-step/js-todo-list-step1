import {createStore, actionCreator} from "./redux.js";
import reducer, {
	ADD_TODO,
	INIT_TODO_APP,
	REMOVE_TODO,
	SET_FILTER,
	SET_TODO,
	TOGGLE_TODO_DONE,
	TOGGLE_TODO_EDIT
} from "./reducer.js";
import TodoList from "./components/TodoList.js";
import TodoFooter from "./components/TodoFooter.js";
import Utils from "./utils.js";

const todoInputElement = document.querySelector('#new-todo-title')
const todoListElement = document.querySelector('#todo-list')
const todoCountElement = document.querySelector('.count-container')

const store = createStore(reducer);

store.subscribe(() => {
	const {todoList, filter} = store.getState();
	const filteredList = Utils.todoListFilter(todoList, filter);
	todoListElement.innerHTML = TodoList({list: filteredList})
	todoCountElement.innerHTML = TodoFooter({list: filteredList, filter})
});

const localSave = () => {
	const {id, todoList} = store.getState();
	Utils.setStorageItem('id', id);
	Utils.setStorageItem('todoList', todoList)
}

const addTodo = (text) => {
	store.dispatch(actionCreator(ADD_TODO, text))
	localSave();
}
const removeTodo = (id) => {
	store.dispatch(actionCreator(REMOVE_TODO, id))
	localSave();
}
const toggleTodoDone = (id) => {
	store.dispatch(actionCreator(TOGGLE_TODO_DONE, id));
	localSave();
}

const onTodoEdit = (id) => {
	store.dispatch(actionCreator(TOGGLE_TODO_EDIT, id));
	const input = todoListElement.querySelector('.editing .edit');
	input.focus();
	const val = input.value;
	input.value = '';
	input.value = val;
	input.addEventListener('blur', () => {
		toggleTodoEdit(id)
	})
}

const toggleTodoEdit = (id) => {
	store.dispatch(actionCreator(TOGGLE_TODO_EDIT, id));
	const input = todoListElement.querySelector('.editing .edit');
	input?.focus();
	input?.addEventListener('blur', () => {
		toggleTodoEdit(id)
	})
}
const setTodo = (id, text) => {
	store.dispatch(actionCreator(SET_TODO, {id, text}));
	localSave();
}
const setFilter = (filter) => store.dispatch(actionCreator(SET_FILTER, filter));
const initTodoApp = ({id, todoList, filter}) => store.dispatch(actionCreator(INIT_TODO_APP, {
	id,
	todoList,
	filter
}));

window.addEventListener('load', () => {
	initTodoApp({
		id: Utils.getStorageItem('id') || 0,
		todoList: Utils.getStorageItem('todoList') || [],
		filter: window.location.hash?.slice(1) || 'all'
	})
})

todoInputElement.addEventListener('keyup', (event) => {
	const {key, target: {value}} = event;
	const trimValue = value.trim();
	if (key === "Enter" && trimValue) {
		addTodo(trimValue)
		event.target.value = '';
	}
})

window.addEventListener('hashchange', () => {
	const filter = window.location.hash?.slice(1) || "all";
	setFilter(filter)
})

todoListElement.addEventListener('click', ({target: {dataset: {id, role}}}) => {
	switch (role) {
		case 'toggle':
			toggleTodoDone(+id)
			return;
		case 'remove':
			removeTodo(+id)
			return;
	}
})

todoListElement.addEventListener('dblclick', ({target: {dataset: {id, role}}}) => {
	if (role === 'edit') {
		onTodoEdit(+id)
	}
})

todoListElement.addEventListener('keyup', ({key, target: {value, dataset: {id, role}}}) => {
	if (role === 'change') {
		switch (key) {
			case 'Escape':
				toggleTodoEdit(+id)
				return;
			case 'Enter':
				setTodo(+id, value)
				return;
		}
	}
})