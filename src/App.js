import Todo from "./domain/Todo.js";
import TodoInput from "./component/TodoInput.js";
import TodoList from "./component/TodoList.js";

export default function App() {
  const todos = [];
  let nextId = 0;

  const setState = () => {
    todoList.render(todos);
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

  TodoInput({ addTodo });
  const todoList = TodoList({ toggleTodo, deleteTodo });
}
