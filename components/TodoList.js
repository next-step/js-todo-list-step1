import TodoItem from './TodoItem'

class TodoList {
	$todoList = document.querySelector('#todo-list');
	constructor(todos) {
		this.todos = todos;
		this.render();
	}

	setTodos = (todos) => {
		this.todos = todos;
		this.render();
	};

	render() {
		this.$todoList.innerHTML = '';
		this.todos.forEach(todo => {
			new TodoItem(this.$todoList, todo);
		})
	}
}

export default TodoList;
