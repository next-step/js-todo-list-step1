import TodoFilter from './TodoFilter.js';
class TodoApp{
	#id
	#todoList
	#filter
	#dom

	constructor(dom, hash) {
		this.#id=0;
		this.#todoList=[];
		this.#dom=dom;
		this.#filter=hash?.slice(1) || "all";
	}

	changeFilter(hash){
		this.#filter=hash?.slice(1) || "all";
		console.log(this.#filter);
		this.render();
	}

	render() {
		if(this.#dom){
			this.#dom.innerHTML=`
				<input class="toggle-all" type="checkbox" />
				<ul id="todo-list" class="todo-list"></ul>
				<div class="count-container">
				  <span class="todo-count">총 <strong>0</strong> 개</span>
				  <ul class="filters">
				  	${TodoFilter(this.#filter)}
				  </ul>
				</div>
			`;
		}
	}
}

export default TodoApp;