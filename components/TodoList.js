import TodoItem from './TodoItem'

class TodoList {
	constructor(todos) {
		this.todos = todos || [];
		this.render();
	}

	setTodos = (todos) => {
		this.todos = todos;
		this.render();
	};

	render() {

	}
}

export default TodoList;
