import {todoItemTemplate} from "./templates.js";

export default function TodoList({ onToggle, onDelete }) {
  const $todoList = document.querySelector("#todo-list");
  
  this.setState = (updatedTodoItems) => {
    this.todoItems = updatedTodoItems;
    this.render(this.todoItems);
  }

  this.render = (items) => {  
    const htmlItems = items.map(todoItemTemplate).join("");
    $todoList.innerHTML = htmlItems;
  };

  this.toggleTodo = (event) => {
    if (!event.target.matches('.toggle')) return;
    let $li = event.target.closest('li');
    let id = $li.getAttribute('id');
    onToggle(id);
  }

  this.deleteTodoItem = (event) => {
    if (!event.target.matches('.destroy')) return;
    let $li = event.target.closest('li');
    let id = $li.getAttribute('id');
    onDelete(id);
  }

  $todoList.addEventListener('click', event => this.toggleTodo(event));
  $todoList.addEventListener('click', event => this.deleteTodoItem(event));

}