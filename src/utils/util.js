import { TodoItem } from "../component/todoItem.js";

export function generateTodos(todos) {
	if (todos === null) {
		return [];
	}
	else {
		// map 은 새로운 배열을 반환함.
		return todos.map(todo => new TodoItem(todo.id, todo.text, todo.status));
	}
}