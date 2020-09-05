import TodoFilter from './TodoFilter.js';
import TodoItem from "./TodoItem.js";

class TodoApp {
	#id
	#todoList
	#filter
	#todoListDom
	#todoCountDom

	constructor(todoListDom, todoCountDom, hash) {
		this.#id = this.getStorageId() ?? 0;
		this.#todoList = this.getStorageTodoList() ?? [];
		this.#todoListDom = todoListDom;
		this.#todoCountDom = todoCountDom;
		this.#filter = hash?.slice(1) || "all";
		this.render();
	}

	getStorageId() {
		return window.localStorage.getItem('id');
	}

	getStorageTodoList() {
		return JSON.parse(window.localStorage.getItem('todoList'));
	}

	setStorageId() {
		window.localStorage.setItem('id', this.#id);
	}

	setStorageTodoList() {
		window.localStorage.setItem('todoList', JSON.stringify(this.#todoList));
	}

	changeFilter(hash) {
		this.#filter = hash?.slice(1) || "all";
		this.render();
	}

	addTodo(text) {
		const todo = {
			id: this.#id++,
			text,
			done: false,
			edit: false,
		}
		this.#todoList.push(todo);
		this.setStorageId()
		this.setStorageTodoList();
		this.render();
	}

	removeTodo(id) {
		this.#todoList = this.#todoList.filter(todo => todo.id !== (+id));
		this.setStorageTodoList();
		this.render();
	}

	changeTodo(id, text) {
		this.#todoList = this.#todoList.map(todo => todo.id === (+id) ? {...todo, text, edit: false} : todo);
		this.setStorageTodoList();
		this.render();
	}

	toggleDone(id) {
		this.#todoList = this.#todoList.map(todo => todo.id === (+id) ? {...todo, done: !todo.done} : todo);
		this.setStorageTodoList();
		this.render();
	}

	toggleEdit(id) {
		this.#todoList = this.#todoList.map(todo => todo.id === (+id) ? {...todo, edit: !todo.edit} : todo);
		this.render();
	}

	filterTodoList() {
		return this.#todoList.filter(todo => {
			switch (this.#filter) {
				case 'completed':
					return todo.done;
				case 'active':
					return !todo.done;
				default:
					return true;
			}
		})
	}

	render() {
		const filteredList = this.filterTodoList();
		this.#todoListDom.innerHTML = filteredList.map(todo => TodoItem(todo)).join('')
		this.#todoCountDom.innerHTML = `
			<span class="todo-count">총 <strong>${filteredList.length}</strong> 개</span>
			<ul class="filters">
				${TodoFilter(this.#filter)}
			</ul>
		`;
	}
}

export default TodoApp;