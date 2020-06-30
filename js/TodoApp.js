import TodoList from "./TodoList.js";
import TodoInput from "./TodoInput.js";
import TodoCount from "./TodoCount.js";
import { filterMap } from "../utils/constants.js";
import TodoFilter from "./TodoFilter.js";
import { loadTodos, saveTodos } from "../utils/localStorage.js";

export default function TodoApp(params) {
  const {
    $targetTodoList,
    $targetTodoInput,
    $targetTodoCount,
    $targetTodoFilter,
  } = params;
  this.data = loadTodos() || [];
  this.filter = filterMap.ALL;
  this.nextId = this.data.length + 1;

  const onToggle = (id) => {
    const nextData = this.data.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    this.setState(nextData, this.filter);
  };

  const onRemove = (id) => {
    const nextData = this.data.filter((todo) => todo.id !== id);
    this.setState(nextData, this.filter);
  };

  const onModify = (id, nextContent) => {
    const nextData = this.data.map((todo) =>
      todo.id == id ? { ...todo, content: nextContent } : todo
    );
    this.setState(nextData, this.filter);
  };

  const onKeyEnter = (content) => {
    const nextData = this.data.concat({
      id: this.nextId++,
      content,
      isCompleted: false,
    });
    this.setState(nextData, this.filter);
  };

  const onChangeFilter = (nextFilter) => {
    this.setState(this.data, nextFilter);
  };

  const filterTodos = (todos, filter) => {
    switch (filter) {
      case filterMap.ACTIVE:
        return todos.filter((todo) => !todo.isCompleted);
      case filterMap.COMPLETED:
        return todos.filter((todo) => todo.isCompleted);
      default:
        return todos;
    }
  };

  this.todoInput = new TodoInput({
    $target: $targetTodoInput,
    onKeyEnter,
  });

  this.todoList = new TodoList({
    $target: $targetTodoList,
    data: this.data,
    onToggle,
    onRemove,
    onModify,
  });

  this.todoCount = new TodoCount({
    $target: $targetTodoCount,
    count: this.data.length,
  });

  this.todoFilter = new TodoFilter({
    $target: $targetTodoFilter,
    filter: this.filter,
    onChangeFilter,
  });

  this.setState = (nextData, nextFilter) => {
    this.data = nextData;
    this.filter = nextFilter;
    const filteredTodos = filterTodos(this.data, this.filter);

    this.todoList.setState(filteredTodos);
    this.todoCount.setState(filteredTodos.length);
    this.todoFilter.setState(this.filter);
    saveTodos(this.data);
    this.render();
  };

  this.render = () => {
    this.todoList.render();
    this.todoCount.render();
    this.todoFilter.render();
  };
}
