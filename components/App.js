import TodoList from './TodoList'
import TodoInput from './TodoInput';

class App {
	todos = [];
	setTodos = (todos) => {
		this.todos = todos;
		this.todoList.setTodos(this.todos);
	};

	todoInput = new TodoInput();
	todoList = new TodoList(this.todos);
}

export default App;
