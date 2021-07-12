import { TodoItem } from "../component/todoItem.js";

export function generateTodos(todos) {
	if (todos === null) {
		return [];
	}
	return todos.map(todo => new TodoItem(todo.id, todo.text, todo.status));
}

export const $ = (selector) => document.querySelector(selector);

export const getItemId = ( target ) => +target.closest("li").querySelector("#item-id").value;