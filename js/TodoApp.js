import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import TodoCountContainer from "./TodoCountContainer.js";
import { generateId } from "./utils.js";

export default function TodoApp(appEl, todos) {
  const inputEl = appEl.querySelector("#new-todo-title");
  const listEl = appEl.querySelector("#todo-list");
  const countContainerEl = appEl.querySelector(".count-container");

  this.todos = todos;
  this.filter = null;
  this.editingId = null;

  this.todoInput = new TodoInput(inputEl, this);
  this.todoList = new TodoList(listEl, this);
  this.todoCountContainer = new TodoCountContainer(countContainerEl, this);

  this.setTodos = (todos) => {
    this.todos = todos;
    this.render();
  };

  this.getTodo = (targetId) => this.todos.find(({ id }) => id === targetId);

  this.addTodo = (value) =>
    this.setTodos([
      { id: generateId(), value, completed: this.filter ?? false },
      ...this.todos,
    ]);

  this.updateTodo = (todo) =>
    this.setTodos(
      this.todos.map((_todo) => (_todo.id !== todo.id ? _todo : todo))
    );

  this.deleteTodo = (targetId) =>
    this.setTodos(this.todos.filter(({ id }) => id !== targetId));

  this.setFilter = (filter = null) => {
    this.filter = filter;
    this.render();
  };

  this.setEditingId = (id = null) => {
    this.editingId = id;
    this.render();
  };

  this.render = () => {
    const filteredTodos = this.todos.filter(
      ({ completed }) => this.filter === null || completed === this.filter
    );

    this.todoInput.render();
    this.todoList.render(filteredTodos);
    this.todoCountContainer.render(filteredTodos);
  };
}
