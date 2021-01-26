import TodoListItem from "./TodoListItem.js";

export default function TodoList({ toggleTodo, deleteTodo, editTodo }) {
  const $list = document.querySelector(".todo-list");

  const renderEachTodo = (todo) => {
    const $todoListItem = TodoListItem({
      todo,
      toggleTodo,
      deleteTodo,
      editTodo,
    }).dom;
    $list.appendChild($todoListItem);
  };

  const render = (todos) => {
    $list.innerHTML = "";
    todos.forEach(renderEachTodo);
  };

  return {
    render,
  };
}
