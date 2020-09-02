import TodoList from './TodoList';
import TodoInput from './TodoInput';
import Count from './Count';
import Filter from './Filter';
import { TODOS, ALL, ACTIVE, COMPLETED } from '../lib/constants';

class App {
  todosVisible = [];
  whatToShow = ALL;

  constructor() {
    this.setTodos(JSON.parse(localStorage.getItem(TODOS)) || []);
  }

  setTodos = (todos) => {
    this.todos = todos;
    localStorage.setItem(TODOS, JSON.stringify(todos));
    this.setTodosVisible();
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
    this.count.setCount(this.todosVisible.length);
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
    this.todosVisible,
    this.deleteTodo,
    this.editTodo,
    this.toggleActiveTodo
  );
  count = new Count();
  filter = new Filter(this.setWhatToShow);
}

export default App;
