import TodoList from './TodoList'
import TodoInput from './TodoInput';

class App {
	// todos = [];
	todos = ['test1', 'test2'];
	setTodos = (todos) => {
		this.todos = todos;
		this.todoList.setTodos(this.todos);
	};

	todoInput = new TodoInput();
	todoList = new TodoList(this.todos);
}

export default App;
