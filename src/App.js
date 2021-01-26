import Todo from "./domain/Todo.js";
import TodoInput from "./component/TodoInput.js";
import TodoList from "./component/TodoList.js";
import TodoCount from "./component/TodoCount.js";
import TodoFilter from "./component/TodoFilter.js";
import $store from "./store/index.js";

export default function App() {
  const setState = () => {
    const filteredTodos = $store.todo.getFilteredItems();
    todoList.render(filteredTodos);
    todoCount.render(filteredTodos);
  };

  const addTodo = (contents) => {
    const newId = $store.todo.getNewId();
    const newTodo = new Todo(newId, contents);
    $store.todo.addItem(newTodo);
    setState();
  };

  const toggleTodo = (id) => {
    $store.todo.toggleItem(id);
    setState();
  };

  const deleteTodo = (id) => {
    $store.todo.deleteItem(id);
    setState();
  };

  const editTodo = (id, contents) => {
    $store.todo.editItem(id, contents);
  };

  const changeFilter = (selected) => {
    $store.todo.setFilter(selected);
    setState();
  };

  TodoInput({ addTodo });
  const todoList = TodoList({ toggleTodo, deleteTodo, editTodo });
  const todoCount = TodoCount();
  TodoFilter({ filterTodo: changeFilter });
}
