import TodoList from './TodoList';
import TodoInput from './TodoInput';
import Count from './Count';
import Filter from './Filter';

class App {
  todos = [];

  setTodos = (todos) => {
    this.todos = todos;
    this.todoList.setTodos(this.todos);
    this.count.setCount(this.todos.length);
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

  filterAllTodo = () => {};
  filterActiveTodo = () => {};
  filterCompletedTodo = () => {};

  todoInput = new TodoInput(this.addTodos);
  todoList = new TodoList(this.todos, this.deleteTodo, this.editTodo);
  count = new Count(this.todos.length);
  filter = new Filter(
    this.filterAllTodo,
    this.filterActiveTodo,
    this.filterCompletedTodo
  );
}

export default App;
