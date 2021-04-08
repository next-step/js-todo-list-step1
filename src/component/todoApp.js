import TodoInput from "./todoInput.js";
import TodoList from "./todoList.js";
import { TodoItem, converter } from "./todoItem.js";

// 부모 컴포넌트
export default function TodoApp(div) {
  this.todoItems = []
  this.todoList = new TodoList(this);

  this.setState = updatedItems => {
    this.todoItems = updatedItems;
    this.todoList.setState(this.todoItems);
  };

  const add = contents => {
    const newTodoItem = new TodoItem(this.todoItems.length, contents);
    this.todoItems.push(newTodoItem);
    this.setState(this.todoItems);
  }

  this.todoInput = new TodoInput({onAdd : add}); 
  
  this.complete = target => {
    if (target.className === "") {
      target.className = "completed";
      target.querySelector("input").setAttribute("checked", true);  
    } else if (target.className === "completed") {
      target.className = "";
      target.querySelector("input").setAttribute("checked", false);
    }
  }

  this.delete = target => {
    const targetId = converter(target);
    this.todoItems = this.todoItems.filter(item => item.id != targetId);
    this.setState(this.todoItems);
    target.remove();
  }

  this.edit = (target, value) => {
    const targetId = converter(target);
    const itemIndex = this.todoItems.findIndex(item => item.id == targetId);
    this.todoItems[itemIndex].text = value;
    this.setState(this.todoItems);
  }
}
