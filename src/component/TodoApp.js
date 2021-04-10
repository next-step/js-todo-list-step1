import TodoInput from "./TodoInput.js";
import TodoItemModel from "./model/TodoItemModel.js";
import TodoList from "./TodoList.js";

function TodoApp() {
	this.todoItems = [];

	this.setState = (updatedItems) => {
		this.todoItems = updatedItems;
		todoList.setState(this.todoItems);
	};

	const target = document.querySelector("#todo-list");
	const todoList = new TodoList({ target });

	new TodoInput({
		onAdd: (contents) => {
			const newTodoItem = new TodoItemModel(contents);
			this.todoItems.push(newTodoItem);
			this.setState(this.todoItems);
		}
	});
}

export default TodoApp;
