import Todo from "./domain/Todo.js";
import TodoInput from "./component/TodoInput.js";
import TodoList from "./component/TodoList.js";
import TodoCount from "./component/TodoCount.js";

export default function App() {
  const todos = [];
  let nextId = 0;

  const setState = () => {
    todoList.render(todos);
    todoCount.render(todos);
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

  TodoInput({ addTodo });
  const todoList = TodoList({ toggleTodo, deleteTodo, editTodo });
  const todoCount = TodoCount();
}
