import TodoList from './TodoList';
import TodoInput from './TodoInput';

class App {
  todos = [];

  setTodos = (todos) => {
    this.todos = todos;
    this.todoList.setTodos(this.todos);
  };

  addTodos = (newTodo) => {
    this.setTodos([...this.todos, newTodo]);
  };

  todoInput = new TodoInput(this.addTodos);
  todoList = new TodoList(this.todos);
}

export default App;
