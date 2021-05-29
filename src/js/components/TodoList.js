import {todoItemTemplate} from "../utils/templates.js";

export default function TodoList({ onToggle, onDelete, onEdit, onEndEdit }) {
  const $todoList = document.querySelector("#todo-list");
  
  this.setState = (updatedTodoItems) => {
    this.todoItems = updatedTodoItems;
    this.render(this.todoItems);
  }

  this.render = (items) => {  
    const htmlItems = items.map(todoItemTemplate).join("");
    $todoList.innerHTML = htmlItems;
  };

  this.toggleTodoItem = (event) => {
    if (!event.target.matches('.toggle')) return;
    const $li = event.target.closest('li');
    const id = $li.getAttribute('id');
    onToggle(id);
  }

  this.deleteTodoItem = (event) => {
    if (!event.target.matches('.destroy')) return;
    const $li = event.target.closest('li');
    const id = $li.getAttribute('id');
    onDelete(id);
  }

  this.editTodoItem = (event) => {
    if (!event.target.matches('label')) return;
    const $li = event.target.closest('li');
    const id = $li.getAttribute('id');
    onEdit(id);
  }

  this.endEdit = (event) => {
    if (!event.target.matches('.edit')) return;
    const $li = event.target.closest('li');
    const id = $li.getAttribute('id');
    const label = $li.childNodes[1].childNodes[3];
    
    if (event.key === 'Escape') {
      onEndEdit(label.textContent, id);
    }
      
    if (event.key === 'Enter') {
      onEndEdit(event.target.value.trim(), id);
    }
  }

  $todoList.addEventListener('click', event => this.toggleTodoItem(event));
  $todoList.addEventListener('click', event => this.deleteTodoItem(event));
  $todoList.addEventListener('dblclick', event => this.editTodoItem(event));
  $todoList.addEventListener('keyup', event => this.endEdit(event));
  
}