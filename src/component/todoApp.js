import TodoInput from "./todoInput.js";
import TodoList from "./todoList.js";
import { parseItems, TodoItem } from "./todoItem.js";

// 부모 컴포넌트
export default function TodoApp(div) {

  this.todoItems = (localStorage.getItem("items") == null)? [] : parseItems(localStorage.getItem("items"));
  this.todoList = new TodoList(this);
  this.idGenerator = 0;

  this.render = () => {
    this.setState(this.todoItems);
  }

  this.setState = updatedItems => {
    this.todoItems = updatedItems;
    localStorage.setItem("items", JSON.stringify(this.todoItems));
    this.todoList.setState(this.todoItems);
  };

  const add = contents => {
    const newTodoItem = new TodoItem(this.idGenerator++, contents);
    this.todoItems.push(newTodoItem);
    this.setState(this.todoItems);
  }

  this.todoInput = new TodoInput({onAdd : add}); 
  
  this.complete = targetId => {
    this.todoItems.filter(item => item.match(targetId))
        .forEach(item => item.complete());
    this.setState(this.todoItems);
  }

  this.delete = targetId => {
    this.todoItems = this.todoItems.filter(item => !item.match(targetId));
    this.setState(this.todoItems);
  }

  this.editing = (targetId) => {
    this.todoItems.filter(item => item.match(targetId))
        .forEach(item => item.changeStatus());
    this.setState(this.todoItems);
  }

  this.edit = (targetId, value) => {
    this.todoItems.filter(item => item.match(targetId))
        .forEach(item => item.edit(value));
    this.setState(this.todoItems);
  }
}
