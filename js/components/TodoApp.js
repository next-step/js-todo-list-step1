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

	removeTodo(id){
		this.#todoList=this.#todoList.filter(todo=>todo.id!==(+id));
		this.render();
	}

	toggleTodo(id){
		this.#todoList=this.#todoList.map(todo=>todo.id===(+id)?{...todo, done:!todo.done}:todo);
		this.render();
	}

	filterTodoList(){
		return this.#todoList.filter(todo=>{
			switch (this.#filter){
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
		this.#todoListDom.innerHTML = filteredList.map(todo=>TodoItem(todo)).join('')
		this.#todoCountDom.innerHTML = `
			<span class="todo-count">총 <strong>${filteredList.length}</strong> 개</span>
			<ul class="filters">
				${TodoFilter(this.#filter)}
			</ul>
		`;
	}
}

export default TodoApp;