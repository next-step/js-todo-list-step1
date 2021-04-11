import TodoInput from "./TodoInput.js";
import TodoItemModel from "./model/TodoItemModel.js";
import TodoList from "./TodoList.js";
import TodoCount from "./TodoCount.js";

function TodoApp() {
	this.todoItems = [];
	const listTarget = document.querySelector("#todo-list");
	const todoList = new TodoList({ target: listTarget, status: null, complete: null });

	const countTarget = document.querySelector(".todo-count strong");
	const todoCount = new TodoCount({ target: countTarget });

	this.setState = (updatedItems) => {
		this.todoItems = updatedItems;
		todoList.setState(this.todoItems);
		todoCount.setState(this.todoItems);
	};

	new TodoInput({
		onAdd: (contents) => {
			const newTodoItem = new TodoItemModel(contents);
			this.todoItems.push(newTodoItem);
			this.setState(this.todoItems);
		}
	});
}

export default TodoApp;
