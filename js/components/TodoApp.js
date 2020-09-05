import TodoFilter from './TodoFilter.js';
import TodoItem from "./TodoItem.js";
class TodoApp{
	#id
	#todoList
	#filter
	#todoListDom
	#todoCountDom

	constructor(todoListDom, todoCountDom, hash) {
		this.#id=0;
		this.#todoList=[];
		this.#todoListDom=todoListDom;
		this.#todoCountDom = todoCountDom;
		this.#filter=hash?.slice(1) || "all";
	}

	changeFilter(hash){
		this.#filter=hash?.slice(1) || "all";
		this.render();
	}

	addTodo(text){
		const todo = {
			id:this.#id++,
			text,
			done: false,
		}
		this.#todoList.push(todo);
		this.render();
	}

	toggleTodo(id){
		this.#todoList=this.#todoList.map(todo=>todo.id===(+id)?{...todo, done:!todo.done}:todo);
		this.render();
	}

	render() {
		this.#todoListDom.innerHTML = this.#todoList.map(todo=>TodoItem(todo)).join('')
		this.#todoCountDom.innerHTML = `
			<span class="todo-count">총 <strong>${this.#todoList.length}</strong> 개</span>
			<ul class="filters">
				${TodoFilter(this.#filter)}
			</ul>
		`;
	}
}

export default TodoApp;