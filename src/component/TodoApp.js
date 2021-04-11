import TodoInput from "./TodoInput.js";
import TodoItemModel from "./model/TodoItemModel.js";
import TodoList from "./TodoList.js";
import TodoCount from "./TodoCount.js";
import TodoMode from "./TodoMode.js";

import KEY_CODE from "../constants/KeyCode.js";
import Mode from "../constants/Mode.js";

function TodoApp() {
	let id = 0;
	this.todoItems = [];

	const countTarget = document.querySelector(".todo-count strong");
	const todoCount = new TodoCount({ target: countTarget });

	const listTarget = document.querySelector("#todo-list");
	const todoList = new TodoList({
		target: listTarget,
		status: null,
		onDeleteButton: (id) => {
			this.todoItems = this.todoItems.filter((item) => item.id !== id);
			todoList.setState(this.todoItems);
			todoCount.setState(this.todoItems);
		},
		onCompleted: (id) => {
			this.todoItems = this.todoItems.map((item) => {
				if (item.id === id) {
					item.completed = !item.completed;
				}
				return item;
			});
			todoList.setState(this.todoItems);
			todoCount.setState(this.todoItems);
		},
		onEditing: (id) => {
			this.todoItems = this.todoItems.map((item) => {
				if (item.id === id) {
					item.editing = true;
				}
				return item;
			});
			todoList.setState(this.todoItems);
			todoCount.setState(this.todoItems);
		},
		onEdit: (id) => (event) => {
			if (event.keyCode === KEY_CODE.ESC) {
				this.todoItems.map((item) => {
					if (item.id === id) {
						item.editing = false;
					}
					return item;
				});
				todoList.setState(this.todoItems);
				todoCount.setState(this.todoItems);
			} else if (event.keyCode === KEY_CODE.ENTER) {
				this.todoItems.map((item) => {
					if (item.id === id) {
						item.contents = event.target.value;
						item.editing = false;
					}
					return item;
				});
				todoList.setState(this.todoItems);
				todoCount.setState(this.todoItems);
			}
		}
	});

	this.setState = (updatedItems) => {
		this.todoItems = updatedItems;
		todoList.setState(this.todoItems);
		todoCount.setState(this.todoItems);
	};

	new TodoInput({
		onAdd: (contents) => {
			const newTodoItem = new TodoItemModel(contents, id++);
			this.todoItems.push(newTodoItem);
			this.setState(this.todoItems);
		}
	});

	new TodoMode({
		target: document.querySelector(".filters"),
		onChangeMode: (mode) => {
			let prevTodoItems;
			switch (mode) {
				case Mode.ALL:
					prevTodoItems = this.todoItems;
					break;
				case Mode.ACTIVE:
					console.log("what");
					prevTodoItems = this.todoItems.filter((item) => !item.completed);
					break;
				case Mode.COMPLETED:
					prevTodoItems = this.todoItems.filter((item) => item.completed);
					break;
			}
			todoList.setState(prevTodoItems);
			todoCount.setState(prevTodoItems);
		}
	});
}

export default TodoApp;
