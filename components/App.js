import TodoList from './TodoList';
import TodoInput from './TodoInput';

class App {
  todos = [];

  setTodos = (todos) => {
    this.todos = todos;
    this.todoList.setTodos(this.todos);
  };

  addTodos = (newTodoText) => {
    let lastTodo = this.todos[this.todos.length - 1];
    const newTodo = {
      id: lastTodo ? lastTodo.id + 1 : 0,
      text: newTodoText,
    };
    this.setTodos([...this.todos, newTodo]);
  };

  deleteTodo = (targetId) => {
    this.setTodos(this.todos.filter((todo) => todo.id !== targetId));
  };

  editTodo = (targetId, newText) => {
    this.setTodos(
      this.todos.map((todo) =>
        todo.id === targetId ? { ...todo, text: newText } : todo
      )
    );
  };

  todoInput = new TodoInput(this.addTodos);
  todoList = new TodoList(this.todos, this.deleteTodo, this.editTodo);
}

export default App;
