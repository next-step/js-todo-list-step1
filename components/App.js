import TodoList from './TodoList.js';
import TodoInput from './TodoInput.js';
import TodoCount from './TodoCount.js';
import TodoFilter from './TodoFilter.js';
import { TODOS, ALL, ACTIVE, COMPLETED } from '../constants/index.js';

class App {
  todos;
  todosVisible;
  whatToShow;

  constructor() {
    this.todos = [];
    this.todosVisible = [];
    this.whatToShow = ALL;

    this.$todoInput = document.querySelector('#new-todo-title');
    this.$todoList = document.querySelector('#todo-list');
    this.$todoCount = document.querySelector('.todo-count');
    this.$todoFilter = document.querySelector('.filters');

    this.todoInput = new TodoInput(this.$todoInput, {
      addTodos: this.addTodos,
    });
    this.todoList = new TodoList(this.$todoList, {
      deleteTodo: this.deleteTodo,
      editTodo: this.editTodo,
      toggleActiveTodo: this.toggleActiveTodo,
    });
    this.todoCount = new TodoCount(this.$todoCount);
    this.todoFilter = new TodoFilter(this.$todoFilter, {
      setWhatToShow: this.setWhatToShow,
    });

    this.loadTodos();
  }

  setTodos = (todos) => {
    this.todos = todos;
    localStorage.setItem(TODOS, JSON.stringify(todos));
    this.setTodosVisible(this.todoList, this.todoCount);
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
    this.setTodosVisible(this.todoList, this.todoCount);
  };

  setTodosVisible = (todoList, todoCount) => {
    this.todosVisible = this.todos.filter((todo) => {
      if (
        this.whatToShow === ALL ||
        (this.whatToShow == ACTIVE && todo.isActive) ||
        (this.whatToShow == COMPLETED && !todo.isActive)
      )
        return todo;
    });
    todoList.setTodos(this.todosVisible);
    todoCount.setCount(this.todosVisible.length || 0);
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
}

export default App;
