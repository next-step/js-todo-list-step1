import {todoItemTemplate} from "../utils/templates.js";

export default function TodoList({ onToggle, onDelete, onEdit, onEndEdit }) {
  const $todoList = document.querySelector("#todo-list"); 
  
  const EventHandler = (event) => {
    return {
      $li: event.target.closest('li'),
      id: event.target.closest('li').getAttribute('id'),
    } 
  }

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
    const {id} = EventHandler(event); 
    onToggle(id);
  }

  this.deleteTodoItem = (event) => {
    if (!event.target.matches('.destroy')) return;
    const {id} = EventHandler(event); 
    onDelete(id);
  }

  this.activeEdit = (event) => {
    if (!event.target.matches('label')) return;
    const {$li} = EventHandler(event); 
    $li.classList.add("editing");
  }

  this.endEdit = (event) => {
    if (!event.target.matches('.edit')) return;
    const label = event.target.previousElementSibling.children[1];
    const {$li,id} = EventHandler(event) 
    
    if (event.key === 'Escape') {
      onEdit(label.textContent, id);
      $li.classList.remove('editing');  
    }
      
    if (event.key === 'Enter') {
      onEdit(event.target.value.trim(), id);
    }
  }

  $todoList.addEventListener('click', event => this.toggleTodoItem(event));
  $todoList.addEventListener('click', event => this.deleteTodoItem(event));
  $todoList.addEventListener('dblclick', event => this.activeEdit(event));
  $todoList.addEventListener('keyup', event => this.endEdit(event));
  
}