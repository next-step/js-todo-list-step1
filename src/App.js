import Todo from "./domain/Todo.js";
import TodoInput from "./component/TodoInput.js";
import TodoList from "./component/TodoList.js";
import TodoCount from "./component/TodoCount.js";
import TodoFilter from "./component/TodoFilter.js";
import { FILTER } from "./utils/FILTER.js";

export default function App() {
  const todos = [];
  let nextId = 0;
  let filter = FILTER.ALL;

  const filterTodo = () => {
    if (filter === FILTER.ALL) {
      return todos.filter((todo) => !todo.isCompleted);
    } else if (filter === FILTER.COMPLETED) {
      return todos.filter((todo) => todo.isCompleted);
    }
    return todos;
  };

  const setState = () => {
    const filteredTodos = filterTodo();
    todoList.render(filteredTodos);
    todoCount.render(filteredTodos);
  };

  const addTodo = (contents) => {
    todos.push(new Todo(nextId++, contents));
    setState();
  };

  const toggleTodo = (id) => {
    const targetTodo = todos.find((todo) => todo.isSameId(id));
    targetTodo.toggle();
    setState();
  };

  const deleteTodo = (id) => {
    const targetTodoIndex = todos.findIndex((todo) => todo.isSameId(id));
    todos.splice(targetTodoIndex, 1);
    setState();
  };

  const editTodo = (id, contents) => {
    const targetTodo = todos.find((todo) => todo.isSameId(id));
    targetTodo.edit(contents);
    setState();
  };

  const changeFilter = (selected) => {
    filter = selected;
    setState();
  };

  TodoInput({ addTodo });
  const todoList = TodoList({ toggleTodo, deleteTodo, editTodo });
  const todoCount = TodoCount();
  TodoFilter({ filterTodo: changeFilter });
}
