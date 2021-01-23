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

  TodoInput({ addTodo });
  const todoList = TodoList();
}
