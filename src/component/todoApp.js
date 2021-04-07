import TodoInput from "./todoInput.js";
import TodoList from "./todoList.js";
import { TodoItem } from "./todoItem.js";

// 부모 컴포넌트
export default function TodoApp(div) {
  this.todoItems = []
  this.todoList = new TodoList(this);

  this.setState = updatedItems => {
    this.todoItems = updatedItems;
    this.todoList.setState(this.todoItems);
  };

  new TodoInput({ onAdd: contents => {
    const newTodoItem = new TodoItem(contents);
    this.todoItems.push(newTodoItem);
    this.setState(this.todoItems);
    }
  }); 
  
  this.complete = (target) => {
    target.className = "completed";
    target.querySelector("input").setAttribute("checked", true);
  }
}
