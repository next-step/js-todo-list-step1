import TodoList from './TodoList';
import TodoInput from './TodoInput';
import TodoCount from './TodoCount';
import TodoFilter from './TodoFilter';
import { TODOS, ALL, ACTIVE, COMPLETED } from '../constants';

class App {
  constructor() {
    this.todos = [];
    this.todosVisible = [];
    this.whatToShow = ALL;
    this.loadTodos();
  }

  setTodos = (todos) => {
    this.todos = todos;
    localStorage.setItem(TODOS, JSON.stringify(todos));
    this.setTodosVisible();
  };

  loadTodos = () => {
    let data = localStorage.getItem(TODOS);
    if (data) {
      data = JSON.parse(data);
      this.setTodos(data);
    }
  };

  setWhatToShow = (whatToShow) => {
    this.whatToShow = whatToShow;
    this.setTodosVisible();
  };

  setTodosVisible = () => {
    this.todosVisible = this.todos.filter((todo) => {
      if (
        this.whatToShow === ALL ||
        (this.whatToShow == ACTIVE && todo.isActive) ||
        (this.whatToShow == COMPLETED && !todo.isActive)
      )
        return todo;
    });
    this.todoList.setTodos(this.todosVisible);
    this.todoCount.setCount(this.todosVisible.length || 0);
  };

  addTodos = (newTodoText) => {
    let lastTodo = this.todos[this.todos.length - 1];
    const newTodo = {
      id: lastTodo ? lastTodo.id + 1 : 0,
      text: newTodoText,
      isActive: true,
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

  toggleActiveTodo = (targetId) => {
    this.setTodos(
      this.todos.map((todo) =>
        todo.id === targetId ? { ...todo, isActive: !todo.isActive } : todo
      )
    );
  };

  todoInput = new TodoInput(this.addTodos);
  todoList = new TodoList(
    this.deleteTodo,
    this.editTodo,
    this.toggleActiveTodo
  );
  todoCount = new TodoCount();
  todoFilter = new TodoFilter(this.setWhatToShow);
}

export default App;
